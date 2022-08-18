import React from 'react'
import './UI.module.scss'

const P = ({ children, ...props }) => {
	return <p {...props}>{children}</p>
}

export default P
