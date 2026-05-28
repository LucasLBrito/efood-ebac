import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { IconInstagram, IconFacebook, IconTwitter } from '../Icons'

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
    <BrandLogo>
      <span>Brito</span>efood
    </BrandLogo>
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
      A BritoEfood é uma plataforma para divulgação de estabelecimentos. A responsabilidade
      pela entrega e qualidade dos produtos é toda do estabelecimento contratado.
    </Copyright>
  </FooterWrapper>
)

export default Footer
