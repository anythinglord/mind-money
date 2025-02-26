import { SubjectManager } from "../../models"
import React, { useEffect, useState } from "react"
import { IconButton } from "../IconButon"
import { Subscription } from "rxjs"
import "./index.css"
interface Props {
    children: React.ReactNode
    title: string
}

export const dialogOpenSubject$ = new SubjectManager<boolean>();
export const dialogCloseSubject$ = new SubjectManager<boolean>();

export const Dialog = ({ children, title }: Props) => {

    const [open, setOpen] = useState<boolean>(false)
    
    let openSubject$ = new Subscription();
    let closeSubject$ = new Subscription();

    useEffect(()=>{
        openSubject$ = dialogOpenSubject$.getSubject.subscribe(() => handleClickOpen())
        closeSubject$ = dialogCloseSubject$.getSubject.subscribe(() => handleClose())
        
        return () => {
            openSubject$.unsubscribe();
            closeSubject$.unsubscribe();
        }
    }, [])

    const handleClickOpen = () => {
        setOpen(true)
    } 

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {open && <div className="dialog-wrap">
                <div className="dialog-index">
                    <div className="dialog-header">
                        {title}
                        <IconButton type="xmark" handleClick={handleClose}/>
                    </div>
                    {children}
                </div>
            </div>}
        </>

    )
}