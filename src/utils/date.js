export function formatDate(dateString) {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const [year, month, day] = dateString.split('-')
  const monthName = months[parseInt(month) - 1]

  return `${parseInt(day)} de ${monthName}, ${year}`
}
