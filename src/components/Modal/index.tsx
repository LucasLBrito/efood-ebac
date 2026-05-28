import styled, { keyframes } from 'styled-components'
import { theme } from '../../styles/theme'
import type { Prato } from '../../types'

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const slideIn = keyframes`
  from { transform: translateY(-24px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.73);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: ${fadeIn} 0.2s ease;
`

const ModalBox = styled.div`
  background-color: ${theme.colors.salmon};
  max-width: 680px;
  width: 100%;
  display: flex;
  position: relative;
  animation: ${slideIn} 0.25s ease;
`

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  color: ${theme.colors.cream};
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  font-family: inherit;
  z-index: 1;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`

const DishImage = styled.img`
  width: 220px;
  min-height: 280px;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  flex: 1;
`

const DishTitle = styled.h3`
  color: ${theme.colors.cream};
  font-size: 18px;
  font-weight: 900;
  padding-right: 24px;
`

const DishDescription = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  flex: 1;
`

const Portion = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 400;
`

const AddButton = styled.button`
  background-color: ${theme.colors.cream};
  color: ${theme.colors.salmon};
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  align-self: flex-start;
  white-space: nowrap;

  &:hover {
    opacity: 0.88;
  }
`

const formatPrice = (price: number) =>
  price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type Props = {
  prato: Prato
  onClose: () => void
}

const Modal = ({ prato, onClose }: Props) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox>
        <CloseButton onClick={onClose} aria-label="Fechar">×</CloseButton>
        <DishImage src={prato.foto} alt={prato.nome} />
        <Content>
          <DishTitle>{prato.nome}</DishTitle>
          <DishDescription>{prato.descricao}</DishDescription>
          <Portion>Serve: {prato.porcao}</Portion>
          <AddButton>
            Adicionar ao carrinho — {formatPrice(prato.preco)}
          </AddButton>
        </Content>
      </ModalBox>
    </Overlay>
  )
}

export default Modal
