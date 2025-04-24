export const InputCode = () => {
    return(
        <div className="inputc-index">
            {
                Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="inputc-box">
                        <input 
                            style={{ color: 'var(--main-bg-green)' }} 
                            className='inputc' maxLength={1} />
                    </div>
                ))
            }
        </div>
    )
}