export type ChurchLevel =
  | 'Fellowship'
  | 'Bacenta'
  | 'Constituency'
  | 'Council'
  | 'Stream'
  | 'GatheringService'
  | 'Oversight'
  | 'Denomination'
  | 'Sonta'
  | 'Hub'
  | 'Ministry'
  | 'Federalministry'

export interface Member {
  hasCampAttendance: boolean
  visitationArea: string
  lastName: string
  auth_id: string
  imclChecked: boolean
  pictureUrl: string
  areaOfResidence: string
  howYouJoined: string
  hasBibleTranslations: boolean
  whatsappNumber: string
  firstName: string
  graduatedUnderstandingSchools: string[]
  phoneNumber: string
  attendedCampsWithOtherBishops: string[]
  hasAudioCollections: boolean
  attendedCampsWithProphet: boolean
  location: Point
  middleName: string
  id: string
  hasHolyGhostBaptism: boolean
  hasWaterBaptism: boolean
  email: string
}
export interface Church {
  id: string
  name: string
  levelName: ChurchLevel
}
export interface Stream extends Church {
  arrivalEndTime: string
  arrivalsPrefix: string
  accountName:
    | 'aes_account'
    | 'ges_account'
    | 'hge_account'
    | 'fle_account'
    | 'manual'
  mobilisationEndTime: string
  mobilisationStartTime: string
  arrivalStartTime: string
}

type Point = {
  srid: {
    low: number
    high: number
  }
  x: number
  y: number
  z?: undefined
}
