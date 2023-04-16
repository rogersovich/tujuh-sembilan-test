import axios from 'axios'

const apiGold = axios.create({
  baseURL: import.meta.env.VITE_API_GOLD,
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
