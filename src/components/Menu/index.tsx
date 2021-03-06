import { useEffect } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'

import './styles.scss'

interface MenuProps {
	user: {
		name: string
		avatar_url: string
	}
}

export function Menu({ user }: MenuProps) {
	const { pathname } = useLocation()

	console.log(pathname)

	function handleToggleMenu() {
		const drawer = document.querySelector(".drawer");
		const mustOpen = !(drawer as Element).hasAttribute("open");

		if (mustOpen) {
			(drawer as Element).setAttribute("open", String(mustOpen));
		} else {
			(drawer as Element).removeAttribute("open");
		}
	}

	return (
		<aside className="menu">
			<IoMenuOutline
				size={40}
				className="trigger"
				onClick={handleToggleMenu}
			/>

			<div className="drawer">
				<div className="user-data">
					<img src={user?.avatar_url} />
					<span>{user?.name}</span>
				</div>

				<ul>
					<li>
						<a href="/" className={pathname === '/' ? 'active' : ''}>Home</a>
					</li>
					<li>
						<a href="/shields" className={pathname === '/shields' ? 'active' : ''}>
							Placas
						</a>
					</li>
					<li>
						<a href="/resistors" className={pathname === '/resistors' ? 'active' : ''}>
							Resistores
						</a>
					</li>
				</ul>
			</div>
		</aside>
	)
}