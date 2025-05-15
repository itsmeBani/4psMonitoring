import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils.ts"
import { buttonVariants } from "../ui/button.tsx"

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: React.ComponentProps<typeof DayPicker>) {
    return (
        <DayPicker
            captionLayout="dropdown"

            showOutsideDays={showOutsideDays}
            className={cn("p-4 bg-background rounded-md shadow-md", className)}
            classNames={{
                months: "flex flex-col sm:flex-row gap-4",
                month: "space-y-4",
                caption: "flex justify-center relative items-center w-full gap-2",
                caption_label: "text-sm font-medium",
                nav: "flex items-center gap-1",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "w-7 h-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell: "text-muted-foreground w-9 text-xs font-medium text-center",
                row: "flex w-full",
                cell: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                    props.mode === "range"
                        ? "[&:has(>.day-range-start)]:rounded-l-md [&:has(>.day-range-end)]:rounded-r-md"
                        : "[&:has([aria-selected])]:rounded-md"
                ),
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-9 h-9 p-0 font-normal aria-selected:opacity-100"
                ),
                day_range_start:
                    "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
                day_range_end:
                    "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside:
                    "day-outside text-muted-foreground aria-selected:text-muted-foreground",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ className, ...props }) => (
                    <ChevronLeft className={cn("w-4 h-4", className)} {...props} />
                ),
                IconRight: ({ className, ...props }) => (
                    <ChevronRight className={cn("w-4 h-4", className)} {...props} />
                ),
            }}
            {...props}
        />
    )
}

export { Calendar }
