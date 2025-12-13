import { formatDate } from '../../utils'
import './index.css'

interface Props {
    title: string
    date?: string
    value: number | string
    type?: 'income' | 'default'
    icon?: string
}

export const Card = ({ title, date, value, type = 'default', icon = 'dollar-sign' }: Props) => {

    return (
        <div className={`card-box ${type === 'income' ? 'card-income' : ''}`}>
            <div className="card-header">
                <div className="card-title-section">
                    <span className="card-title">{title}</span>
                    {date && <span className="card-date">{formatDate(date)}</span>}
                </div>
                <i className={`fa-solid fa-${icon} card-icon`} />
            </div>
            <div className="card-value">
                {typeof value != 'string' ? '$ ' + value.toLocaleString() : value}
            </div>
        </div>
    )
}
