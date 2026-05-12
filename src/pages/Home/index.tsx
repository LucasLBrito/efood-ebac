import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RestaurantCard from '../../components/RestaurantCard'
import { getRestaurantes } from '../../services/api'
import type { Restaurante } from '../../types'

const Main = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  padding: 56px 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px 32px;
`

const Home = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])

  useEffect(() => {
    getRestaurantes().then(setRestaurantes)
  }, [])

  return (
    <>
      <Header variant="home" />
      <Main>
        <Grid>
          {restaurantes.map((r) => (
            <RestaurantCard key={r.id} restaurante={r} />
          ))}
        </Grid>
      </Main>
      <Footer />
    </>
  )
}

export default Home
