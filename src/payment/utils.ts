import { Network, NetworkCode } from './types'

export const getMobileCode = (network: Network): NetworkCode => {
  switch (network) {
    case 'MTN':
      return 'mtn'
    case 'Vodafone':
      return 'vod'
    case 'AirtelTigo':
      return 'tgo'
    case 'Airtel':
      return 'tgo'
    case 'Tigo':
      return 'tgo'
    default:
      break
  }

  return 'mtn'
}

export const addPaystackCharge = (amount: number): number =>
  Math.round((amount / (1 - 0.0195) + 0.01) * 100) / 100

export const padNumbers = (number: number): string => {
  if (!number) {
    return ''
  }
  return number.toString().padStart(12, '0')
}
