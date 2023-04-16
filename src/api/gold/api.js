import axios from 'axios'

const apiGold = axios.create({
  baseURL: import.meta.env.VITE_API_GOLD,
  headers: {
    'X-RapidAPI-Key': '8f8a7dfc80msh9b9f81172a8c0e3p1ecfa6jsnb202d8291975',
    'X-RapidAPI-Host': 'gold-price-live.p.rapidapi.com'
  }
})

apiGold.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default apiGold
