import './index.css'


type Size = 'small' | 'medium' | 'large' 
interface Props {
    size: Size
}

export const Spinner = ({ size }: Props) => {

    const getDimensions = (size: Size) => {
        
        const dimension = {     
            'small' : { width: 24, height: 24 },
            'medium': { width: 48, height: 48 },
            'large': { width: 128, height: 128 },
        }
        return dimension[size]
    }

    return (
        <svg className="spinner" viewBox="22 22 44 44" style={getDimensions(size)}>
            <circle className="path" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" />
        </svg>
    )
}