import React from 'react'

const Paragraph = ({ style, text }) => {
    return (
        <p className={style}>{text}</p>
    )
}

export default Paragraph