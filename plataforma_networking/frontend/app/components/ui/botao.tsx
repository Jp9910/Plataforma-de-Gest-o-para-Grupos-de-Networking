import clsx from "clsx"

function BotaoEstilizado (props: {
    className?: string,
    children: React.ReactNode,
    onClick?: () => void, 
    type?:"submit" | "reset" | "button" | undefined, 
    id?: string,
    disabled?: boolean
}) {
    const tipo = props.type ? props.type : "button"
    // console.log(props.children)
    return (
        <button 
            id={props.id}
            type={tipo} 
            onClick={props.onClick}
            disabled={props.disabled?? false}
            className={clsx(`inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                            text-white  rounded-lg  focus:outline-none focus:ring-blue-300 
                            dark:focus:ring-blue-800  my-2 mx-1`,
                        props.className,
                        {
                            'bg-gray-600 text-gray-400 cursor-not-allowed': (props.disabled && props.disabled === true),
                            'cursor-pointer bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600': !props.disabled
                        })
                    }
        >
            {props.children}
        </button>
    )
}

export default BotaoEstilizado