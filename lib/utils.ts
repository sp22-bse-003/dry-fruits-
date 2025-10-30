import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, locale: string = 'en-PK') {
  try {
    return new Intl.NumberFormat(locale).format(value)
  } catch {
    // Fallback to basic toString if Intl locale unsupported
    return value.toString()
  }
}
