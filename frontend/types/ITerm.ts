export interface ITerm {
  back_alternatives: string
  back: string
  description?: string
  front: string
  id: number
  stats: ITermStats
  segments?: ITermSegment[]
}
