import { Section } from '../../models/interfaces'
import { Card } from '../Card/Card'
import './index.css'

interface Props {
    data: Section[]
}

export const CardList = ({ data }: Props) => {

    return (
        <div className='cardl-index'>
            {data.map(({ name, icon, value }, index) => (
                <Card
                    key={index}
                    title={name}
                    icon={icon}
                    value={value}
                />
            ))}
        </div>
    )
}