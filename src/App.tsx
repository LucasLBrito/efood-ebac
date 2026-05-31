import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from './store'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/global'
import { useAppSelector } from './store/hooks'
import Home from './pages/Home'
import Restaurante from './pages/Restaurante'
import Cart from './components/Cart'

const AppContent = () => {
  const isCartOpen = useAppSelector((state) => state.cart.isOpen)

  return (
    <BrowserRouter>
      {isCartOpen && <Cart />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurante/:id" element={<Restaurante />} />
      </Routes>
    </BrowserRouter>
  )
}

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <AppContent />
    </ThemeProvider>
  </Provider>
)

export default App
