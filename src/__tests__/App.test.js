import { fireEvent, render, screen } from '@testing-library/react'
import App from '../App'

describe('Montaggio component', () => {
  it('verifica welcome component', () => {
    render(<App />)
    const titolo = screen.getByText(/benvenuti in epibooks/i)
    expect(titolo).toBeInTheDocument()
  })

  it('verifica che ci siano tutti i 150 libri', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(150)
  })

  it('verifica commentArea', () => {
    render(<App />)
    const inputText = screen.getByPlaceholderText(/inserisci qui il testo/i)
    expect(inputText).toBeInTheDocument()
  })
})

describe('Verifica filtraggio', () => {
  it("trova un solo risultato per la parola 'arrow'", () => {
    render(<App />)
    const filterInputField = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(filterInputField, { target: { value: 'arrow' } })
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(1)
  })

  it("trova tre risultai per la parola 'witcher'", () => {
    render(<App />)
    const filterInputField = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(filterInputField, { target: { value: 'witcher' } })
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(3)
  })
})

describe('Test singleBook', () => {
  it('verifica se cliccando su un libro, il suo bordo cambi colore', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    expect(firstBookCard).toHaveStyle('border: 3px solid red')
  })

  it('verifica se cliccando su di un secondo libro dopo il primo, il bordo del primo libro ritorni normale.', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    expect(firstBookCard).toHaveStyle('border: 3px solid red')
    const secondBookCard = allTheBookCards[1]
    fireEvent.click(secondBookCard)
    expect(firstBookCard).not.toHaveStyle('border: 3px solid red')
  })
})

describe('Test commentList', () => {
  it('verifica che non visualizza commenti sul libro durante il caricamento', () => {
    render(<App />)
    const allTheBookComments = screen.queryAllByTestId('single-comment')
    expect(allTheBookComments).toHaveLength(0)
  })
})
