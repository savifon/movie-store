import axios from 'axios'

const viaCep = axios.create({
  baseURL: import.meta.env.VITE_VIACEP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  async getAddressByCep(cep) {
    return viaCep.get(`/${cep}/json/`)
  },
}
