import clsx from "clsx"
import { v4 as uuidv4 } from 'uuid';

function Select (props: {
    className?: string,
    label?: string,
    dados: Array<{id: number, nome: string}>,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
}) {
    return (
        <div className="flex flex-col">
            <select
                onChange={props.onChange}
                className={clsx(`block w-50 my-2 px-1 py-2 bg-transparent
                    outline-2 outline-blue-400 rounded-md text-heading text-sm
                    shadow-xs placeholder:text-body`, props.className)}
            >
                <option selected>{props.label}</option>
                {props.dados.map((dado) => {
                    return <option value={dado.id} key={dado.id}>{dado.nome}</option>
                })}
            </select>
        </div>
    )
}

export default Select