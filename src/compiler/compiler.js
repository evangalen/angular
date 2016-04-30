'use strict';"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var platform_directives_and_pipes_1 = require('angular2/src/core/platform_directives_and_pipes');
exports.PLATFORM_DIRECTIVES = platform_directives_and_pipes_1.PLATFORM_DIRECTIVES;
exports.PLATFORM_PIPES = platform_directives_and_pipes_1.PLATFORM_PIPES;
__export(require('angular2/src/compiler/template_ast'));
var template_parser_1 = require('angular2/src/compiler/template_parser');
exports.TEMPLATE_TRANSFORMS = template_parser_1.TEMPLATE_TRANSFORMS;
var config_1 = require('./config');
exports.CompilerConfig = config_1.CompilerConfig;
exports.RenderTypes = config_1.RenderTypes;
__export(require('./compile_metadata'));
__export(require('./offline_compiler'));
var runtime_compiler_1 = require('./runtime_compiler');
exports.RuntimeCompiler = runtime_compiler_1.RuntimeCompiler;
__export(require('angular2/src/compiler/url_resolver'));
__export(require('angular2/src/compiler/xhr'));
var view_resolver_1 = require('./view_resolver');
exports.ViewResolver = view_resolver_1.ViewResolver;
var directive_resolver_1 = require('./directive_resolver');
exports.DirectiveResolver = directive_resolver_1.DirectiveResolver;
var pipe_resolver_1 = require('./pipe_resolver');
exports.PipeResolver = pipe_resolver_1.PipeResolver;
var lang_1 = require('angular2/src/facade/lang');
var template_parser_2 = require('angular2/src/compiler/template_parser');
var html_parser_1 = require('angular2/src/compiler/html_parser');
var directive_normalizer_1 = require('angular2/src/compiler/directive_normalizer');
var metadata_resolver_1 = require('angular2/src/compiler/metadata_resolver');
var style_compiler_1 = require('angular2/src/compiler/style_compiler');
var view_compiler_1 = require('angular2/src/compiler/view_compiler/view_compiler');
var config_2 = require('./config');
var component_resolver_1 = require('angular2/src/core/linker/component_resolver');
var runtime_compiler_2 = require('angular2/src/compiler/runtime_compiler');
var element_schema_registry_1 = require('angular2/src/compiler/schema/element_schema_registry');
var dom_element_schema_registry_1 = require('angular2/src/compiler/schema/dom_element_schema_registry');
var url_resolver_2 = require('angular2/src/compiler/url_resolver');
var parser_1 = require('./expression_parser/parser');
var lexer_1 = require('./expression_parser/lexer');
var view_resolver_2 = require('./view_resolver');
var directive_resolver_2 = require('./directive_resolver');
var pipe_resolver_2 = require('./pipe_resolver');
function _createCompilerConfig() {
    return new config_2.CompilerConfig(lang_1.assertionsEnabled(), false, true);
}
/**
 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
 * template compilation.
 */
exports.COMPILER_PROVIDERS = 
/*@ts2dart_const*/ [
    lexer_1.Lexer,
    parser_1.Parser,
    html_parser_1.HtmlParser,
    template_parser_2.TemplateParser,
    directive_normalizer_1.DirectiveNormalizer,
    metadata_resolver_1.CompileMetadataResolver,
    url_resolver_2.DEFAULT_PACKAGE_URL_PROVIDER,
    style_compiler_1.StyleCompiler,
    view_compiler_1.ViewCompiler,
    /*@ts2dart_Provider*/ { provide: config_2.CompilerConfig, useFactory: _createCompilerConfig, deps: [] },
    runtime_compiler_2.RuntimeCompiler,
    /*@ts2dart_Provider*/ { provide: component_resolver_1.ComponentResolver, useExisting: runtime_compiler_2.RuntimeCompiler },
    dom_element_schema_registry_1.DomElementSchemaRegistry,
    /*@ts2dart_Provider*/ { provide: element_schema_registry_1.ElementSchemaRegistry, useExisting: dom_element_schema_registry_1.DomElementSchemaRegistry },
    url_resolver_2.UrlResolver,
    view_resolver_2.ViewResolver,
    directive_resolver_2.DirectiveResolver,
    pipe_resolver_2.PipeResolver
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWlubnpwcUF5LnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDhDQUFrRCxpREFBaUQsQ0FBQztBQUE1RixrRkFBbUI7QUFBRSx3RUFBdUU7QUFDcEcsaUJBQWMsb0NBQW9DLENBQUMsRUFBQTtBQUNuRCxnQ0FBa0MsdUNBQXVDLENBQUM7QUFBbEUsb0VBQWtFO0FBQzFFLHVCQUEwQyxVQUFVLENBQUM7QUFBN0MsaURBQWM7QUFBRSwyQ0FBNkI7QUFDckQsaUJBQWMsb0JBQW9CLENBQUMsRUFBQTtBQUNuQyxpQkFBYyxvQkFBb0IsQ0FBQyxFQUFBO0FBQ25DLGlDQUE4QixvQkFBb0IsQ0FBQztBQUEzQyw2REFBMkM7QUFDbkQsaUJBQWMsb0NBQW9DLENBQUMsRUFBQTtBQUNuRCxpQkFBYywyQkFBMkIsQ0FBQyxFQUFBO0FBRTFDLDhCQUEyQixpQkFBaUIsQ0FBQztBQUFyQyxvREFBcUM7QUFDN0MsbUNBQWdDLHNCQUFzQixDQUFDO0FBQS9DLG1FQUErQztBQUN2RCw4QkFBMkIsaUJBQWlCLENBQUM7QUFBckMsb0RBQXFDO0FBRTdDLHFCQUFzQywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pFLGdDQUE2Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQ3JFLDRCQUF5QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzdELHFDQUFrQyw0Q0FBNEMsQ0FBQyxDQUFBO0FBQy9FLGtDQUFzQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2hGLCtCQUE0QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQ25FLDhCQUEyQixtREFBbUQsQ0FBQyxDQUFBO0FBQy9FLHVCQUE2QixVQUFVLENBQUMsQ0FBQTtBQUN4QyxtQ0FBZ0MsNkNBQTZDLENBQUMsQ0FBQTtBQUM5RSxpQ0FBOEIsd0NBQXdDLENBQUMsQ0FBQTtBQUN2RSx3Q0FBb0Msc0RBQXNELENBQUMsQ0FBQTtBQUMzRiw0Q0FBdUMsMERBQTBELENBQUMsQ0FBQTtBQUNsRyw2QkFBd0Qsb0NBQW9DLENBQUMsQ0FBQTtBQUM3Rix1QkFBcUIsNEJBQTRCLENBQUMsQ0FBQTtBQUNsRCxzQkFBb0IsMkJBQTJCLENBQUMsQ0FBQTtBQUNoRCw4QkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUM3QyxtQ0FBZ0Msc0JBQXNCLENBQUMsQ0FBQTtBQUN2RCw4QkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUU3QztJQUNFLE1BQU0sQ0FBQyxJQUFJLHVCQUFjLENBQUMsd0JBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUVEOzs7R0FHRztBQUNVLDBCQUFrQjtBQUMzQixrQkFBa0IsQ0FBQTtJQUNoQixhQUFLO0lBQ0wsZUFBTTtJQUNOLHdCQUFVO0lBQ1YsZ0NBQWM7SUFDZCwwQ0FBbUI7SUFDbkIsMkNBQXVCO0lBQ3ZCLDJDQUE0QjtJQUM1Qiw4QkFBYTtJQUNiLDRCQUFZO0lBQ1oscUJBQXFCLENBQUMsRUFBQyxPQUFPLEVBQUUsdUJBQWMsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQztJQUM1RixrQ0FBZTtJQUNmLHFCQUFxQixDQUFDLEVBQUMsT0FBTyxFQUFFLHNDQUFpQixFQUFFLFdBQVcsRUFBRSxrQ0FBZSxFQUFDO0lBQ2hGLHNEQUF3QjtJQUN4QixxQkFBcUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSwrQ0FBcUIsRUFBRSxXQUFXLEVBQUUsc0RBQXdCLEVBQUM7SUFDN0YsMEJBQVc7SUFDWCw0QkFBWTtJQUNaLHNDQUFpQjtJQUNqQiw0QkFBWTtDQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1BMQVRGT1JNX0RJUkVDVElWRVMsIFBMQVRGT1JNX1BJUEVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9wbGF0Zm9ybV9kaXJlY3RpdmVzX2FuZF9waXBlcyc7XG5leHBvcnQgKiBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfYXN0JztcbmV4cG9ydCB7VEVNUExBVEVfVFJBTlNGT1JNU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3BhcnNlcic7XG5leHBvcnQge0NvbXBpbGVyQ29uZmlnLCBSZW5kZXJUeXBlc30gZnJvbSAnLi9jb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vb2ZmbGluZV9jb21waWxlcic7XG5leHBvcnQge1J1bnRpbWVDb21waWxlcn0gZnJvbSAnLi9ydW50aW1lX2NvbXBpbGVyJztcbmV4cG9ydCAqIGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci91cmxfcmVzb2x2ZXInO1xuZXhwb3J0ICogZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5cbmV4cG9ydCB7Vmlld1Jlc29sdmVyfSBmcm9tICcuL3ZpZXdfcmVzb2x2ZXInO1xuZXhwb3J0IHtEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnLi9kaXJlY3RpdmVfcmVzb2x2ZXInO1xuZXhwb3J0IHtQaXBlUmVzb2x2ZXJ9IGZyb20gJy4vcGlwZV9yZXNvbHZlcic7XG5cbmltcG9ydCB7YXNzZXJ0aW9uc0VuYWJsZWQsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1RlbXBsYXRlUGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfcGFyc2VyJztcbmltcG9ydCB7SHRtbFBhcnNlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfcGFyc2VyJztcbmltcG9ydCB7RGlyZWN0aXZlTm9ybWFsaXplcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2RpcmVjdGl2ZV9ub3JtYWxpemVyJztcbmltcG9ydCB7Q29tcGlsZU1ldGFkYXRhUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9tZXRhZGF0YV9yZXNvbHZlcic7XG5pbXBvcnQge1N0eWxlQ29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zdHlsZV9jb21waWxlcic7XG5pbXBvcnQge1ZpZXdDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3ZpZXdfY29tcGlsZXIvdmlld19jb21waWxlcic7XG5pbXBvcnQge0NvbXBpbGVyQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0NvbXBvbmVudFJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvY29tcG9uZW50X3Jlc29sdmVyJztcbmltcG9ydCB7UnVudGltZUNvbXBpbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvcnVudGltZV9jb21waWxlcic7XG5pbXBvcnQge0VsZW1lbnRTY2hlbWFSZWdpc3RyeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3NjaGVtYS9lbGVtZW50X3NjaGVtYV9yZWdpc3RyeSc7XG5pbXBvcnQge0RvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3NjaGVtYS9kb21fZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuaW1wb3J0IHtVcmxSZXNvbHZlciwgREVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3VybF9yZXNvbHZlcic7XG5pbXBvcnQge1BhcnNlcn0gZnJvbSAnLi9leHByZXNzaW9uX3BhcnNlci9wYXJzZXInO1xuaW1wb3J0IHtMZXhlcn0gZnJvbSAnLi9leHByZXNzaW9uX3BhcnNlci9sZXhlcic7XG5pbXBvcnQge1ZpZXdSZXNvbHZlcn0gZnJvbSAnLi92aWV3X3Jlc29sdmVyJztcbmltcG9ydCB7RGlyZWN0aXZlUmVzb2x2ZXJ9IGZyb20gJy4vZGlyZWN0aXZlX3Jlc29sdmVyJztcbmltcG9ydCB7UGlwZVJlc29sdmVyfSBmcm9tICcuL3BpcGVfcmVzb2x2ZXInO1xuXG5mdW5jdGlvbiBfY3JlYXRlQ29tcGlsZXJDb25maWcoKSB7XG4gIHJldHVybiBuZXcgQ29tcGlsZXJDb25maWcoYXNzZXJ0aW9uc0VuYWJsZWQoKSwgZmFsc2UsIHRydWUpO1xufVxuXG4vKipcbiAqIEEgc2V0IG9mIHByb3ZpZGVycyB0aGF0IHByb3ZpZGUgYFJ1bnRpbWVDb21waWxlcmAgYW5kIGl0cyBkZXBlbmRlbmNpZXMgdG8gdXNlIGZvclxuICogdGVtcGxhdGUgY29tcGlsYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBDT01QSUxFUl9QUk9WSURFUlM6IEFycmF5PGFueSB8IFR5cGUgfCB7W2s6IHN0cmluZ106IGFueX0gfCBhbnlbXT4gPVxuICAgIC8qQHRzMmRhcnRfY29uc3QqL1tcbiAgICAgIExleGVyLFxuICAgICAgUGFyc2VyLFxuICAgICAgSHRtbFBhcnNlcixcbiAgICAgIFRlbXBsYXRlUGFyc2VyLFxuICAgICAgRGlyZWN0aXZlTm9ybWFsaXplcixcbiAgICAgIENvbXBpbGVNZXRhZGF0YVJlc29sdmVyLFxuICAgICAgREVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUixcbiAgICAgIFN0eWxlQ29tcGlsZXIsXG4gICAgICBWaWV3Q29tcGlsZXIsXG4gICAgICAvKkB0czJkYXJ0X1Byb3ZpZGVyKi8ge3Byb3ZpZGU6IENvbXBpbGVyQ29uZmlnLCB1c2VGYWN0b3J5OiBfY3JlYXRlQ29tcGlsZXJDb25maWcsIGRlcHM6IFtdfSxcbiAgICAgIFJ1bnRpbWVDb21waWxlcixcbiAgICAgIC8qQHRzMmRhcnRfUHJvdmlkZXIqLyB7cHJvdmlkZTogQ29tcG9uZW50UmVzb2x2ZXIsIHVzZUV4aXN0aW5nOiBSdW50aW1lQ29tcGlsZXJ9LFxuICAgICAgRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5LFxuICAgICAgLypAdHMyZGFydF9Qcm92aWRlciovIHtwcm92aWRlOiBFbGVtZW50U2NoZW1hUmVnaXN0cnksIHVzZUV4aXN0aW5nOiBEb21FbGVtZW50U2NoZW1hUmVnaXN0cnl9LFxuICAgICAgVXJsUmVzb2x2ZXIsXG4gICAgICBWaWV3UmVzb2x2ZXIsXG4gICAgICBEaXJlY3RpdmVSZXNvbHZlcixcbiAgICAgIFBpcGVSZXNvbHZlclxuICAgIF07XG4iXX0=