const InputTexto = (props: {
        label:string,
        placeholder:string, 
        required:boolean, 
        state:string, 
        setState:React.Dispatch<React.SetStateAction<string>>
    }) => {

    function aoDigitar (event: React.ChangeEvent<HTMLInputElement>) {
        // event.preventDefault()
        // console.log(event)
        // console.log(event.target) // elemento do DOM onde aconteceu o evento
        // console.log(event.target.value)
        props.setState(event.target.value)
    }
    return (
        <div className="flex">
            {props.label && <label className="pr-4">{props.label}</label>}
            <input className="outline-2 outline-blue-400 rounded-md py-1" value={props.state} placeholder={props.placeholder} onInput={aoDigitar} required={props.required}/>
        </div>
    )
}

export default InputTexto

// aoDigitar: (event: React.ChangeEvent<HTMLInputElement>)=>void