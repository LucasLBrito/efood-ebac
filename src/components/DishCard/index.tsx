import styled from 'styled-components'
import { theme } from '../../styles/theme'
import type { Prato } from '../../types'

const Card = styled.div`
  background-color: ${theme.colors.salmon};
  display: flex;
  flex-direction: column;
`

const DishImage = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  display: block;
`

const Content = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`

const DishName = styled.h3`
  color: ${theme.colors.cream};
  font-size: 16px;
  font-weight: 900;
`

const DishDescription = styled.p`
  color: ${theme.colors.cream};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`

const Button = styled.button`
  background-color: ${theme.colors.cream};
  color: ${theme.colors.salmon};
  border: none;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  padding: 4px 8px;
  cursor: pointer;
  width: 100%;
  margin-top: auto;

  &:hover {
    opacity: 0.9;
  }
`

type Props = {
  prato: Prato
}

const DishCard = ({ prato }: Props) => (
  <Card>
    <DishImage src={prato.foto} alt={prato.nome} />
    <Content>
      <DishName>{prato.nome}</DishName>
      <DishDescription>{prato.descricao}</DishDescription>
      <Button>Adicionar ao carrinho</Button>
    </Content>
  </Card>
)

export default DishCard
