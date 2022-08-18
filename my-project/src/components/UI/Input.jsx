import React from 'react'
import './UI.module.scss'

const Input = ({ value, setValue, children, type, place, ...props }) => {
	return (
		<input
			value={value}
			onChange={e => setValue(e.target.value)}
			type={type}
			{...props}
			placeholder={place}
		/>
	)
}

export default Input
