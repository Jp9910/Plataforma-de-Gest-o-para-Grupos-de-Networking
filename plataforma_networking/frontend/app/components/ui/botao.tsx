import clsx from "clsx"

function BotaoEstilizado (props: {
    className?: string,
    children: React.ReactNode,
    onClick?: () => void, 
    type?:"submit" | "reset" | "button" | undefined, 
    id?: string
}) {
    const tipo = props.type ? props.type : "button"
    // console.log(props.children)
    return (
        <button 
            id={props.id}
            type={tipo} 
            onClick={props.onClick} 
            className={clsx(`inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                    text-white bg-blue-700 rounded-lg hover:bg-blue-800
                    focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer my-2 mx-1`, props.className)}
        >
            {props.children}
        </button>
    )
}

export default BotaoEstilizado