import { ITerm } from '@/types/ITerm'

export interface ITermList {
  count: number
  next?: number
  previous?: number
  results: ITerm[]
}
