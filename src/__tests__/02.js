import {robertAlertTip} from '@mikecodeur/react-course-app/test-utils'
import chalk from 'chalk'
import {render, screen, prettyDOM} from '@testing-library/react'

import App from '../final/02'
//import App from '../final/02.bonus-1'
//import App from '../exercise/02'

test('effectue le rendu et vérifie le style', () => {
  render(<App />)
  const allContainers = screen.getAllByText(/Le marvel n'existe pas/i)

  allContainers.forEach(container => {
    robertAlertTip(
      () => {
        expect(container).toBeEnabled()
      },
      () =>
        `
Ce container doit etre enable

${chalk.reset(prettyDOM(container))}
    `.trim(),
    )
  })
})
