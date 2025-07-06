import * as React from "react";
import { Provider, Root, Trigger, Content } from "@radix-ui/react-tooltip";
import { cn } from "../../utils";

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof Content>,
    React.ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 10, ...props }, ref) => (
    <Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 overflow-hidden break-words rounded-md bg-black-900 drop-shadow-lg py-1 px-2 max-w-[17rem] text-white text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
        )}
        {...props}
    />
));
TooltipContent.displayName = Content.displayName;

interface Props extends React.ComponentPropsWithoutRef<typeof Content> {
    triggerElement: React.ReactElement;
    triggerElementClassName?: string;
    children: React.ReactNode;
}

export const Tooltip = React.forwardRef<React.ElementRef<typeof Content>, Props>(
    ({ triggerElement, children, triggerElementClassName, ...props }, ref) => {
        return (
            <Provider delayDuration={300}>
                <Root>
                    <Trigger
                        type="button"
                        className={cn("cursor-default", triggerElementClassName)}>
                        {triggerElement}
                    </Trigger>
                    <TooltipContent
                        {...props}
                        ref={ref}>
                        {children}
                    </TooltipContent>
                </Root>
            </Provider>
        );
    },
);

Tooltip.displayName = "Tooltip";
