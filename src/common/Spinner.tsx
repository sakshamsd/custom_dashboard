import { cn } from "../utils";

interface Props {
    className?: string;
}
function Spinner(props: Props) {
    const { className = "" } = props;
    return (
        <div className={"text-center"}>
            <div
                className={cn(
                    "inline-block animate-spin h-8 w-8 text-blue-600 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]  motion-reduce:animate-[spin_1.5s_linear_infinite]",
                    className,
                )}
                role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        </div>
    );
}

export default Spinner;
