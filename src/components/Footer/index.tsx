import styled from 'styled-components'
import { theme } from '../../styles/theme'
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'

const FooterWrapper = styled.footer`
  background-color: ${theme.colors.cream};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 32px;
  gap: 32px;
`

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

const SocialLinks = styled.div`
  display: flex;
  gap: 8px;

  a {
    display: flex;
  }

  img {
    width: 24px;
    height: 24px;
  }
`

const Copyright = styled.p`
  color: ${theme.colors.salmon};
  font-size: 10px;
  text-align: center;
  max-width: 480px;
  line-height: 1.5;
`

const Footer = () => (
  <FooterWrapper>
    <BrandLogo>
      <span>Brito</span>efood
    </BrandLogo>
    <SocialLinks>
      <a href="#" aria-label="Instagram">
        <img src={instagram} alt="Instagram" />
      </a>
      <a href="#" aria-label="Facebook">
        <img src={facebook} alt="Facebook" />
      </a>
      <a href="#" aria-label="Twitter">
        <img src={twitter} alt="Twitter" />
      </a>
    </SocialLinks>
    <Copyright>
      A BritoEfood é uma plataforma para divulgação de estabelecimentos. A responsabilidade
      pela entrega e qualidade dos produtos é toda do estabelecimento contratado.
    </Copyright>
  </FooterWrapper>
)

export default Footer
