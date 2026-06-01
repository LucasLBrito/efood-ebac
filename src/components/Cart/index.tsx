import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../../styles/theme'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeItem, closeCart, clearCart } from '../../store/cartSlice'

/* ─── animations ─────────────────────────────────────────────── */
const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`

/* ─── layout ─────────────────────────────────────────────────── */
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
  overflow-y: auto;
  animation: ${slideIn} 0.28s ease;
`

const PanelInner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32px 16px;
  gap: 0;
`

/* ─── typography ─────────────────────────────────────────────── */
const SectionTitle = styled.h2`
  color: ${theme.colors.cream};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 24px;
`

const BodyText = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
`

const EmptyMessage = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
`

/* ─── cart items ─────────────────────────────────────────────── */
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
  margin-bottom: 4px;
`

const ItemPrice = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
`

const RemoveBtn = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.cream};
  color: ${theme.colors.cream};
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.75;
  &:hover { opacity: 1; }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.cream};
  opacity: 0.25;
  margin: 24px 0 16px;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
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

/* ─── form ───────────────────────────────────────────────────── */
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  flex: 1;
`

const FormRow = styled.div`
  display: flex;
  gap: 12px;
`

const Label = styled.label`
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 700;
`

const Input = styled.input`
  background-color: ${theme.colors.cream};
  border: none;
  padding: 8px;
  font-size: 14px;
  font-family: inherit;
  color: ${theme.colors.salmon};
  width: 100%;

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.35);
    outline-offset: 1px;
  }
`

/* ─── buttons ────────────────────────────────────────────────── */
const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`

const PrimaryBtn = styled.button`
  background-color: ${theme.colors.cream};
  color: ${theme.colors.salmon};
  border: none;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover { opacity: 0.88; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const GhostBtn = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  width: 100%;
  padding: 6px;
  opacity: 0.8;
  &:hover { opacity: 1; }
`

/* ─── utils ──────────────────────────────────────────────────── */
const fmt = (price: number) =>
  price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type Step = 'cart' | 'delivery' | 'payment' | 'confirmation'

interface Delivery {
  receiver: string
  description: string
  city: string
  zipCode: string
  number: string
  complement: string
}

interface Payment {
  name: string
  number: string
  code: string
  month: string
  year: string
}

/* ─── component ──────────────────────────────────────────────── */
const Cart = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.cart.items)

  const [step, setStep] = useState<Step>('cart')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState('')

  const [delivery, setDelivery] = useState<Delivery>({
    receiver: '', description: '', city: '', zipCode: '', number: '', complement: '',
  })

  const [payment, setPayment] = useState<Payment>({
    name: '', number: '', code: '', month: '', year: '',
  })

  const total = items.reduce((acc, i) => acc + i.preco * i.quantidade, 0)

  const updD = (k: keyof Delivery) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDelivery((p) => ({ ...p, [k]: e.target.value }))

  const updP = (k: keyof Payment) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPayment((p) => ({ ...p, [k]: e.target.value }))

  const handleFinalize = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: items.map((i) => ({ id: i.id, price: i.preco })),
          delivery: {
            receiver: delivery.receiver,
            address: {
              description: delivery.description,
              city: delivery.city,
              zipCode: delivery.zipCode,
              number: Number(delivery.number),
              complement: delivery.complement,
            },
          },
          payment: {
            card: {
              name: payment.name,
              number: payment.number,
              code: Number(payment.code),
              expires: {
                month: Number(payment.month),
                year: Number(payment.year),
              },
            },
          },
        }),
      })
      const data = await res.json()
      setOrderId(data.orderId ?? '')
      dispatch(clearCart())
      setStep('confirmation')
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    dispatch(closeCart())
    setTimeout(() => setStep('cart'), 300)
  }

  /* ── step renders ─────────────────────────────────────────── */
  const renderCart = () => (
    <>
      <SectionTitle>Carrinho</SectionTitle>
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
                  <ItemPrice>{fmt(item.preco)}</ItemPrice>
                </ItemInfo>
                <RemoveBtn
                  onClick={() => dispatch(removeItem(item.id))}
                  aria-label={`Remover ${item.nome}`}
                >
                  ×
                </RemoveBtn>
              </Item>
            ))}
          </ItemList>
          <Divider />
          <TotalRow>
            <TotalLabel>Valor total</TotalLabel>
            <TotalValue>{fmt(total)}</TotalValue>
          </TotalRow>
          <BtnArea>
            <PrimaryBtn onClick={() => setStep('delivery')}>
              Continuar com a entrega
            </PrimaryBtn>
          </BtnArea>
        </>
      )}
    </>
  )

  const renderDelivery = () => (
    <>
      <SectionTitle>Entrega</SectionTitle>

      <FormGroup>
        <Label>Quem irá receber</Label>
        <Input value={delivery.receiver} onChange={updD('receiver')} required />
      </FormGroup>

      <FormGroup>
        <Label>Endereço</Label>
        <Input value={delivery.description} onChange={updD('description')} required />
      </FormGroup>

      <FormGroup>
        <Label>Cidade</Label>
        <Input value={delivery.city} onChange={updD('city')} required />
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Label>CEP</Label>
          <Input value={delivery.zipCode} onChange={updD('zipCode')} required />
        </FormGroup>
        <FormGroup>
          <Label>Número</Label>
          <Input
            type="number"
            value={delivery.number}
            onChange={updD('number')}
            required
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label>Complemento (opcional)</Label>
        <Input value={delivery.complement} onChange={updD('complement')} />
      </FormGroup>

      <BtnArea>
        <PrimaryBtn onClick={() => setStep('payment')}>
          Continuar com o pagamento
        </PrimaryBtn>
        <GhostBtn onClick={() => setStep('cart')}>Voltar ao carrinho</GhostBtn>
      </BtnArea>
    </>
  )

  const renderPayment = () => (
    <>
      <SectionTitle>
        Pagamento — {fmt(total)}
      </SectionTitle>

      <FormGroup>
        <Label>Nome no cartão</Label>
        <Input value={payment.name} onChange={updP('name')} required />
      </FormGroup>

      <FormRow>
        <FormGroup style={{ flex: 2 }}>
          <Label>Número do cartão</Label>
          <Input value={payment.number} onChange={updP('number')} required />
        </FormGroup>
        <FormGroup>
          <Label>CVV</Label>
          <Input value={payment.code} onChange={updP('code')} required />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Label>Mês de vencimento</Label>
          <Input
            value={payment.month}
            onChange={updP('month')}
            placeholder="MM"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Ano de vencimento</Label>
          <Input
            value={payment.year}
            onChange={updP('year')}
            placeholder="AAAA"
            required
          />
        </FormGroup>
      </FormRow>

      <BtnArea>
        <PrimaryBtn onClick={handleFinalize} disabled={loading}>
          {loading ? 'Finalizando pedido...' : 'Finalizar pedido'}
        </PrimaryBtn>
        <GhostBtn onClick={() => setStep('delivery')}>Voltar à entrega</GhostBtn>
      </BtnArea>
    </>
  )

  const renderConfirmation = () => (
    <>
      <SectionTitle>Pedido realizado — {orderId}</SectionTitle>
      <BodyText>
        Estamos felizes em informar que seu pedido já está em processo de preparação e, em
        breve, será entregue para você.
      </BodyText>
      <BodyText>
        Gostaríamos de ressaltar que nossos entregadores não estão autorizados a fazer trocas
        nem a receber pagamentos adicionais.
      </BodyText>
      <BodyText>
        Lembre-se da importância de higienizar as mãos após o recebimento do pedido,
        garantindo assim sua segurança e bem-estar durante a refeição.
      </BodyText>
      <BodyText>
        Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom
        apetite!
      </BodyText>
      <BtnArea>
        <PrimaryBtn onClick={handleClose}>Concluir</PrimaryBtn>
      </BtnArea>
    </>
  )

  return (
    <>
      {step !== 'confirmation' && <Overlay onClick={handleClose} />}
      {step === 'confirmation' && <Overlay />}
      <Panel>
        <PanelInner>
          {step === 'cart' && renderCart()}
          {step === 'delivery' && renderDelivery()}
          {step === 'payment' && renderPayment()}
          {step === 'confirmation' && renderConfirmation()}
        </PanelInner>
      </Panel>
    </>
  )
}

export default Cart
