import styled from 'styled-components'
import { theme } from '../../styles/theme'
import logo from '../../assets/logo.svg'
import { IconInstagram, IconFacebook, IconTwitter } from '../Icons'

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
  gap: 12px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.salmon};
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
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
    <Logo src={logo} alt="efood" />
    <SocialLinks>
      <a href="#" aria-label="Instagram">
        <IconInstagram />
      </a>
      <a href="#" aria-label="Facebook">
        <IconFacebook />
      </a>
      <a href="#" aria-label="Twitter">
        <IconTwitter />
      </a>
    </SocialLinks>
    <Copyright>
      A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela
      entrega, qualidade dos produtos é toda do estabelecimento contratado.
    </Copyright>
  </FooterWrapper>
)

export default Footer
