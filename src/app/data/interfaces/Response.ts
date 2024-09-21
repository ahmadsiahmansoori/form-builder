export interface Response<T> {
  code?: number
  errors?: any[]
  message: string
  status: boolean
  data?: T
}
