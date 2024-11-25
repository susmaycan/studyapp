export interface IGameTermResults {
  ok: boolean
  ko: boolean
  term: number
}
export interface IGameResults {
  terms: IGameTermResults[]
}
