/* @ts2dart_const */
export class RouteLifecycleHook {
    constructor(name) {
        this.name = name;
    }
}
/* @ts2dart_const */
export class CanActivate {
    constructor(fn) {
        this.fn = fn;
    }
}
export const routerCanReuse = 
/*@ts2dart_const*/ new RouteLifecycleHook("routerCanReuse");
export const routerCanDeactivate = 
/*@ts2dart_const*/ new RouteLifecycleHook("routerCanDeactivate");
export const routerOnActivate = 
/*@ts2dart_const*/ new RouteLifecycleHook("routerOnActivate");
export const routerOnReuse = 
/*@ts2dart_const*/ new RouteLifecycleHook("routerOnReuse");
export const routerOnDeactivate = 
/*@ts2dart_const*/ new RouteLifecycleHook("routerOnDeactivate");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmZWN5Y2xlX2Fubm90YXRpb25zX2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTRyV3dzVFpsLnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL2xpZmVjeWNsZS9saWZlY3ljbGVfYW5ub3RhdGlvbnNfaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxvQkFBb0I7QUFDcEI7SUFDRSxZQUFtQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7QUFDckMsQ0FBQztBQUVELG9CQUFvQjtBQUNwQjtJQUNFLFlBQW1CLEVBQVk7UUFBWixPQUFFLEdBQUYsRUFBRSxDQUFVO0lBQUcsQ0FBQztBQUNyQyxDQUFDO0FBRUQsT0FBTyxNQUFNLGNBQWM7QUFDdkIsa0JBQWtCLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2hFLE9BQU8sTUFBTSxtQkFBbUI7QUFDNUIsa0JBQWtCLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3JFLE9BQU8sTUFBTSxnQkFBZ0I7QUFDekIsa0JBQWtCLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2xFLE9BQU8sTUFBTSxhQUFhO0FBQ3RCLGtCQUFrQixDQUFDLElBQUksa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDL0QsT0FBTyxNQUFNLGtCQUFrQjtBQUMzQixrQkFBa0IsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qIEB0czJkYXJ0X2NvbnN0ICovXG5leHBvcnQgY2xhc3MgUm91dGVMaWZlY3ljbGVIb29rIHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge31cbn1cblxuLyogQHRzMmRhcnRfY29uc3QgKi9cbmV4cG9ydCBjbGFzcyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmbjogRnVuY3Rpb24pIHt9XG59XG5cbmV4cG9ydCBjb25zdCByb3V0ZXJDYW5SZXVzZTogUm91dGVMaWZlY3ljbGVIb29rID1cbiAgICAvKkB0czJkYXJ0X2NvbnN0Ki8gbmV3IFJvdXRlTGlmZWN5Y2xlSG9vayhcInJvdXRlckNhblJldXNlXCIpO1xuZXhwb3J0IGNvbnN0IHJvdXRlckNhbkRlYWN0aXZhdGU6IFJvdXRlTGlmZWN5Y2xlSG9vayA9XG4gICAgLypAdHMyZGFydF9jb25zdCovIG5ldyBSb3V0ZUxpZmVjeWNsZUhvb2soXCJyb3V0ZXJDYW5EZWFjdGl2YXRlXCIpO1xuZXhwb3J0IGNvbnN0IHJvdXRlck9uQWN0aXZhdGU6IFJvdXRlTGlmZWN5Y2xlSG9vayA9XG4gICAgLypAdHMyZGFydF9jb25zdCovIG5ldyBSb3V0ZUxpZmVjeWNsZUhvb2soXCJyb3V0ZXJPbkFjdGl2YXRlXCIpO1xuZXhwb3J0IGNvbnN0IHJvdXRlck9uUmV1c2U6IFJvdXRlTGlmZWN5Y2xlSG9vayA9XG4gICAgLypAdHMyZGFydF9jb25zdCovIG5ldyBSb3V0ZUxpZmVjeWNsZUhvb2soXCJyb3V0ZXJPblJldXNlXCIpO1xuZXhwb3J0IGNvbnN0IHJvdXRlck9uRGVhY3RpdmF0ZTogUm91dGVMaWZlY3ljbGVIb29rID1cbiAgICAvKkB0czJkYXJ0X2NvbnN0Ki8gbmV3IFJvdXRlTGlmZWN5Y2xlSG9vayhcInJvdXRlck9uRGVhY3RpdmF0ZVwiKTtcbiJdfQ==