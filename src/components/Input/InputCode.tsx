import { UseFormRegister } from "react-hook-form";
interface Props {
    register: UseFormRegister<any>
}

export const InputCode = ({ register }: Props) => {
    return(
        <div className="inputc-index">
            {
                Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="inputc-box">
                        <input
                            {...register(`input${index + 1}`)} 
                            style={{ color: 'var(--main-bg-green)' }} 
                            className='inputc' maxLength={1} />
                    </div>
                ))
            }
        </div>
    )
}