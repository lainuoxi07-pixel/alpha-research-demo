import * as React from "react"
import { cn } from "../../lib/utils"

interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({});

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string, value?: string, onValueChange?: (value: string) => void }
>(({ className, value, defaultValue, onValueChange, children, ...props }, ref) => (
  <TabsContext.Provider value={{ value: value ?? defaultValue, onValueChange }}>
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  </TabsContext.Provider>
))
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string, active?: boolean }
>(({ className, value, active, onClick, ...props }, ref) => {
  const ctx = React.useContext(TabsContext);
  const isActive = active ?? (ctx.value === value);
  return (
    <button
      ref={ref}
      type="button"
      data-state={isActive ? "active" : "inactive"}
      onClick={(e) => {
        ctx.onValueChange?.(value);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm" : "hover:text-foreground",
        className
      )}
      {...props}
    />
  );
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string, activeValue?: string }
>(({ className, value, activeValue, ...props }, ref) => {
  if (value !== activeValue) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
