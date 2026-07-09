import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { theme } from '../../styles/theme'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeItem, closeCart, clearCart } from '../../store/cartSlice'
import { IconTrash } from '../Icons'

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
  padding: 32px 8px;
`

/* ─── typography ─────────────────────────────────────────────── */
const SectionTitle = styled.h2`
  color: ${theme.colors.cream};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
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
`

const Item = styled.li`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  background-color: ${theme.colors.cream};
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
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ItemName = styled.p`
  color: ${theme.colors.salmon};
  font-size: 18px;
  font-weight: 900;
`

const ItemPrice = styled.p`
  color: ${theme.colors.salmon};
  font-size: 14px;
`

const RemoveBtn = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  transition: opacity 0.15s;

  svg {
    width: 16px;
    height: 16px;
    fill: ${theme.colors.salmon};
  }

  &:hover {
    opacity: 0.7;
  }
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 700;
  margin: 40px 0 16px;
`

/* ─── form ───────────────────────────────────────────────────── */
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`

const FormRow = styled.div`
  display: flex;
  gap: 34px;

  & > * {
    flex: 1;
  }
`

const Label = styled.label`
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 700;
`

const Input = styled.input<{ $error?: boolean }>`
  background-color: ${theme.colors.cream};
  border: 2px solid ${(p) => (p.$error ? '#8b1a1a' : theme.colors.cream)};
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
  font-family: inherit;
  color: ${theme.colors.salmon};
  width: 100%;

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.35);
    outline-offset: 1px;
  }
`

const ErrorText = styled.span`
  color: ${theme.colors.cream};
  font-size: 12px;
  font-style: italic;
`

/* ─── buttons ────────────────────────────────────────────────── */
const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`

const PrimaryBtn = styled.button`
  background-color: ${theme.colors.cream};
  color: ${theme.colors.salmon};
  border: none;
  width: 100%;
  padding: 4px;
  height: 24px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

/* ─── utils ──────────────────────────────────────────────────── */
const fmt = (price: number) =>
  price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type Step = 'cart' | 'delivery' | 'payment' | 'confirmation'

const validationSchema = Yup.object({
  receiver: Yup.string()
    .min(5, 'O nome precisa ter ao menos 5 caracteres')
    .required('Campo obrigatório'),
  description: Yup.string()
    .min(5, 'O endereço precisa ter ao menos 5 caracteres')
    .required('Campo obrigatório'),
  city: Yup.string()
    .min(3, 'A cidade precisa ter ao menos 3 caracteres')
    .required('Campo obrigatório'),
  zipCode: Yup.string()
    .matches(/^\d{5}-?\d{3}$/, 'CEP inválido (use 00000-000)')
    .required('Campo obrigatório'),
  houseNumber: Yup.string()
    .matches(/^\d+$/, 'Informe apenas números')
    .required('Campo obrigatório'),
  complement: Yup.string(),
  cardName: Yup.string()
    .min(5, 'Informe o nome como está no cartão')
    .required('Campo obrigatório'),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Número do cartão inválido (16 dígitos)')
    .required('Campo obrigatório'),
  cardCode: Yup.string()
    .matches(/^\d{3}$/, 'CVV inválido (3 dígitos)')
    .required('Campo obrigatório'),
  expiresMonth: Yup.string()
    .matches(/^(0?[1-9]|1[0-2])$/, 'Mês inválido')
    .required('Campo obrigatório'),
  expiresYear: Yup.string()
    .matches(/^\d{4}$/, 'Ano inválido (AAAA)')
    .required('Campo obrigatório'),
})

/* ─── component ──────────────────────────────────────────────── */
const Cart = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.cart.items)

  const [step, setStep] = useState<Step>('cart')
  const [orderId, setOrderId] = useState('')

  const total = items.reduce((acc, i) => acc + i.preco * i.quantidade, 0)

  const form = useFormik({
    initialValues: {
      receiver: '', description: '', city: '', zipCode: '', houseNumber: '', complement: '',
      cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products: items.map((i) => ({ id: i.id, price: i.preco })),
            delivery: {
              receiver: values.receiver,
              address: {
                description: values.description,
                city: values.city,
                zipCode: values.zipCode,
                number: Number(values.houseNumber),
                complement: values.complement,
              },
            },
            payment: {
              card: {
                name: values.cardName,
                number: values.cardNumber,
                code: Number(values.cardCode),
                expires: {
                  month: Number(values.expiresMonth),
                  year: Number(values.expiresYear),
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
      }
    },
  })

  const isErr = (field: keyof typeof form.values) =>
    Boolean(form.touched[field] && form.errors[field])

  const errMsg = (field: keyof typeof form.values) =>
    form.touched[field] && form.errors[field] ? form.errors[field] : ''

  const deliveryFields = [
    'receiver', 'description', 'city', 'zipCode', 'houseNumber',
  ] as const

  const goToPayment = async () => {
    form.setTouched(
      { receiver: true, description: true, city: true, zipCode: true, houseNumber: true },
      true,
    )
    const errors = await form.validateForm()
    if (deliveryFields.every((f) => !errors[f])) setStep('payment')
  }

  const handleClose = () => {
    dispatch(closeCart())
    setTimeout(() => setStep('cart'), 300)
  }

  const fieldProps = (field: keyof typeof form.values) => ({
    name: field,
    value: form.values[field],
    onChange: form.handleChange,
    onBlur: form.handleBlur,
    $error: isErr(field),
  })

  /* ── step renders ─────────────────────────────────────────── */
  const renderCart = () =>
    items.length === 0 ? (
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
                <IconTrash />
              </RemoveBtn>
            </Item>
          ))}
        </ItemList>
        <TotalRow>
          <span>Valor total</span>
          <span>{fmt(total)}</span>
        </TotalRow>
        <BtnArea>
          <PrimaryBtn onClick={() => setStep('delivery')}>
            Continuar com a entrega
          </PrimaryBtn>
        </BtnArea>
      </>
    )

  const renderDelivery = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        goToPayment()
      }}
      noValidate
    >
      <SectionTitle>Entrega</SectionTitle>

      <FormGroup>
        <Label htmlFor="receiver">Quem irá receber</Label>
        <Input id="receiver" {...fieldProps('receiver')} />
        {errMsg('receiver') && <ErrorText>{errMsg('receiver')}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Endereço</Label>
        <Input id="description" {...fieldProps('description')} />
        {errMsg('description') && <ErrorText>{errMsg('description')}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="city">Cidade</Label>
        <Input id="city" {...fieldProps('city')} />
        {errMsg('city') && <ErrorText>{errMsg('city')}</ErrorText>}
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Label htmlFor="zipCode">CEP</Label>
          <Input id="zipCode" maxLength={9} {...fieldProps('zipCode')} />
          {errMsg('zipCode') && <ErrorText>{errMsg('zipCode')}</ErrorText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="houseNumber">Número</Label>
          <Input id="houseNumber" inputMode="numeric" maxLength={6} {...fieldProps('houseNumber')} />
          {errMsg('houseNumber') && <ErrorText>{errMsg('houseNumber')}</ErrorText>}
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label htmlFor="complement">Complemento (opcional)</Label>
        <Input id="complement" {...fieldProps('complement')} />
      </FormGroup>

      <BtnArea>
        <PrimaryBtn type="submit">Continuar com o pagamento</PrimaryBtn>
        <PrimaryBtn type="button" onClick={() => setStep('cart')}>
          Voltar para o carrinho
        </PrimaryBtn>
      </BtnArea>
    </form>
  )

  const renderPayment = () => (
    <form onSubmit={form.handleSubmit} noValidate>
      <SectionTitle>Pagamento - Valor a pagar {fmt(total)}</SectionTitle>

      <FormGroup>
        <Label htmlFor="cardName">Nome no cartão</Label>
        <Input id="cardName" {...fieldProps('cardName')} />
        {errMsg('cardName') && <ErrorText>{errMsg('cardName')}</ErrorText>}
      </FormGroup>

      <FormRow>
        <FormGroup style={{ flex: 2 }}>
          <Label htmlFor="cardNumber">Número do cartão</Label>
          <Input id="cardNumber" inputMode="numeric" maxLength={16} {...fieldProps('cardNumber')} />
          {errMsg('cardNumber') && <ErrorText>{errMsg('cardNumber')}</ErrorText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="cardCode">CVV</Label>
          <Input id="cardCode" inputMode="numeric" maxLength={3} {...fieldProps('cardCode')} />
          {errMsg('cardCode') && <ErrorText>{errMsg('cardCode')}</ErrorText>}
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Label htmlFor="expiresMonth">Mês de vencimento</Label>
          <Input
            id="expiresMonth"
            inputMode="numeric"
            maxLength={2}
            placeholder="MM"
            {...fieldProps('expiresMonth')}
          />
          {errMsg('expiresMonth') && <ErrorText>{errMsg('expiresMonth')}</ErrorText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="expiresYear">Ano de vencimento</Label>
          <Input
            id="expiresYear"
            inputMode="numeric"
            maxLength={4}
            placeholder="AAAA"
            {...fieldProps('expiresYear')}
          />
          {errMsg('expiresYear') && <ErrorText>{errMsg('expiresYear')}</ErrorText>}
        </FormGroup>
      </FormRow>

      <BtnArea>
        <PrimaryBtn type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting ? 'Finalizando pagamento...' : 'Finalizar pagamento'}
        </PrimaryBtn>
        <PrimaryBtn type="button" onClick={() => setStep('delivery')}>
          Voltar para a edição de endereço
        </PrimaryBtn>
      </BtnArea>
    </form>
  )

  const renderConfirmation = () => (
    <>
      <SectionTitle>Pedido realizado - {orderId}</SectionTitle>
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
