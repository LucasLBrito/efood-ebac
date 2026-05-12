import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import heroBg from '../../assets/hero-bg.png'
import logo from '../../assets/logo.png'

const HeroWrapper = styled.header`
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center;
  padding: 40px 16px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`

const NavWrapper = styled.header`
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center top;
  padding: 24px 171px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.img`
  height: 57.5px;
`

const NavLink = styled(Link)`
  color: ${theme.colors.salmon};
  font-size: 18px;
  font-weight: 900;
`

const HeroTitle = styled.h1`
  color: ${theme.colors.salmon};
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  max-width: 600px;
  line-height: 1.2;
`

type Props = {
  variant: 'home' | 'perfil'
  cartCount?: number
}

const Header = ({ variant, cartCount = 0 }: Props) => {
  if (variant === 'home') {
    return (
      <HeroWrapper>
        <Logo src={logo} alt="eFood" />
        <HeroTitle>Viva experiências gastronômicas no conforto da sua casa</HeroTitle>
      </HeroWrapper>
    )
  }

  return (
    <NavWrapper>
      <NavLink to="/">Restaurantes</NavLink>
      <Logo src={logo} alt="eFood" />
      <NavLink to="/" style={{ textAlign: 'right' }}>
        {cartCount} produto(s) no carrinho
      </NavLink>
    </NavWrapper>
  )
}

export default Header
