import { render } from '@testing-library/react'
import Page from '@/app/page'

test('página raiz renderiza sem erros', () => {
  render(<Page />)
  expect(document.body).toBeTruthy()
})
