import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/global'
import Home from './pages/Home'
import Restaurante from './pages/Restaurante'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle theme={theme} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurante/:id" element={<Restaurante />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
