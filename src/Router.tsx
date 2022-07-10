import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Resistors } from './pages/Resistors'
import { Shields } from './pages/Shields'
import { Calculos } from './pages/Calculo'

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/shields" element={<Shields />} />
			<Route path="/resistors" element={<Resistors />} />
			<Route path="/calc" element={<Calculos />} />
		</Routes>
	)
}
