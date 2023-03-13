import { WireType } from '@vapetool/types';
import coilTypeNormal from '../../assets/coil_type_normal.webp';
import coilTypeParallel from '../../assets/coil_type_parallel.webp';
import coilTypeTwisted from '../../assets/coil_type_twisted.webp';
import coilTypeClapton from '../../assets/coil_type_clapton.webp';
import coilTypeRibbon from '../../assets/coil_type_ribbon.webp';
import coilTypeFusedClapton from '../../assets/coil_type_fused_clapton.webp';
import coilTypeAlienClapton from '../../assets/coil_type_alien_clapton.webp';
import coilTypeTiger from '../../assets/coil_type_tiger.webp';
import coilTypeStaple from '../../assets/coil_type_staple.webp';
import coilTypeStaggerdClapton from '../../assets/coil_type_staggered_clapton.webp';
import coilTypeStaggerdFusedClapton from '../../assets/coil_type_staggered_fused_clapton.webp';
import coilTypeStapleStaggeredFusedClapton from '../../assets/coil_type_staple_staggered_fused_clapton.webp';
import coilTypeJuggernaut from '../../assets/coil_type_juggernaut.webp';
import coilTypeCustom from '../../assets/coil_type_custom.webp';

/* eslint global-require: 0 react/no-array-index-key: 0 */

const types: { name: string; src: any; proOnly?: boolean }[] = [
  {
    name: WireType[WireType.NORMAL],
    src: coilTypeNormal,
  },
  {
    name: WireType[WireType.PARALLEL],
    src: coilTypeParallel,
  },
  {
    name: WireType[WireType.TWISTED],
    src: coilTypeTwisted,
  },
  {
    name: WireType[WireType.CLAPTON],
    src: coilTypeClapton,
  },
  {
    name: WireType[WireType.RIBBON],
    src: coilTypeRibbon,
  },
  {
    name: WireType[WireType.FUSED_CLAPTON],
    src: coilTypeFusedClapton,
  },
  {
    name: WireType[WireType.ALIEN_CLAPTON],
    src: coilTypeAlienClapton,
    proOnly: true,
  },
  {
    name: WireType[WireType.TIGER],
    src: coilTypeTiger,
    proOnly: true,
  },
  {
    name: WireType[WireType.STAPLE],
    src: coilTypeStaple,
    proOnly: true,
  },
  {
    name: WireType[WireType.STAGGERED_CLAPTON],
    src: coilTypeStaggerdClapton,
    proOnly: true,
  },
  {
    name: WireType[WireType.STAGGERED_FUSED_CLAPTON],
    src: coilTypeStaggerdFusedClapton,
    proOnly: true,
  },
  {
    name: WireType[WireType.STAPLE_STAGGERED_FUSED_CLAPTON],
    src: coilTypeStapleStaggeredFusedClapton,
    proOnly: true,
  },
  {
    name: WireType[WireType.FRAMED_STAPLE],
    src: coilTypeJuggernaut,
    proOnly: true,
  },
  {
    name: WireType[WireType.CUSTOM],
    src: coilTypeCustom,
    proOnly: true,
  },
];

export default types;
