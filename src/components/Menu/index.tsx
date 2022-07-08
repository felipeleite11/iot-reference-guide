import { IoMenuOutline } from 'react-icons/io5'

import './styles.scss'

interface MenuProps {
	user: {
		name: string
		avatar_url: string
	}
}

export function Menu({ user }: MenuProps) {
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
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#" className="active">
							Placas
						</a>
					</li>
				</ul>
			</div>
		</aside>
	)
}