import { Link as FirebaseLink } from '@vapetool/types';
import Typable from './Typable';

export default interface Link extends FirebaseLink, Typable {
  readonly lastTimeModified: number;
  readonly creationTime: number;
}
