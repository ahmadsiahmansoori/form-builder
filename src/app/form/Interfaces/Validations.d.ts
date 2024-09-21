
export interface RequiredValidation {
  message?: string;
}

export interface MinValidation {
  value: number;
  message?: string;
}

export interface MaxValidation {
  value: number;
  message?: string;
}

export interface MinLengthValidation {
  value: number;
  message?: string;
}

export interface MaxLengthValidation {
  value: number;
  message?: string;
}

export interface EmailValidation {
  message?: string;
}

export interface PatternValidation {
  value: string | RegExp
  message?: string;
}

export type Validation = {
  required: RequiredValidation
  minLength: MinLengthValidation
  maxLength: MaxLengthValidation
  max: MaxValidation
  min: MinValidation
  email: EmailValidation
  pattern: PatternValidation
}
