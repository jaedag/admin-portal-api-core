import { Member, Network, NetworkCode } from '@jaedag/admin-portal-types'

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
  Math.round((amount / (1 - 0.0195) + 0.01) * 100)

export const padNumbers = (number: number): string => {
  if (!number) {
    return ''
  }
  return number.toString().padStart(12, '0')
}

export const updatePaystackCustomerBody = ({
  auth,
  customer,
}: {
  auth: string
  customer: Member
}) => ({
  method: 'put',
  baseURL: 'https://api.paystack.co/',
  url: `/customer/${customer.email}`,
  headers: {
    'content-type': 'application/json',
    Authorization: auth ?? '',
  },
  data: {
    first_name: customer.firstName,
    last_name: customer.lastName,
    phone: customer.phoneNumber,
  },
})

export const iniitiatePaystackTransaction = ({
  auth,
  amount,
  customer,
  mobileNumber,
  mobileNetwork,
  subaccount,
  customFields,
}: {
  auth: string
  amount: number
  customer: Member
  mobileNumber: string
  mobileNetwork: Network
  subaccount: string
  customFields?: { [key: string]: string }
}) => ({
  method: 'post',
  baseURL: 'https://api.paystack.co/',
  url: `/charge`,
  headers: {
    'content-type': 'application/json',
    Authorization: auth,
  },
  data: {
    amount: addPaystackCharge(amount),
    email: customer.email,
    currency: 'GHS',
    subaccount,
    mobile_money: {
      phone: mobileNumber,
      provider: getMobileCode(mobileNetwork),
    },
    metadata: {
      custom_fields: [customFields],
    },
  },
})
