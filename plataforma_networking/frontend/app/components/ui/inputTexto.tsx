import clsx from "clsx"

export default function InputTexto(props: {
    label?: string,
    placeholder?: string,
    required?: boolean,
    value?: string,
    className?: string,
    setState: React.Dispatch<React.SetStateAction<string>>
}) {

    function aoDigitar(event: React.ChangeEvent<HTMLInputElement>) {
        props.setState(event.target.value)
    }

    return (
        <div className="flex">
            {props.label && <label className="pr-4">{props.label}</label>}
            <input 
                type="text"
                className={clsx("outline-2 outline-blue-400 rounded-md py-1", props.className)}
                value={props.value} 
                placeholder={props.placeholder} 
                onInput={aoDigitar} 
                required={props.required || false} 
            />
        </div>
    )
}

