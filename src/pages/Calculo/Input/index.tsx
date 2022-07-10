import React, { useState } from 'react'

import './styles.scss'

interface InputProps {
	onChange: React.Dispatch<React.SetStateAction<number | null>>
	name: string
	label: string
	initialValue?: string
}

export function Input({ onChange, name, label, initialValue }: InputProps) {
	const [value, setValue] = useState(initialValue)

	return (
		<div className="input">
			<label htmlFor={name}>{label}</label>
			<input 
				id={name} 
				type="text" 
				value={value}
				onChange={e => {
					setValue(e.target.value)

					onChange(Number(e.target.value))
				}} 
			/>
		</div>
	)
}
