import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../services';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/states';
import './index.css'

interface Option {
    name: string
    icon: string
}

export const Avatar = () => {

    const [open, setOpen] = useState(false);
    const [options, _] = useState<Option[]>([
        { name: 'Settings', icon: 'fa-gear' },
        { name: 'Log out', icon: 'fa-right-from-bracket' }
    ])

    const dispatch = useDispatch()

    const mutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            dispatch(setUser(null))
        },
        onError: (error) => alert("Error: " + error.message),
    });

    const handleOptionClick = (option: string) => {
        if (option === 'Log out') {
            mutation.mutate()
        }
    }

    return (
        <>
            <button className={`avatar ${open ? 'avatar-active' : ''}`} onClick={() => setOpen(prevState => !prevState)}>
                <i className="fa-solid fa-user" />
            </button>
            {open && <div className='avatar-collapse'>
                {options.map(({ name, icon }, index) => (
                    <div className="avatar-item" key={index} onClick={() => handleOptionClick(name)}>
                        <i className={`fa-solid ${icon}`} />
                        <span>{name}</span>
                    </div>
                ))}
            </div>}
        </>

    )
}