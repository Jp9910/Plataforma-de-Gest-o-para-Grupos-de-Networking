import clsx from "clsx"

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  label?: string
};

export default function TextArea({label = '', className = '', ...props }: Props) {

    return (
        <div className="flex flex-col">
            {label && <label className="text-sm -mb-2">{label}</label>}
            <textarea
                className={clsx("outline-2 outline-blue-400 rounded-md h-20 py-1 my-2", className)}
                aria-labelledby={`label-${label}`}
                {...props}
            />
        </div>
    )
}

