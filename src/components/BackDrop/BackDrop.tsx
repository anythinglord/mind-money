import { Spinner } from '../Spinner'
import './index.css'

export const BackDrop = () => {
    return(
        <div className="dialog-wrap">
            <Spinner size='large'/>
        </div>
    )
}