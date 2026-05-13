import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import type { Restaurante } from '../../types'
import Tag from '../Tag'
import star from '../../assets/star.png'

const Card = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  position: relative;
  height: 217px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const Tags = styled.div`
  position: absolute;
  top: 16px;
  right: 0;
  display: flex;
  gap: 8px;
`

const InfoPanel = styled.div`
  background-color: ${theme.colors.white};
  border-left: 1px solid ${theme.colors.salmon};
  border-right: 1px solid ${theme.colors.salmon};
  border-bottom: 1px solid ${theme.colors.salmon};
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 181px;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h3`
  color: ${theme.colors.salmon};
  font-size: 18px;
  font-weight: 700;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.salmon};
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;

  img {
    width: 21px;
    height: 21px;
  }
`

const Description = styled.p`
  color: ${theme.colors.salmon};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  flex: 1;
`

const Button = styled.button`
  background-color: ${theme.colors.salmon};
  color: ${theme.colors.cream};
  border: none;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  width: 82px;
  height: 24px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    opacity: 0.9;
  }
`

type Props = {
  restaurante: Restaurante
}

const RestaurantCard = ({ restaurante }: Props) => {
  const navigate = useNavigate()

  return (
    <Card>
      <ImageWrapper>
        <img src={restaurante.capa} alt={restaurante.titulo} />
        <Tags>
          {restaurante.destacado && <Tag>Destaque da semana</Tag>}
          <Tag>{restaurante.tipo}</Tag>
        </Tags>
      </ImageWrapper>
      <InfoPanel>
        <CardHeader>
          <Title>{restaurante.titulo}</Title>
          <Rating>
            <span>{restaurante.avaliacao}</span>
            <img src={star} alt="estrela" />
          </Rating>
        </CardHeader>
        <Description>{restaurante.descricao}</Description>
        <Button onClick={() => navigate(`/restaurante/${restaurante.id}`)}>
          Saiba mais
        </Button>
      </InfoPanel>
    </Card>
  )
}

export default RestaurantCard
