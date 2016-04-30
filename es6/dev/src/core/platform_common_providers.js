import { Console } from 'angular2/src/core/console';
import { Reflector, reflector } from './reflection/reflection';
import { ReflectorReader } from './reflection/reflector_reader';
import { TestabilityRegistry } from 'angular2/src/core/testability/testability';
import { PLATFORM_CORE_PROVIDERS } from './application_ref';
function _reflector() {
    return reflector;
}
var __unused; // prevent missing use Dart warning.
/**
 * A default set of providers which should be included in any Angular platform.
 */
export const PLATFORM_COMMON_PROVIDERS = [
    PLATFORM_CORE_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: Reflector, useFactory: _reflector, deps: [] },
    /*@ts2dart_Provider*/ { provide: ReflectorReader, useExisting: Reflector },
    TestabilityRegistry,
    Console
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29tbW9uX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNHJXd3NUWmwudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL3BsYXRmb3JtX2NvbW1vbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BRU8sRUFBQyxPQUFPLEVBQUMsTUFBTSwyQkFBMkI7T0FDMUMsRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0seUJBQXlCO09BQ3JELEVBQUMsZUFBZSxFQUFDLE1BQU0sK0JBQStCO09BQ3RELEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQ0FBMkM7T0FDdEUsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLG1CQUFtQjtBQUV6RDtJQUNFLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVELElBQUksUUFBYyxDQUFDLENBQUUsb0NBQW9DO0FBRXpEOztHQUVHO0FBQ0gsT0FBTyxNQUFNLHlCQUF5QixHQUEyRDtJQUMvRix1QkFBdUI7SUFDdkIscUJBQXFCLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQztJQUM1RSxxQkFBcUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBQztJQUN4RSxtQkFBbUI7SUFDbkIsT0FBTztDQUNSLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0NvbnNvbGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NvbnNvbGUnO1xuaW1wb3J0IHtSZWZsZWN0b3IsIHJlZmxlY3Rvcn0gZnJvbSAnLi9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtSZWZsZWN0b3JSZWFkZXJ9IGZyb20gJy4vcmVmbGVjdGlvbi9yZWZsZWN0b3JfcmVhZGVyJztcbmltcG9ydCB7VGVzdGFiaWxpdHlSZWdpc3RyeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtQTEFURk9STV9DT1JFX1BST1ZJREVSU30gZnJvbSAnLi9hcHBsaWNhdGlvbl9yZWYnO1xuXG5mdW5jdGlvbiBfcmVmbGVjdG9yKCk6IFJlZmxlY3RvciB7XG4gIHJldHVybiByZWZsZWN0b3I7XG59XG5cbnZhciBfX3VudXNlZDogVHlwZTsgIC8vIHByZXZlbnQgbWlzc2luZyB1c2UgRGFydCB3YXJuaW5nLlxuXG4vKipcbiAqIEEgZGVmYXVsdCBzZXQgb2YgcHJvdmlkZXJzIHdoaWNoIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBhbnkgQW5ndWxhciBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlM6IEFycmF5PGFueSB8IFR5cGUgfCBQcm92aWRlciB8IGFueVtdPiA9IC8qQHRzMmRhcnRfY29uc3QqL1tcbiAgUExBVEZPUk1fQ09SRV9QUk9WSURFUlMsXG4gIC8qQHRzMmRhcnRfUHJvdmlkZXIqLyB7cHJvdmlkZTogUmVmbGVjdG9yLCB1c2VGYWN0b3J5OiBfcmVmbGVjdG9yLCBkZXBzOiBbXX0sXG4gIC8qQHRzMmRhcnRfUHJvdmlkZXIqLyB7cHJvdmlkZTogUmVmbGVjdG9yUmVhZGVyLCB1c2VFeGlzdGluZzogUmVmbGVjdG9yfSxcbiAgVGVzdGFiaWxpdHlSZWdpc3RyeSxcbiAgQ29uc29sZVxuXTtcbiJdfQ==