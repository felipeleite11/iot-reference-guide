import { Header } from './components/Header'
import { Menu } from './components/Menu'
import { Footer } from './components/Footer'

import { Shields } from './pages/Shields'

import './global-style.scss'

const user = {
  name: 'Felipe Leite',
  avatar_url: 'https://github.com/felipeleite11.png'
}

function App() {
  return (
    <div className="screen">
      <Header user={user} />

      <Menu user={user} />

      <main>
        <Shields />
      </main>

      <Footer />
    </div>
  )
}

export default App
