import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from '../../config/firebase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const verifySession = (): Promise<import('firebase/auth').User | null> =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe()
        resolve(user)
      },
      (error) => {
        unsubscribe()
        reject(error) // network/SDK errors bubble up to beforeLoad's catch
      }
    )
  })