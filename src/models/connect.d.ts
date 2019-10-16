import { AnyAction, Dispatch } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { CoilModelState } from './coil';
import { PhotoModelState } from './photo';
import { LiquidModelState } from './liquid';
import { OhmModelState } from './ohm';
import { BatteriesModelState } from '@/models/batteries';
import { ConverterModelState } from '@/models/converter';
import { UploadPhotoState } from '@/models/uploadPhoto';

export { GlobalModelState, SettingModelState, UserModelState, CoilModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    coil?: boolean;
    liquid?: boolean;
    photo?: boolean;
    batteries?: boolean;
    ohm?: boolean;
    uploadPhoto?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  coil: CoilModelState;
  liquid: LiquidModelState;
  photo: PhotoModelState;
  ohm: OhmModelState;
  batteries: BatteriesModelState;
  converter: ConverterModelState;
  uploadPhoto: UploadPhotoState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
