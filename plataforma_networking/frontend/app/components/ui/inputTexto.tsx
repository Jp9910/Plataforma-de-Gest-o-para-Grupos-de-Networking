import clsx from "clsx"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  label?: string
};

export default function InputTexto({label = '', className = '', ...props }: Props) {

    return (
        <div className="flex flex-col">
            {label && <label className="text-sm -mb-2">{label}</label>}
            <input
                type="text"
                className={clsx("outline-2 outline-blue-400 rounded-md py-1 my-2", className)}
                {...props}
                data-testid="input-texto"
            />
        </div>
    )
}

