import { Section } from '../../models/interfaces'
import './index.css'

interface Props {
    data: Section[]
}

export const CardList = ({ data }: Props) => {

    return (
        <div className='cardl-index'>
            {data.map(({ name, icon, value }) => (
                <div className='card-box'>
                    <div className="card-header">
                        <span>{name}</span>
                        <i className={`fa-solid fa-${icon}`} />
                    </div>
                    <div className="card-value">
                        {typeof value != 'string' ? '$ ' + value.toLocaleString() : value}
                    </div>
                </div>
            ))}
        </div>
    )
}