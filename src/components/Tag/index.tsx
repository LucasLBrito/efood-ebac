import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Tag = styled.span`
  background-color: ${theme.colors.salmon};
  color: ${theme.colors.cream};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  display: inline-block;
`

export default Tag
