import React from "react"
import "./index.css"

interface Props {
    children: React.ReactNode
}

export const Dialog = ({ children }: Props) => {
    return(
        <div className="dialog-wrap">
            <div className="dialog-index">
                {children}
            </div>
        </div>
    )
}