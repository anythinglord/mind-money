import './index.css'
interface Props {
    message: string
}

export const Message = ({ message }: Props) => {
    return(
        <div className='message-root'>
            <i className="fa-solid fa-circle-exclamation" />
            {message}
        </div>
    )
}