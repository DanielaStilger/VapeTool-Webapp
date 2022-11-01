import { Mixable, MixResult } from '@vapetool/types';
import { callFirebaseFunction } from '@/utils/firebase';
import { useAuth } from '@/context/FirebaseAuthContext';

export async function calculate(mixable1: Mixable, mixable2: Mixable): Promise<MixResult> {
  try {
    const auth = useAuth()
    if (!auth.dbUser) {
      throw Error('You are not logged in');
    }
    return await callFirebaseFunction('calculateForMix', { mixable1, mixable2 });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
