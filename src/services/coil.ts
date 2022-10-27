import { Properties, Coil } from '@vapetool/types';
import { callFirebaseFunction } from '../utils/firebase';

export async function calculateForWraps(coil: Coil): Promise<Coil> {
  return callFirebaseFunction<Coil>('calculateForWraps', { coil });
}

export function calculateForResistance(coil: Coil): Promise<Coil> {
  return callFirebaseFunction<Coil>('calculateForResistance', { coil });
}

export function calculateProperties(coil: Coil, baseVoltage: number): Promise<Properties> {
  return callFirebaseFunction<Properties>('calculateForProperties', { coil, baseVoltage });
}