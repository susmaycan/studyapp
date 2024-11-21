// Input data from components
export interface IFetchConfig {
  body?: IFormData
  method?: EFetchMethod
  params?: Record<string, string>
}

// Used to call fetch
export interface IFetchOptions {
  body?: FormData
  headers?: Record<string, string>
  method: EFetchMethod
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
