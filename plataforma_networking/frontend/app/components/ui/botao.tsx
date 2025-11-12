function BotaoEstilizado (props: {children: React.ReactNode, aoClicar?: () => void, tipo?:"submit" | "reset" | "button" | undefined, id?: string}) {
    const tipo = props.tipo ? props.tipo : "button"
    // console.log(props.children)
    return (
        <button 
            id={props.id}
            type={tipo} 
            onClick={props.aoClicar} 
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                    text-white bg-blue-700 rounded-lg hover:bg-blue-800
                    focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        >
            {props.children}
        </button>
    )
}

export default BotaoEstilizado