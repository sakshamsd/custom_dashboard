import { chevronsLeftRightSquare } from "@lucide/lab";
import { cn } from "../../utils";
import Icon from "../../components/Icon/Icon";

interface TogglerProps {
    isLabelShown: boolean;
    setIsLabelShown: () => void;
}

export default function Toggler(props: TogglerProps) {
    const { setIsLabelShown, isLabelShown } = props;
    return (
        <button
            onClick={setIsLabelShown}
            className={cn(
                `bg-black-200 border border-black-500 rounded-full w-7 h-7 z-999
                flex items-center justify-center
                absolute -right-3.5 top-[5.25rem]
              hover:bg-blue-300
                duration-500 ease-linear 
`,
                {
                    "rotate-180": !isLabelShown,
                },
            )}>
            <Icon
                icon={chevronsLeftRightSquare}
                // className={cn("text-black-900 ")}
                // variant="h6"
            />
        </button>
    );
}
