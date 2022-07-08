import { ReactNode } from 'react'

import './styles.scss'

interface CardProps {
	title: string
	className: string
	direction: 'horizontal' | 'vertical'
	children: ReactNode
}

export function Card({ title, className, direction = 'vertical', children }: CardProps) {
	return (
		<div className={`card card-${direction} ${className || ''}`}>
			<h1>{title}</h1>

			{children}
		</div>
	)
}
