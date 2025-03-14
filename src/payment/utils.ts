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
      return network
  }
}

export const addPaystackCharge = (amount: number): number =>
  Math.round((amount / (1 - 0.0195) + 0.01) * 100)

export const noChargePaystack = (amount: number): number =>
  Math.round(amount * 100)

export const padNumbers = (number: number): string => {
  if (!number) {
    return ''
  }
  return number.toString().padStart(12, '0')
}

export const transactionTimeBeforeConfirmationRange = (
  transactionTime: string
): boolean => {
  return new Date().getTime() - new Date(transactionTime).getTime() < 180000
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

export const initiatePaystackCharge = ({
  auth,
  amount,
  customer,
  mobile_money,
  card,
  subaccount,
  bearCharges = false,
  customFields,
}: {
  auth: string
  amount: number
  customer: Member
  bearCharges?: boolean
  mobile_money?: {
    phone: string
    provider: Network
  }
  card?: {
    number: string
    cvv: number
    expiry_month: number
    expiry_year: number
  }
  subaccount: string
  customFields?: { [key: string]: string }
}) => {
  if (card) {
    if (card?.cvv.toString().length !== 3) {
      throw new Error('cvv must be 3 digits long')
    }

    if (card?.expiry_month < 1 || card?.expiry_month > 12) {
      throw new Error('expiry_month must be between 1 and 12')
    }
  }

  return {
    method: 'post',
    baseURL: 'https://api.paystack.co/',
    url: `/charge`,
    headers: {
      'content-type': 'application/json',
      Authorization: auth,
    },
    data: {
      amount: bearCharges
        ? noChargePaystack(amount)
        : addPaystackCharge(amount),
      email: customer.email,
      currency: 'GHS',
      subaccount,
      mobile_money: {
        phone: mobile_money?.phone,
        provider: getMobileCode(mobile_money?.provider || 'MTN'),
      },
      card,
      metadata: {
        custom_fields: [customFields],
      },
    },
  }
}

export const submitTransactionOTP = ({
  auth,
  reference,
  otp,
}: {
  auth: string
  reference: string
  otp: string
}) => ({
  method: 'post',
  baseURL: 'https://api.paystack.co/',
  url: `/charge/submit_otp`,
  headers: {
    'content-type': 'application/json',
    Authorization: auth,
  },
  data: {
    otp,
    reference,
  },
})

export const confirmTransactionStatus = ({
  auth,
  reference,
}: {
  auth: string
  reference: string
}) => ({
  method: 'get',
  baseURL: 'https://api.paystack.co/',
  url: `/transaction/verify/${reference}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: auth,
  },
})
