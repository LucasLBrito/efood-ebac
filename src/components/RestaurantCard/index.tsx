import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import type { Restaurante } from '../../types'
import Tag from '../Tag'

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
  right: 8px;
  display: flex;
  gap: 8px;
`

const InfoPanel = styled.div`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.salmon};
  border-top: none;
  padding: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
`

const Button = styled.button`
  background-color: ${theme.colors.salmon};
  color: ${theme.colors.cream};
  border: none;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  padding: 4px 8px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: auto;

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
            <img
              src="https://img.icons8.com/ios-filled/21/e66767/star.png"
              alt="estrela"
            />
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
