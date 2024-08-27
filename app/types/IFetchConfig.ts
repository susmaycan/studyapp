import { EFetchMethod } from './EFetchMethod'
import { IFormData } from './IFormData'

// Input data from components
export interface IFetchConfig {
  method?: EFetchMethod
  body?: IFormData
  params?: Record<string, string>
}

// Used to call fetch
export interface IFetchOptions {
  method: EFetchMethod
  headers?: Record<string, string>
  body?: FormData
  params?: Record<string, string | number>
}

export interface IFieldErrors {
  [key: string]: string[]
}
export type IServerErrors = IFieldErrors | { non_field_errors?: string[] }

export interface IFetchErrors {
  fieldErrors?: IFieldErrors
  generalErrors?: string[]
}
