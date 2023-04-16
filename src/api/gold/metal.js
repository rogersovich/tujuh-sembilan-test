import apiGold from './api'

export const fetchMetalPrices = async () => {
  try {
    const response = await apiGold.get('get_metal_prices')

    return response.data
  } catch (error) {
    return error.response
  }
}
