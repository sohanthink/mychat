import React from 'react'

const Image = ({ style, source, alt }) => {
    return (
        <img className={style} src={source} alt={alt} />
    )
}

export default Image