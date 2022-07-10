import { BrowserRouter } from 'react-router-dom'

import { Router } from './Router'

import { Header } from './components/Header'
import { Menu } from './components/Menu'
import { Footer } from './components/Footer'

import './global-style.scss'

const user = {
  name: 'Felipe Leite',
  avatar_url: 'https://github.com/felipeleite11.png'
}

function App() {
  return (
    <BrowserRouter>
      <div className="screen">
        <Header user={user} />

        <Menu user={user} />

        <main>
          <Router />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
