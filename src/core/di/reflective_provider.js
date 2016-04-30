'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var reflective_key_1 = require('./reflective_key');
var metadata_1 = require('./metadata');
var reflective_exceptions_1 = require('./reflective_exceptions');
var forward_ref_1 = require('./forward_ref');
var provider_1 = require('./provider');
var provider_util_1 = require('./provider_util');
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
var ReflectiveDependency = (function () {
    function ReflectiveDependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
        this.key = key;
        this.optional = optional;
        this.lowerBoundVisibility = lowerBoundVisibility;
        this.upperBoundVisibility = upperBoundVisibility;
        this.properties = properties;
    }
    ReflectiveDependency.fromKey = function (key) {
        return new ReflectiveDependency(key, false, null, null, []);
    };
    return ReflectiveDependency;
}());
exports.ReflectiveDependency = ReflectiveDependency;
var _EMPTY_LIST = [];
var ResolvedReflectiveProvider_ = (function () {
    function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
        get: function () { return this.resolvedFactories[0]; },
        enumerable: true,
        configurable: true
    });
    return ResolvedReflectiveProvider_;
}());
exports.ResolvedReflectiveProvider_ = ResolvedReflectiveProvider_;
/**
 * An internal resolved representation of a factory function created by resolving {@link Provider}.
 */
var ResolvedReflectiveFactory = (function () {
    function ResolvedReflectiveFactory(
        /**
         * Factory function which can return an instance of an object represented by a key.
         */
        factory, 
        /**
         * Arguments (dependencies) to the `factory` function.
         */
        dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
    return ResolvedReflectiveFactory;
}());
exports.ResolvedReflectiveFactory = ResolvedReflectiveFactory;
/**
 * Resolve a single provider.
 */
function resolveReflectiveFactory(provider) {
    var factoryFn;
    var resolvedDeps;
    if (lang_1.isPresent(provider.useClass)) {
        var useClass = forward_ref_1.resolveForwardRef(provider.useClass);
        factoryFn = reflection_1.reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (lang_1.isPresent(provider.useExisting)) {
        factoryFn = function (aliasInstance) { return aliasInstance; };
        resolvedDeps = [ReflectiveDependency.fromKey(reflective_key_1.ReflectiveKey.get(provider.useExisting))];
    }
    else if (lang_1.isPresent(provider.useFactory)) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.dependencies);
    }
    else {
        factoryFn = function () { return provider.useValue; };
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
exports.resolveReflectiveFactory = resolveReflectiveFactory;
/**
 * Converts the {@link Provider} into {@link ResolvedProvider}.
 *
 * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
 * convenience provider syntax.
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(reflective_key_1.ReflectiveKey.get(provider.token), [resolveReflectiveFactory(provider)], provider.multi);
}
exports.resolveReflectiveProvider = resolveReflectiveProvider;
/**
 * Resolve a list of Providers.
 */
function resolveReflectiveProviders(providers) {
    var normalized = _normalizeProviders(providers, []);
    var resolved = normalized.map(resolveReflectiveProvider);
    return collection_1.MapWrapper.values(mergeResolvedReflectiveProviders(resolved, new Map()));
}
exports.resolveReflectiveProviders = resolveReflectiveProviders;
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 */
function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (var i = 0; i < providers.length; i++) {
        var provider = providers[i];
        var existing = normalizedProvidersMap.get(provider.key.id);
        if (lang_1.isPresent(existing)) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw new reflective_exceptions_1.MixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (var j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            var resolvedProvider;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, collection_1.ListWrapper.clone(provider.resolvedFactories), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
exports.mergeResolvedReflectiveProviders = mergeResolvedReflectiveProviders;
function _normalizeProviders(providers, res) {
    providers.forEach(function (b) {
        if (b instanceof lang_1.Type) {
            res.push(provider_1.provide(b, { useClass: b }));
        }
        else if (b instanceof provider_1.Provider) {
            res.push(b);
        }
        else if (provider_util_1.isProviderLiteral(b)) {
            res.push(provider_util_1.createProvider(b));
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else if (b instanceof provider_1.ProviderBuilder) {
            throw new reflective_exceptions_1.InvalidProviderError(b.token);
        }
        else {
            throw new reflective_exceptions_1.InvalidProviderError(b);
        }
    });
    return res;
}
function constructDependencies(typeOrFunc, dependencies) {
    if (lang_1.isBlank(dependencies)) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        var params = dependencies.map(function (t) { return [t]; });
        return dependencies.map(function (t) { return _extractToken(typeOrFunc, t, params); });
    }
}
exports.constructDependencies = constructDependencies;
function _dependenciesFor(typeOrFunc) {
    var params = reflection_1.reflector.parameters(typeOrFunc);
    if (lang_1.isBlank(params))
        return [];
    if (params.some(lang_1.isBlank)) {
        throw new reflective_exceptions_1.NoAnnotationError(typeOrFunc, params);
    }
    return params.map(function (p) { return _extractToken(typeOrFunc, p, params); });
}
function _extractToken(typeOrFunc, metadata /*any[] | any*/, params) {
    var depProps = [];
    var token = null;
    var optional = false;
    if (!lang_1.isArray(metadata)) {
        if (metadata instanceof metadata_1.InjectMetadata) {
            return _createDependency(metadata.token, optional, null, null, depProps);
        }
        else {
            return _createDependency(metadata, optional, null, null, depProps);
        }
    }
    var lowerBoundVisibility = null;
    var upperBoundVisibility = null;
    for (var i = 0; i < metadata.length; ++i) {
        var paramMetadata = metadata[i];
        if (paramMetadata instanceof lang_1.Type) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.InjectMetadata) {
            token = paramMetadata.token;
        }
        else if (paramMetadata instanceof metadata_1.OptionalMetadata) {
            optional = true;
        }
        else if (paramMetadata instanceof metadata_1.SelfMetadata) {
            upperBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.HostMetadata) {
            upperBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.SkipSelfMetadata) {
            lowerBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.DependencyMetadata) {
            if (lang_1.isPresent(paramMetadata.token)) {
                token = paramMetadata.token;
            }
            depProps.push(paramMetadata);
        }
    }
    token = forward_ref_1.resolveForwardRef(token);
    if (lang_1.isPresent(token)) {
        return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
    }
    else {
        throw new reflective_exceptions_1.NoAnnotationError(typeOrFunc, params);
    }
}
function _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps) {
    return new ReflectiveDependency(reflective_key_1.ReflectiveKey.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGl2ZV9wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtaW5uenBxQXkudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2RpL3JlZmxlY3RpdmVfcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUF3RCwwQkFBMEIsQ0FBQyxDQUFBO0FBQ25GLDJCQUF3RCxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3pGLDJCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLCtCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBQy9DLHlCQVFPLFlBQVksQ0FBQyxDQUFBO0FBQ3BCLHNDQUlPLHlCQUF5QixDQUFDLENBQUE7QUFDakMsNEJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHlCQUFpRCxZQUFZLENBQUMsQ0FBQTtBQUM5RCw4QkFBZ0QsaUJBQWlCLENBQUMsQ0FBQTtBQUVsRTs7O0dBR0c7QUFDSDtJQUNFLDhCQUFtQixHQUFrQixFQUFTLFFBQWlCLEVBQVMsb0JBQXlCLEVBQzlFLG9CQUF5QixFQUFTLFVBQWlCO1FBRG5ELFFBQUcsR0FBSCxHQUFHLENBQWU7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFLO1FBQzlFLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBSztRQUFTLGVBQVUsR0FBVixVQUFVLENBQU87SUFBRyxDQUFDO0lBRW5FLDRCQUFPLEdBQWQsVUFBZSxHQUFrQjtRQUMvQixNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSw0QkFBb0IsdUJBT2hDLENBQUE7QUFFRCxJQUFNLFdBQVcsR0FBcUIsRUFBRSxDQUFDO0FBMEN6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QVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLEdBQUcsK0JBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFakMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxJQUFJLHlDQUFpQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0FBQ0gsQ0FBQztBQUVELDJCQUEyQixLQUFLLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUMzRCxRQUFRO0lBQ2pDLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLDhCQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFDeEQsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgaXNCbGFuaywgaXNQcmVzZW50LCBpc0FycmF5LCBpc1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge01hcFdyYXBwZXIsIExpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge1JlZmxlY3RpdmVLZXl9IGZyb20gJy4vcmVmbGVjdGl2ZV9rZXknO1xuaW1wb3J0IHtcbiAgSW5qZWN0TWV0YWRhdGEsXG4gIEluamVjdGFibGVNZXRhZGF0YSxcbiAgT3B0aW9uYWxNZXRhZGF0YSxcbiAgU2VsZk1ldGFkYXRhLFxuICBIb3N0TWV0YWRhdGEsXG4gIFNraXBTZWxmTWV0YWRhdGEsXG4gIERlcGVuZGVuY3lNZXRhZGF0YVxufSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7XG4gIE5vQW5ub3RhdGlvbkVycm9yLFxuICBNaXhpbmdNdWx0aVByb3ZpZGVyc1dpdGhSZWd1bGFyUHJvdmlkZXJzRXJyb3IsXG4gIEludmFsaWRQcm92aWRlckVycm9yXG59IGZyb20gJy4vcmVmbGVjdGl2ZV9leGNlcHRpb25zJztcbmltcG9ydCB7cmVzb2x2ZUZvcndhcmRSZWZ9IGZyb20gJy4vZm9yd2FyZF9yZWYnO1xuaW1wb3J0IHtQcm92aWRlciwgUHJvdmlkZXJCdWlsZGVyLCBwcm92aWRlfSBmcm9tICcuL3Byb3ZpZGVyJztcbmltcG9ydCB7aXNQcm92aWRlckxpdGVyYWwsIGNyZWF0ZVByb3ZpZGVyfSBmcm9tICcuL3Byb3ZpZGVyX3V0aWwnO1xuXG4vKipcbiAqIGBEZXBlbmRlbmN5YCBpcyB1c2VkIGJ5IHRoZSBmcmFtZXdvcmsgdG8gZXh0ZW5kIERJLlxuICogVGhpcyBpcyBpbnRlcm5hbCB0byBBbmd1bGFyIGFuZCBzaG91bGQgbm90IGJlIHVzZWQgZGlyZWN0bHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZsZWN0aXZlRGVwZW5kZW5jeSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IFJlZmxlY3RpdmVLZXksIHB1YmxpYyBvcHRpb25hbDogYm9vbGVhbiwgcHVibGljIGxvd2VyQm91bmRWaXNpYmlsaXR5OiBhbnksXG4gICAgICAgICAgICAgIHB1YmxpYyB1cHBlckJvdW5kVmlzaWJpbGl0eTogYW55LCBwdWJsaWMgcHJvcGVydGllczogYW55W10pIHt9XG5cbiAgc3RhdGljIGZyb21LZXkoa2V5OiBSZWZsZWN0aXZlS2V5KTogUmVmbGVjdGl2ZURlcGVuZGVuY3kge1xuICAgIHJldHVybiBuZXcgUmVmbGVjdGl2ZURlcGVuZGVuY3koa2V5LCBmYWxzZSwgbnVsbCwgbnVsbCwgW10pO1xuICB9XG59XG5cbmNvbnN0IF9FTVBUWV9MSVNUID0gLypAdHMyZGFydF9jb25zdCovW107XG5cbi8qKlxuICogQW4gaW50ZXJuYWwgcmVzb2x2ZWQgcmVwcmVzZW50YXRpb24gb2YgYSB7QGxpbmsgUHJvdmlkZXJ9IHVzZWQgYnkgdGhlIHtAbGluayBJbmplY3Rvcn0uXG4gKlxuICogSXQgaXMgdXN1YWxseSBjcmVhdGVkIGF1dG9tYXRpY2FsbHkgYnkgYEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGVgLlxuICpcbiAqIEl0IGNhbiBiZSBjcmVhdGVkIG1hbnVhbGx5LCBhcyBmb2xsb3dzOlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9SZkVuaGg4a1VFSTBHM3FzbkllVD9wJTNEcHJldmlldyZwPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHZhciByZXNvbHZlZFByb3ZpZGVycyA9IEluamVjdG9yLnJlc29sdmUoW25ldyBQcm92aWRlcignbWVzc2FnZScsIHt1c2VWYWx1ZTogJ0hlbGxvJ30pXSk7XG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5mcm9tUmVzb2x2ZWRQcm92aWRlcnMocmVzb2x2ZWRQcm92aWRlcnMpO1xuICpcbiAqIGV4cGVjdChpbmplY3Rvci5nZXQoJ21lc3NhZ2UnKSkudG9FcXVhbCgnSGVsbG8nKTtcbiAqIGBgYFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEEga2V5LCB1c3VhbGx5IGEgYFR5cGVgLlxuICAgKi9cbiAga2V5OiBSZWZsZWN0aXZlS2V5O1xuXG4gIC8qKlxuICAgKiBGYWN0b3J5IGZ1bmN0aW9uIHdoaWNoIGNhbiByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYW4gb2JqZWN0IHJlcHJlc2VudGVkIGJ5IGEga2V5LlxuICAgKi9cbiAgcmVzb2x2ZWRGYWN0b3JpZXM6IFJlc29sdmVkUmVmbGVjdGl2ZUZhY3RvcnlbXTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBwcm92aWRlciBpcyBhIG11bHRpLXByb3ZpZGVyIG9yIGEgcmVndWxhciBwcm92aWRlci5cbiAgICovXG4gIG11bHRpUHJvdmlkZXI6IGJvb2xlYW47XG59XG5cbi8qKlxuICogU2VlIHtAbGluayBSZXNvbHZlZFByb3ZpZGVyfSBpbnN0ZWFkLlxuICpcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb2x2ZWRSZWZsZWN0aXZlQmluZGluZyBleHRlbmRzIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyIHt9XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcl8gaW1wbGVtZW50cyBSZXNvbHZlZFJlZmxlY3RpdmVCaW5kaW5nIHtcbiAgY29uc3RydWN0b3IocHVibGljIGtleTogUmVmbGVjdGl2ZUtleSwgcHVibGljIHJlc29sdmVkRmFjdG9yaWVzOiBSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBtdWx0aVByb3ZpZGVyOiBib29sZWFuKSB7fVxuXG4gIGdldCByZXNvbHZlZEZhY3RvcnkoKTogUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeSB7IHJldHVybiB0aGlzLnJlc29sdmVkRmFjdG9yaWVzWzBdOyB9XG59XG5cbi8qKlxuICogQW4gaW50ZXJuYWwgcmVzb2x2ZWQgcmVwcmVzZW50YXRpb24gb2YgYSBmYWN0b3J5IGZ1bmN0aW9uIGNyZWF0ZWQgYnkgcmVzb2x2aW5nIHtAbGluayBQcm92aWRlcn0uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICAvKipcbiAgICAgICAqIEZhY3RvcnkgZnVuY3Rpb24gd2hpY2ggY2FuIHJldHVybiBhbiBpbnN0YW5jZSBvZiBhbiBvYmplY3QgcmVwcmVzZW50ZWQgYnkgYSBrZXkuXG4gICAgICAgKi9cbiAgICAgIHB1YmxpYyBmYWN0b3J5OiBGdW5jdGlvbixcblxuICAgICAgLyoqXG4gICAgICAgKiBBcmd1bWVudHMgKGRlcGVuZGVuY2llcykgdG8gdGhlIGBmYWN0b3J5YCBmdW5jdGlvbi5cbiAgICAgICAqL1xuICAgICAgcHVibGljIGRlcGVuZGVuY2llczogUmVmbGVjdGl2ZURlcGVuZGVuY3lbXSkge31cbn1cblxuXG4vKipcbiAqIFJlc29sdmUgYSBzaW5nbGUgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUmVmbGVjdGl2ZUZhY3RvcnkocHJvdmlkZXI6IFByb3ZpZGVyKTogUmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeSB7XG4gIHZhciBmYWN0b3J5Rm46IEZ1bmN0aW9uO1xuICB2YXIgcmVzb2x2ZWREZXBzO1xuICBpZiAoaXNQcmVzZW50KHByb3ZpZGVyLnVzZUNsYXNzKSkge1xuICAgIHZhciB1c2VDbGFzcyA9IHJlc29sdmVGb3J3YXJkUmVmKHByb3ZpZGVyLnVzZUNsYXNzKTtcbiAgICBmYWN0b3J5Rm4gPSByZWZsZWN0b3IuZmFjdG9yeSh1c2VDbGFzcyk7XG4gICAgcmVzb2x2ZWREZXBzID0gX2RlcGVuZGVuY2llc0Zvcih1c2VDbGFzcyk7XG4gIH0gZWxzZSBpZiAoaXNQcmVzZW50KHByb3ZpZGVyLnVzZUV4aXN0aW5nKSkge1xuICAgIGZhY3RvcnlGbiA9IChhbGlhc0luc3RhbmNlKSA9PiBhbGlhc0luc3RhbmNlO1xuICAgIHJlc29sdmVkRGVwcyA9IFtSZWZsZWN0aXZlRGVwZW5kZW5jeS5mcm9tS2V5KFJlZmxlY3RpdmVLZXkuZ2V0KHByb3ZpZGVyLnVzZUV4aXN0aW5nKSldO1xuICB9IGVsc2UgaWYgKGlzUHJlc2VudChwcm92aWRlci51c2VGYWN0b3J5KSkge1xuICAgIGZhY3RvcnlGbiA9IHByb3ZpZGVyLnVzZUZhY3Rvcnk7XG4gICAgcmVzb2x2ZWREZXBzID0gY29uc3RydWN0RGVwZW5kZW5jaWVzKHByb3ZpZGVyLnVzZUZhY3RvcnksIHByb3ZpZGVyLmRlcGVuZGVuY2llcyk7XG4gIH0gZWxzZSB7XG4gICAgZmFjdG9yeUZuID0gKCkgPT4gcHJvdmlkZXIudXNlVmFsdWU7XG4gICAgcmVzb2x2ZWREZXBzID0gX0VNUFRZX0xJU1Q7XG4gIH1cbiAgcmV0dXJuIG5ldyBSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5KGZhY3RvcnlGbiwgcmVzb2x2ZWREZXBzKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUge0BsaW5rIFByb3ZpZGVyfSBpbnRvIHtAbGluayBSZXNvbHZlZFByb3ZpZGVyfS5cbiAqXG4gKiB7QGxpbmsgSW5qZWN0b3J9IGludGVybmFsbHkgb25seSB1c2VzIHtAbGluayBSZXNvbHZlZFByb3ZpZGVyfSwge0BsaW5rIFByb3ZpZGVyfSBjb250YWluc1xuICogY29udmVuaWVuY2UgcHJvdmlkZXIgc3ludGF4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVJlZmxlY3RpdmVQcm92aWRlcihwcm92aWRlcjogUHJvdmlkZXIpOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlciB7XG4gIHJldHVybiBuZXcgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJfKFJlZmxlY3RpdmVLZXkuZ2V0KHByb3ZpZGVyLnRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Jlc29sdmVSZWZsZWN0aXZlRmFjdG9yeShwcm92aWRlcildLCBwcm92aWRlci5tdWx0aSk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBhIGxpc3Qgb2YgUHJvdmlkZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVJlZmxlY3RpdmVQcm92aWRlcnMoXG4gICAgcHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCB7W2s6IHN0cmluZ106IGFueX0gfCBhbnlbXT4pOiBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcltdIHtcbiAgdmFyIG5vcm1hbGl6ZWQgPSBfbm9ybWFsaXplUHJvdmlkZXJzKHByb3ZpZGVycywgW10pO1xuICB2YXIgcmVzb2x2ZWQgPSBub3JtYWxpemVkLm1hcChyZXNvbHZlUmVmbGVjdGl2ZVByb3ZpZGVyKTtcbiAgcmV0dXJuIE1hcFdyYXBwZXIudmFsdWVzKFxuICAgICAgbWVyZ2VSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcnMocmVzb2x2ZWQsIG5ldyBNYXA8bnVtYmVyLCBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcj4oKSkpO1xufVxuXG4vKipcbiAqIE1lcmdlcyBhIGxpc3Qgb2YgUmVzb2x2ZWRQcm92aWRlcnMgaW50byBhIGxpc3Qgd2hlcmVcbiAqIGVhY2gga2V5IGlzIGNvbnRhaW5lZCBleGFjdGx5IG9uY2UgYW5kIG11bHRpIHByb3ZpZGVyc1xuICogaGF2ZSBiZWVuIG1lcmdlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJzKFxuICAgIHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSxcbiAgICBub3JtYWxpemVkUHJvdmlkZXJzTWFwOiBNYXA8bnVtYmVyLCBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcj4pOlxuICAgIE1hcDxudW1iZXIsIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyPiB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByb3ZpZGVyID0gcHJvdmlkZXJzW2ldO1xuICAgIHZhciBleGlzdGluZyA9IG5vcm1hbGl6ZWRQcm92aWRlcnNNYXAuZ2V0KHByb3ZpZGVyLmtleS5pZCk7XG4gICAgaWYgKGlzUHJlc2VudChleGlzdGluZykpIHtcbiAgICAgIGlmIChwcm92aWRlci5tdWx0aVByb3ZpZGVyICE9PSBleGlzdGluZy5tdWx0aVByb3ZpZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBNaXhpbmdNdWx0aVByb3ZpZGVyc1dpdGhSZWd1bGFyUHJvdmlkZXJzRXJyb3IoZXhpc3RpbmcsIHByb3ZpZGVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm92aWRlci5tdWx0aVByb3ZpZGVyKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcHJvdmlkZXIucmVzb2x2ZWRGYWN0b3JpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBleGlzdGluZy5yZXNvbHZlZEZhY3Rvcmllcy5wdXNoKHByb3ZpZGVyLnJlc29sdmVkRmFjdG9yaWVzW2pdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybWFsaXplZFByb3ZpZGVyc01hcC5zZXQocHJvdmlkZXIua2V5LmlkLCBwcm92aWRlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXNvbHZlZFByb3ZpZGVyO1xuICAgICAgaWYgKHByb3ZpZGVyLm11bHRpUHJvdmlkZXIpIHtcbiAgICAgICAgcmVzb2x2ZWRQcm92aWRlciA9IG5ldyBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcl8oXG4gICAgICAgICAgICBwcm92aWRlci5rZXksIExpc3RXcmFwcGVyLmNsb25lKHByb3ZpZGVyLnJlc29sdmVkRmFjdG9yaWVzKSwgcHJvdmlkZXIubXVsdGlQcm92aWRlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlZFByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICB9XG4gICAgICBub3JtYWxpemVkUHJvdmlkZXJzTWFwLnNldChwcm92aWRlci5rZXkuaWQsIHJlc29sdmVkUHJvdmlkZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZFByb3ZpZGVyc01hcDtcbn1cblxuZnVuY3Rpb24gX25vcm1hbGl6ZVByb3ZpZGVycyhcbiAgICBwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IHtbazogc3RyaW5nXTogYW55fSB8IFByb3ZpZGVyQnVpbGRlciB8IGFueVtdPixcbiAgICByZXM6IFByb3ZpZGVyW10pOiBQcm92aWRlcltdIHtcbiAgcHJvdmlkZXJzLmZvckVhY2goYiA9PiB7XG4gICAgaWYgKGIgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICByZXMucHVzaChwcm92aWRlKGIsIHt1c2VDbGFzczogYn0pKTtcblxuICAgIH0gZWxzZSBpZiAoYiBpbnN0YW5jZW9mIFByb3ZpZGVyKSB7XG4gICAgICByZXMucHVzaChiKTtcblxuICAgIH0gZWxzZSBpZiAoaXNQcm92aWRlckxpdGVyYWwoYikpIHtcbiAgICAgIHJlcy5wdXNoKGNyZWF0ZVByb3ZpZGVyKGIpKTtcblxuICAgIH0gZWxzZSBpZiAoYiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBfbm9ybWFsaXplUHJvdmlkZXJzKGIsIHJlcyk7XG5cbiAgICB9IGVsc2UgaWYgKGIgaW5zdGFuY2VvZiBQcm92aWRlckJ1aWxkZXIpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUHJvdmlkZXJFcnJvcihiLnRva2VuKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFByb3ZpZGVyRXJyb3IoYik7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0RGVwZW5kZW5jaWVzKHR5cGVPckZ1bmM6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBhbnlbXSk6IFJlZmxlY3RpdmVEZXBlbmRlbmN5W10ge1xuICBpZiAoaXNCbGFuayhkZXBlbmRlbmNpZXMpKSB7XG4gICAgcmV0dXJuIF9kZXBlbmRlbmNpZXNGb3IodHlwZU9yRnVuYyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcmFtczogYW55W11bXSA9IGRlcGVuZGVuY2llcy5tYXAodCA9PiBbdF0pO1xuICAgIHJldHVybiBkZXBlbmRlbmNpZXMubWFwKHQgPT4gX2V4dHJhY3RUb2tlbih0eXBlT3JGdW5jLCB0LCBwYXJhbXMpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVwZW5kZW5jaWVzRm9yKHR5cGVPckZ1bmM6IGFueSk6IFJlZmxlY3RpdmVEZXBlbmRlbmN5W10ge1xuICB2YXIgcGFyYW1zID0gcmVmbGVjdG9yLnBhcmFtZXRlcnModHlwZU9yRnVuYyk7XG4gIGlmIChpc0JsYW5rKHBhcmFtcykpIHJldHVybiBbXTtcbiAgaWYgKHBhcmFtcy5zb21lKGlzQmxhbmspKSB7XG4gICAgdGhyb3cgbmV3IE5vQW5ub3RhdGlvbkVycm9yKHR5cGVPckZ1bmMsIHBhcmFtcyk7XG4gIH1cbiAgcmV0dXJuIHBhcmFtcy5tYXAoKHA6IGFueVtdKSA9PiBfZXh0cmFjdFRva2VuKHR5cGVPckZ1bmMsIHAsIHBhcmFtcykpO1xufVxuXG5mdW5jdGlvbiBfZXh0cmFjdFRva2VuKHR5cGVPckZ1bmMsIG1ldGFkYXRhIC8qYW55W10gfCBhbnkqLyxcbiAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBhbnlbXVtdKTogUmVmbGVjdGl2ZURlcGVuZGVuY3kge1xuICB2YXIgZGVwUHJvcHMgPSBbXTtcbiAgdmFyIHRva2VuID0gbnVsbDtcbiAgdmFyIG9wdGlvbmFsID0gZmFsc2U7XG5cbiAgaWYgKCFpc0FycmF5KG1ldGFkYXRhKSkge1xuICAgIGlmIChtZXRhZGF0YSBpbnN0YW5jZW9mIEluamVjdE1ldGFkYXRhKSB7XG4gICAgICByZXR1cm4gX2NyZWF0ZURlcGVuZGVuY3kobWV0YWRhdGEudG9rZW4sIG9wdGlvbmFsLCBudWxsLCBudWxsLCBkZXBQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfY3JlYXRlRGVwZW5kZW5jeShtZXRhZGF0YSwgb3B0aW9uYWwsIG51bGwsIG51bGwsIGRlcFByb3BzKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbG93ZXJCb3VuZFZpc2liaWxpdHkgPSBudWxsO1xuICB2YXIgdXBwZXJCb3VuZFZpc2liaWxpdHkgPSBudWxsO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0YWRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyYW1NZXRhZGF0YSA9IG1ldGFkYXRhW2ldO1xuXG4gICAgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICB0b2tlbiA9IHBhcmFtTWV0YWRhdGE7XG5cbiAgICB9IGVsc2UgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBJbmplY3RNZXRhZGF0YSkge1xuICAgICAgdG9rZW4gPSBwYXJhbU1ldGFkYXRhLnRva2VuO1xuXG4gICAgfSBlbHNlIGlmIChwYXJhbU1ldGFkYXRhIGluc3RhbmNlb2YgT3B0aW9uYWxNZXRhZGF0YSkge1xuICAgICAgb3B0aW9uYWwgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChwYXJhbU1ldGFkYXRhIGluc3RhbmNlb2YgU2VsZk1ldGFkYXRhKSB7XG4gICAgICB1cHBlckJvdW5kVmlzaWJpbGl0eSA9IHBhcmFtTWV0YWRhdGE7XG5cbiAgICB9IGVsc2UgaWYgKHBhcmFtTWV0YWRhdGEgaW5zdGFuY2VvZiBIb3N0TWV0YWRhdGEpIHtcbiAgICAgIHVwcGVyQm91bmRWaXNpYmlsaXR5ID0gcGFyYW1NZXRhZGF0YTtcblxuICAgIH0gZWxzZSBpZiAocGFyYW1NZXRhZGF0YSBpbnN0YW5jZW9mIFNraXBTZWxmTWV0YWRhdGEpIHtcbiAgICAgIGxvd2VyQm91bmRWaXNpYmlsaXR5ID0gcGFyYW1NZXRhZGF0YTtcblxuICAgIH0gZWxzZSBpZiAocGFyYW1NZXRhZGF0YSBpbnN0YW5jZW9mIERlcGVuZGVuY3lNZXRhZGF0YSkge1xuICAgICAgaWYgKGlzUHJlc2VudChwYXJhbU1ldGFkYXRhLnRva2VuKSkge1xuICAgICAgICB0b2tlbiA9IHBhcmFtTWV0YWRhdGEudG9rZW47XG4gICAgICB9XG4gICAgICBkZXBQcm9wcy5wdXNoKHBhcmFtTWV0YWRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYodG9rZW4pO1xuXG4gIGlmIChpc1ByZXNlbnQodG9rZW4pKSB7XG4gICAgcmV0dXJuIF9jcmVhdGVEZXBlbmRlbmN5KHRva2VuLCBvcHRpb25hbCwgbG93ZXJCb3VuZFZpc2liaWxpdHksIHVwcGVyQm91bmRWaXNpYmlsaXR5LCBkZXBQcm9wcyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IE5vQW5ub3RhdGlvbkVycm9yKHR5cGVPckZ1bmMsIHBhcmFtcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZURlcGVuZGVuY3kodG9rZW4sIG9wdGlvbmFsLCBsb3dlckJvdW5kVmlzaWJpbGl0eSwgdXBwZXJCb3VuZFZpc2liaWxpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBQcm9wcyk6IFJlZmxlY3RpdmVEZXBlbmRlbmN5IHtcbiAgcmV0dXJuIG5ldyBSZWZsZWN0aXZlRGVwZW5kZW5jeShSZWZsZWN0aXZlS2V5LmdldCh0b2tlbiksIG9wdGlvbmFsLCBsb3dlckJvdW5kVmlzaWJpbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cHBlckJvdW5kVmlzaWJpbGl0eSwgZGVwUHJvcHMpO1xufVxuIl19