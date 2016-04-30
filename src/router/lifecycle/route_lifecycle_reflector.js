'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var lifecycle_annotations_impl_1 = require('./lifecycle_annotations_impl');
var reflection_1 = require('angular2/src/core/reflection/reflection');
function hasLifecycleHook(e, type) {
    if (!(type instanceof lang_1.Type))
        return false;
    return e.name in type.prototype;
}
exports.hasLifecycleHook = hasLifecycleHook;
function getCanActivateHook(type) {
    var annotations = reflection_1.reflector.annotations(type);
    for (var i = 0; i < annotations.length; i += 1) {
        var annotation = annotations[i];
        if (annotation instanceof lifecycle_annotations_impl_1.CanActivate) {
            return annotation.fn;
        }
    }
    return null;
}
exports.getCanActivateHook = getCanActivateHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfbGlmZWN5Y2xlX3JlZmxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtaW5uenBxQXkudG1wL2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbGlmZWN5Y2xlL3JvdXRlX2xpZmVjeWNsZV9yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUE0QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3ZELDJDQUE4Qyw4QkFBOEIsQ0FBQyxDQUFBO0FBQzdFLDJCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBRWxFLDBCQUFpQyxDQUFxQixFQUFFLElBQUk7SUFDMUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxXQUFJLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDMUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQVMsSUFBSyxDQUFDLFNBQVMsQ0FBQztBQUN4QyxDQUFDO0FBSGUsd0JBQWdCLG1CQUcvQixDQUFBO0FBRUQsNEJBQW1DLElBQUk7SUFDckMsSUFBSSxXQUFXLEdBQUcsc0JBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLHdDQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUM7QUFWZSwwQkFBa0IscUJBVWpDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1JvdXRlTGlmZWN5Y2xlSG9vaywgQ2FuQWN0aXZhdGV9IGZyb20gJy4vbGlmZWN5Y2xlX2Fubm90YXRpb25zX2ltcGwnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNMaWZlY3ljbGVIb29rKGU6IFJvdXRlTGlmZWN5Y2xlSG9vaywgdHlwZSk6IGJvb2xlYW4ge1xuICBpZiAoISh0eXBlIGluc3RhbmNlb2YgVHlwZSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGUubmFtZSBpbig8YW55PnR5cGUpLnByb3RvdHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhbkFjdGl2YXRlSG9vayh0eXBlKTogRnVuY3Rpb24ge1xuICB2YXIgYW5ub3RhdGlvbnMgPSByZWZsZWN0b3IuYW5ub3RhdGlvbnModHlwZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBsZXQgYW5ub3RhdGlvbiA9IGFubm90YXRpb25zW2ldO1xuICAgIGlmIChhbm5vdGF0aW9uIGluc3RhbmNlb2YgQ2FuQWN0aXZhdGUpIHtcbiAgICAgIHJldHVybiBhbm5vdGF0aW9uLmZuO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIl19