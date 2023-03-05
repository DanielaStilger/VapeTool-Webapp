import { callFirebaseFunction } from '../utils/firebase';
import { Liquid, Result } from '@vapetool/types';
import { useAuth } from '../context/FirebaseAuthContext';

export async function calculateResults(liquid: Liquid): Promise<Result[]> {
  try {
    const auth = useAuth()
    if (!auth.dbUser) {
      throw Error('You are not logged in');
    }
    return await callFirebaseFunction<Result[]>('calculateResults', { liquid });
  } catch (e) {
    console.error(e);
    throw e;
  }
}