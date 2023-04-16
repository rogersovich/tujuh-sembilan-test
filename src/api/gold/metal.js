import apiGold from './api'

export const fetchMetalPrices = async () => {
  try {
    const response = await apiGold.get('spot')

    return response.data
  } catch (error) {
    return error.response
  }
}
