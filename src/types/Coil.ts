import { Coil as FirebaseCoil } from '@vapetool/types';
import Typable from './Typable';

export default interface Coil extends FirebaseCoil, Typable {
  readonly lastTimeModified: number;
  readonly creationTime: number;
}
