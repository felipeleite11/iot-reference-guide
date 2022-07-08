import './styles.scss'

interface HeaderProps {
	user: {
		avatar_url: string
	}
}

const appLogo = 'https://icon-library.com/images/arduino-icon/arduino-icon-21.jpg'

export function Header({ user }: HeaderProps) {
	return (
		<header>
			<img
				className="logo"
				src={appLogo}
			/>

			<img className="avatar" src={user?.avatar_url} />
		</header>
	)
}





