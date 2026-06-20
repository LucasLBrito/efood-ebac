import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import heroBg from '../../assets/hero-bg.png'
import logo from '../../assets/logo.png'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { openCart } from '../../store/cartSlice'

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
`

const NavInner = styled.div`
  max-width: 1024px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
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
  white-space: nowrap;
`

const CartButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.salmon};
  font-size: 18px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  text-align: right;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
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
}

const Header = ({ variant }: Props) => {
  const dispatch = useAppDispatch()
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.quantidade, 0),
  )

  if (variant === 'home') {
    return (
      <HeroWrapper>
        <Logo src={logo} alt="efood" />
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
      <NavInner>
        <NavLink to="/">Restaurantes</NavLink>
        <Logo src={logo} alt="efood" />
        <CartButton onClick={() => dispatch(openCart())}>
          {totalItems} produto(s) no carrinho
        </CartButton>
      </NavInner>
    </NavWrapper>
  )
}

export default Header
