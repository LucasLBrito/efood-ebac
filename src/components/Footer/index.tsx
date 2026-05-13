import styled from 'styled-components'
import { theme } from '../../styles/theme'
import logo from '../../assets/logo.png'
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

const Logo = styled.img`
  height: 57.5px;
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
    <Logo src={logo} alt="eFood" />
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
      A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela
      entrega, qualidade dos produtos é toda do estabelecimento contratado.
    </Copyright>
  </FooterWrapper>
)

export default Footer
