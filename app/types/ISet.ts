import { ITerm } from '@/types/ITerm'

export interface ISet {
  id: number
  name: string
  description?: string
  picture?: string
  terms: ITerm[]
}
