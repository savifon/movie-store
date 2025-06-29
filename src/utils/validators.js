export function validateCpf(cpf) {
  cpf = cpf.replace(/[^\d]/g, '')

  if (cpf.length !== 11) return false

  if (/^(\d)\1{10}$/.test(cpf)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let rest = sum % 11
  let firstNumber = rest < 2 ? 0 : 11 - rest

  if (firstNumber !== parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  rest = sum % 11
  let secondNumber = rest < 2 ? 0 : 11 - rest

  return secondNumber === parseInt(cpf.charAt(10))
}

export function validateName(name) {
  return name.split(' ').length > 1
}
