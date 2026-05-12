import { createGlobalStyle } from 'styled-components'
import type { Theme } from './theme'

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.family};
    background-color: ${({ theme }) => theme.colors.beige};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`
