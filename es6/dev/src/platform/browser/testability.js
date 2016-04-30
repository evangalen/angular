import { ListWrapper } from 'angular2/src/facade/collection';
import { global, isPresent } from 'angular2/src/facade/lang';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { setTestabilityGetter } from 'angular2/core';
class PublicTestability {
    constructor(testability) {
        this._testability = testability;
    }
    isStable() { return this._testability.isStable(); }
    whenStable(callback) { this._testability.whenStable(callback); }
    findBindings(using, provider, exactMatch) {
        return this.findProviders(using, provider, exactMatch);
    }
    findProviders(using, provider, exactMatch) {
        return this._testability.findBindings(using, provider, exactMatch);
    }
}
export class BrowserGetTestability {
    static init() { setTestabilityGetter(new BrowserGetTestability()); }
    addToWindow(registry) {
        global.getAngularTestability = (elem, findInAncestors = true) => {
            var testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return new PublicTestability(testability);
        };
        global.getAllAngularTestabilities = () => {
            var testabilities = registry.getAllTestabilities();
            return testabilities.map((testability) => { return new PublicTestability(testability); });
        };
        global.getAllAngularRootElements = () => registry.getAllRootElements();
        var whenAllStable = (callback) => {
            var testabilities = global.getAllAngularTestabilities();
            var count = testabilities.length;
            var didWork = false;
            var decrement = function (didWork_) {
                didWork = didWork || didWork_;
                count--;
                if (count == 0) {
                    callback(didWork);
                }
            };
            testabilities.forEach(function (testability) { testability.whenStable(decrement); });
        };
        if (!global.frameworkStabilizers) {
            global.frameworkStabilizers = ListWrapper.createGrowableSize(0);
        }
        global.frameworkStabilizers.push(whenAllStable);
    }
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        var t = registry.getTestability(elem);
        if (isPresent(t)) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (DOM.isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, DOM.getHost(elem), true);
        }
        return this.findTestabilityInTree(registry, DOM.parentElement(elem), true);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTRyV3dzVFpsLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90ZXN0YWJpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFrQixXQUFXLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDcEUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BSW5ELEVBQUMsR0FBRyxFQUFDLE1BQU0sdUNBQXVDO09BRWxELEVBS0wsb0JBQW9CLEVBQ3JCLE1BQU0sZUFBZTtBQUV0QjtJQUlFLFlBQVksV0FBd0I7UUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUFDLENBQUM7SUFFMUUsUUFBUSxLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU1RCxVQUFVLENBQUMsUUFBa0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFMUUsWUFBWSxDQUFDLEtBQVUsRUFBRSxRQUFnQixFQUFFLFVBQW1CO1FBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFVLEVBQUUsUUFBZ0IsRUFBRSxVQUFtQjtRQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyRSxDQUFDO0FBQ0gsQ0FBQztBQUVEO0lBQ0UsT0FBTyxJQUFJLEtBQUssb0JBQW9CLENBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBFLFdBQVcs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QixDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdFLENBQUM7QUFDSCxDQUFDO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcCwgTWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2dsb2JhbCwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuXG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5cbmltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIFRlc3RhYmlsaXR5UmVnaXN0cnksXG4gIFRlc3RhYmlsaXR5LFxuICBHZXRUZXN0YWJpbGl0eSxcbiAgc2V0VGVzdGFiaWxpdHlHZXR0ZXJcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmNsYXNzIFB1YmxpY1Rlc3RhYmlsaXR5IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdGVzdGFiaWxpdHk6IFRlc3RhYmlsaXR5O1xuXG4gIGNvbnN0cnVjdG9yKHRlc3RhYmlsaXR5OiBUZXN0YWJpbGl0eSkgeyB0aGlzLl90ZXN0YWJpbGl0eSA9IHRlc3RhYmlsaXR5OyB9XG5cbiAgaXNTdGFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90ZXN0YWJpbGl0eS5pc1N0YWJsZSgpOyB9XG5cbiAgd2hlblN0YWJsZShjYWxsYmFjazogRnVuY3Rpb24pIHsgdGhpcy5fdGVzdGFiaWxpdHkud2hlblN0YWJsZShjYWxsYmFjayk7IH1cblxuICBmaW5kQmluZGluZ3ModXNpbmc6IGFueSwgcHJvdmlkZXI6IHN0cmluZywgZXhhY3RNYXRjaDogYm9vbGVhbik6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5maW5kUHJvdmlkZXJzKHVzaW5nLCBwcm92aWRlciwgZXhhY3RNYXRjaCk7XG4gIH1cblxuICBmaW5kUHJvdmlkZXJzKHVzaW5nOiBhbnksIHByb3ZpZGVyOiBzdHJpbmcsIGV4YWN0TWF0Y2g6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RhYmlsaXR5LmZpbmRCaW5kaW5ncyh1c2luZywgcHJvdmlkZXIsIGV4YWN0TWF0Y2gpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCcm93c2VyR2V0VGVzdGFiaWxpdHkgaW1wbGVtZW50cyBHZXRUZXN0YWJpbGl0eSB7XG4gIHN0YXRpYyBpbml0KCkgeyBzZXRUZXN0YWJpbGl0eUdldHRlcihuZXcgQnJvd3NlckdldFRlc3RhYmlsaXR5KCkpOyB9XG5cbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkIHtcbiAgICBnbG9iYWwuZ2V0QW5ndWxhclRlc3RhYmlsaXR5ID0gKGVsZW06IGFueSwgZmluZEluQW5jZXN0b3JzOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgdmFyIHRlc3RhYmlsaXR5ID0gcmVnaXN0cnkuZmluZFRlc3RhYmlsaXR5SW5UcmVlKGVsZW0sIGZpbmRJbkFuY2VzdG9ycyk7XG4gICAgICBpZiAodGVzdGFiaWxpdHkgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRlc3RhYmlsaXR5IGZvciBlbGVtZW50LicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNUZXN0YWJpbGl0eSh0ZXN0YWJpbGl0eSk7XG4gICAgfTtcblxuICAgIGdsb2JhbC5nZXRBbGxBbmd1bGFyVGVzdGFiaWxpdGllcyA9ICgpID0+IHtcbiAgICAgIHZhciB0ZXN0YWJpbGl0aWVzID0gcmVnaXN0cnkuZ2V0QWxsVGVzdGFiaWxpdGllcygpO1xuICAgICAgcmV0dXJuIHRlc3RhYmlsaXRpZXMubWFwKCh0ZXN0YWJpbGl0eSkgPT4geyByZXR1cm4gbmV3IFB1YmxpY1Rlc3RhYmlsaXR5KHRlc3RhYmlsaXR5KTsgfSk7XG4gICAgfTtcblxuICAgIGdsb2JhbC5nZXRBbGxBbmd1bGFyUm9vdEVsZW1lbnRzID0gKCkgPT4gcmVnaXN0cnkuZ2V0QWxsUm9vdEVsZW1lbnRzKCk7XG5cbiAgICB2YXIgd2hlbkFsbFN0YWJsZSA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgdmFyIHRlc3RhYmlsaXRpZXMgPSBnbG9iYWwuZ2V0QWxsQW5ndWxhclRlc3RhYmlsaXRpZXMoKTtcbiAgICAgIHZhciBjb3VudCA9IHRlc3RhYmlsaXRpZXMubGVuZ3RoO1xuICAgICAgdmFyIGRpZFdvcmsgPSBmYWxzZTtcbiAgICAgIHZhciBkZWNyZW1lbnQgPSBmdW5jdGlvbihkaWRXb3JrXykge1xuICAgICAgICBkaWRXb3JrID0gZGlkV29yayB8fCBkaWRXb3JrXztcbiAgICAgICAgY291bnQtLTtcbiAgICAgICAgaWYgKGNvdW50ID09IDApIHtcbiAgICAgICAgICBjYWxsYmFjayhkaWRXb3JrKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRlc3RhYmlsaXRpZXMuZm9yRWFjaChmdW5jdGlvbih0ZXN0YWJpbGl0eSkgeyB0ZXN0YWJpbGl0eS53aGVuU3RhYmxlKGRlY3JlbWVudCk7IH0pO1xuICAgIH07XG5cbiAgICBpZiAoIWdsb2JhbC5mcmFtZXdvcmtTdGFiaWxpemVycykge1xuICAgICAgZ2xvYmFsLmZyYW1ld29ya1N0YWJpbGl6ZXJzID0gTGlzdFdyYXBwZXIuY3JlYXRlR3Jvd2FibGVTaXplKDApO1xuICAgIH1cbiAgICBnbG9iYWwuZnJhbWV3b3JrU3RhYmlsaXplcnMucHVzaCh3aGVuQWxsU3RhYmxlKTtcbiAgfVxuXG4gIGZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSwgZWxlbTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZEluQW5jZXN0b3JzOiBib29sZWFuKTogVGVzdGFiaWxpdHkge1xuICAgIGlmIChlbGVtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgdCA9IHJlZ2lzdHJ5LmdldFRlc3RhYmlsaXR5KGVsZW0pO1xuICAgIGlmIChpc1ByZXNlbnQodCkpIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAoIWZpbmRJbkFuY2VzdG9ycykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChET00uaXNTaGFkb3dSb290KGVsZW0pKSB7XG4gICAgICByZXR1cm4gdGhpcy5maW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnksIERPTS5nZXRIb3N0KGVsZW0pLCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmluZFRlc3RhYmlsaXR5SW5UcmVlKHJlZ2lzdHJ5LCBET00ucGFyZW50RWxlbWVudChlbGVtKSwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==