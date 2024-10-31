export interface IResponse<T> {
  results: T[]
  count: number
  next?: string
  previous?: string
}
