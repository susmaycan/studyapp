export enum EGameType {
  choose = 'choose',
  listening = 'listening',
  write = 'write',
}

export type IGameType = keyof typeof EGameType

export enum EGameMode {
  back = 'back',
  front = 'front',
}

export type IGameMode = keyof typeof EGameMode
