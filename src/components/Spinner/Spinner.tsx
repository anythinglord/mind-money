import './index.css'


type Size = 'small' | 'medium' | 'large' 
interface Props {
    size: Size
}

export const Spinner = ({ size }: Props) => {

    const getDimensions = (size: Size) => {
        
        const dimension = {     
            'small' : { width: 16, height: 16 },
            'medium': { width: 64, height: 64 },
            'large': { width: 128, height: 128 },
        }
        return dimension[size]
    }

    return (
        <svg className="spinner" viewBox="22 22 44 44" style={getDimensions(size)}>
            <circle className="path" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
        </svg>
    )
}