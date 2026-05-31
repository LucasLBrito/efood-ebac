import styled, { keyframes } from 'styled-components'
import { theme } from '../../styles/theme'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeItem, closeCart } from '../../store/cartSlice'

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.72);
  z-index: 900;
`

const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background-color: ${theme.colors.salmon};
  z-index: 901;
  display: flex;
  flex-direction: column;
  padding: 32px 8px;
  overflow-y: auto;
  animation: ${slideIn} 0.28s ease;
`

const Title = styled.h2`
  color: ${theme.colors.cream};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 24px;
  padding: 0 8px;
`

const EmptyMessage = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
  padding: 0 8px;
`

const ItemList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.05);
`

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
`

const ItemInfo = styled.div`
  flex: 1;
`

const ItemName = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
`

const ItemPrice = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
`

const RemoveButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.cream};
  color: ${theme.colors.cream};
  width: 20px;
  height: 20px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.75;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.cream};
  opacity: 0.25;
  margin: 24px 8px 16px;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  margin-bottom: 16px;
`

const TotalLabel = styled.span`
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 700;
`

const TotalValue = styled.span`
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 700;
`

const CheckoutButton = styled.button`
  background-color: ${theme.colors.cream};
  color: ${theme.colors.salmon};
  border: none;
  width: calc(100% - 16px);
  margin: 0 8px;
  padding: 10px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.88;
  }
`

const formatPrice = (price: number) =>
  price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const Cart = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  return (
    <>
      <Overlay onClick={() => dispatch(closeCart())} />
      <Panel>
        <Title>Carrinho</Title>

        {items.length === 0 ? (
          <EmptyMessage>Adicione itens ao carrinho para continuar.</EmptyMessage>
        ) : (
          <>
            <ItemList>
              {items.map((item) => (
                <Item key={item.id}>
                  <ItemImage src={item.foto} alt={item.nome} />
                  <ItemInfo>
                    <ItemName>{item.nome}</ItemName>
                    <ItemPrice>{formatPrice(item.preco)}</ItemPrice>
                  </ItemInfo>
                  <RemoveButton
                    onClick={() => dispatch(removeItem(item.id))}
                    aria-label={`Remover ${item.nome}`}
                  >
                    ×
                  </RemoveButton>
                </Item>
              ))}
            </ItemList>

            <Divider />

            <TotalRow>
              <TotalLabel>Valor total</TotalLabel>
              <TotalValue>{formatPrice(total)}</TotalValue>
            </TotalRow>

            <CheckoutButton>Continuar com a entrega</CheckoutButton>
          </>
        )}
      </Panel>
    </>
  )
}

export default Cart
