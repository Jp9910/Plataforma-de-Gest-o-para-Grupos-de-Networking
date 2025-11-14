import clsx from "clsx"

export default function TextArea(props: {
    label?: string,
    placeholder?: string,
    required?: boolean,
    value?: string,
    className?: string,
    disabled?: boolean
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
}) {

    return (
        <div className="flex flex-col">
            {props.label && <label className="text-sm -mb-2">{props.label}</label>}
            <textarea
                className={clsx("outline-2 outline-blue-400 rounded-md h-20 py-1 my-2", props.className)}
                value={props.value} 
                placeholder={props.placeholder} 
                onChange={props.onChange}
                required={props.required || false}
                disabled={props.disabled || false}
            />
        </div>
    )
}

