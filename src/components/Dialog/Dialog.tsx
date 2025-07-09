import { SubjectManager } from "../../models"
import React, { useEffect, useState } from "react"
import { IconButton } from "../IconButon"
import { Subscription } from "rxjs"
import "./index.css"
import { useDispatch } from "react-redux"
import { changeMode } from "../../redux/states"
interface Props {
    children: React.ReactNode
    title: string
}

export const dialogOpenSubject$ = new SubjectManager<boolean>();
export const dialogCloseSubject$ = new SubjectManager<boolean>();

export const Dialog = ({ children, title }: Props) => {

    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch();
    
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
        // after complete any action like edit/create any item its imperative to change mode to none
        dispatch(changeMode('none'))
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