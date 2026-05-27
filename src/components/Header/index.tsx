import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import heroBg from '../../assets/hero-bg.png'

const BrandLogo = styled.div`
  display: inline-flex;
  align-items: center;
  font-family: ${theme.fonts.family};
  font-size: 20px;
  font-weight: 900;
  color: ${theme.colors.salmon};
  border: 2px solid ${theme.colors.salmon};
  padding: 7px 16px;
  letter-spacing: 0.5px;
  background: transparent;
  user-select: none;

  span {
    font-weight: 100;
    margin-right: 2px;
  }
`

const HeroWrapper = styled.header`
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center top;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 80px;
  gap: 140px;
`

const NavWrapper = styled.header`
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center top;
  height: 163px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 171px;
`

const NavLink = styled(Link)`
  color: ${theme.colors.salmon};
  font-size: 18px;
  font-weight: 900;
  white-space: nowrap;
`

const HeroTitle = styled.h1`
  color: ${theme.colors.salmon};
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  max-width: 700px;
  line-height: 1.2;
`

type Props = {
  variant: 'home' | 'perfil'
  cartCount?: number
}

const Logo = () => (
  <BrandLogo>
    <span>Brito</span>efood
  </BrandLogo>
)

const Header = ({ variant, cartCount = 0 }: Props) => {
  if (variant === 'home') {
    return (
      <HeroWrapper>
        <Logo />
        <HeroTitle>
          Viva experiências gastronômicas
          <br />
          no conforto da sua casa
        </HeroTitle>
      </HeroWrapper>
    )
  }

  return (
    <NavWrapper>
      <NavLink to="/">Restaurantes</NavLink>
      <Logo />
      <NavLink to="/" style={{ textAlign: 'right' }}>
        {cartCount} produto(s) no carrinho
      </NavLink>
    </NavWrapper>
  )
}

export default Header
