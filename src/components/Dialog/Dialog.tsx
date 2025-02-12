import React from "react"
import "./index.css"
import { IconButton } from "../IconButon/IconButton"

interface Props {
    open: boolean
    setOpen: () => void
    children: React.ReactNode
}

export const Dialog = ({ open = false, setOpen, children }: Props) => {

    return (
        <>
            {open && <div className="dialog-wrap">
                <div className="dialog-index">
                    <div className="dialog-header">
                        Create new item
                        <IconButton type="xmark" handleClick={setOpen}/>
                    </div>
                    {children}
                </div>
            </div>}
        </>

    )
}