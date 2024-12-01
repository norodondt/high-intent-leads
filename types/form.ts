export type LeadSource = 
  | 'job-portals'
  | 'google-maps'
  | 'technology-users'
  | 'hiring-companies'
  | 'similar-companies'
  | 'specific-websites'
  | 'custom-source'

export type DataPoint = 
  | 'email'
  | 'linkedin'
  | 'phone'
  | 'decision-maker'

export type TargetPosition = 
  | 'business-owner'
  | 'department-head'
  | 'specific-role'

export interface FormData {
  leadSources: LeadSource[]
  similarCompany?: string
  customSource?: string
  dataPoints: DataPoint[]
  targetPosition: TargetPosition
  specificRole?: string
  contactInfo: {
    email: string
    phone: string
  }
}

