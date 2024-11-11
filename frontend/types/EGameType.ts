export enum EGameType {
  choose = 'choose',
  write = 'write',
  listening = 'listening',
}

export type IGameType = keyof typeof EGameType

export enum EGameMode {
  front = 'front',
  back = 'back',
}

export type IGameMode = keyof typeof EGameMode
