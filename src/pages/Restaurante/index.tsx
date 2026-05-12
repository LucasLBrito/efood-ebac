import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DishCard from '../../components/DishCard'
import { getRestaurante } from '../../services/api'
import type { Restaurante as RestauranteType } from '../../types'
import { theme } from '../../styles/theme'

const CoverWrapper = styled.section`
  position: relative;
  height: 280px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const CoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${theme.colors.overlay};
`

const CoverInfo = styled.div`
  position: absolute;
  inset: 0;
  max-width: 1024px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const RestaurantCategory = styled.p`
  color: ${theme.colors.white};
  font-size: 32px;
  font-weight: 100;
`

const RestaurantName = styled.h2`
  color: ${theme.colors.white};
  font-size: 32px;
  font-weight: 900;
`

const Main = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  padding: 56px 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`

const Restaurante = () => {
  const { id } = useParams()
  const [restaurante, setRestaurante] = useState<RestauranteType | null>(null)

  useEffect(() => {
    if (id) {
      getRestaurante(Number(id)).then(setRestaurante)
    }
  }, [id])

  if (!restaurante) return null

  return (
    <>
      <Header variant="perfil" />
      <CoverWrapper>
        <img src={restaurante.capa} alt={restaurante.titulo} />
        <CoverOverlay />
        <CoverInfo>
          <RestaurantCategory>{restaurante.tipo}</RestaurantCategory>
          <RestaurantName>{restaurante.titulo}</RestaurantName>
        </CoverInfo>
      </CoverWrapper>
      <Main>
        <Grid>
          {restaurante.cardapio.map((prato) => (
            <DishCard key={prato.id} prato={prato} />
          ))}
        </Grid>
      </Main>
      <Footer />
    </>
  )
}

export default Restaurante
