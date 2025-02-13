import { useAuth } from '../context/FirebaseAuthContext'
import { Properties, Coil } from '@vapetool/types'
import { callFirebaseFunction } from '../utils/firebase'

export async function calculateForWraps (coil: Coil, baseVoltage: number): Promise<Coil | Response> {
  return await callFirebaseFunction<Coil>('calculateForWraps', { coil, baseVoltage })
}

export async function calculateForResistance (coil: Coil, baseVoltage: number): Promise<Coil | Response> {
  return await callFirebaseFunction<Coil>('calculateForResistance', { coil, baseVoltage })
}

export async function calculateProperties (coil: Coil, baseVoltage: number): Promise<Properties | Response> {
  return await callFirebaseFunction<Properties>('calculateForProperties', { coil, baseVoltage })
}

export async function sendRequest<T extends Properties | Coil> (
  calcFor: 'calculateForWraps' | 'calculateForResistance' | 'calculateForProperties',
  coil: Coil,
  baseVoltage?: number
): Promise<T> {
  try {
    const auth = useAuth()
    if (!auth.dbUser) {
      throw Error('You are not logged in')
    }

    return await callFirebaseFunction<T>(calcFor, { coil, baseVoltage })
  } catch (e) {
    console.error(e)
    throw e
  }
}
