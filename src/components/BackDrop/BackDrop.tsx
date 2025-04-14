import { useState, useEffect } from 'react';
import { SubjectManager } from '../../models';
import { Spinner } from '../Spinner'
import { Subscription } from 'rxjs';


export const backdropOpenSubject$ = new SubjectManager<boolean>();
export const backdropCloseSubject$ = new SubjectManager<boolean>();

export const BackDrop = () => {

    const [open, setOpen] = useState<boolean>(false)

    let openSubject$ = new Subscription();
    let closeSubject$ = new Subscription();

    useEffect(() => {
        openSubject$ = backdropOpenSubject$.getSubject.subscribe(() => handleClickOpen())
        closeSubject$ = backdropCloseSubject$.getSubject.subscribe(() => handleClose())

        return () => {
            openSubject$.unsubscribe();
            closeSubject$.unsubscribe();
        }
    }, [])

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    return (
        <>
            {open && <div className="dialog-wrap">
                <Spinner size='medium' />
            </div>}
        </>
    )
}