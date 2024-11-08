export interface IResponse<T> {
  results: T[]
  count: number
  next?: number
  previous?: number
}
