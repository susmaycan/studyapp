export interface IResponse<T> {
  count: number
  next?: number
  previous?: number
  results: T[]
}
