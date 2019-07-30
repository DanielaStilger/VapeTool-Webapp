import { Reducer } from 'redux';
import { Coil } from '@/types/coil';
import { Effect } from 'dva';
import { getResistance, getSweetSpot, getWraps } from '@/services/coil';


export interface CoilModelState {
  currentCoil: Coil;
}

export interface CoilModelType {
  namespace: 'coil';
  state: CoilModelState;
  reducers: {
    setSetup: Reducer<CoilModelState>
    setInnerDiameter: Reducer<CoilModelState>
    setResistance: Reducer<CoilModelState>
    setWraps: Reducer<CoilModelState>
    setLegsLength: Reducer<CoilModelState>
  },
  effects: {
    getResistance: Effect,
    getWraps: Effect,
    getSweetSpot: Effect,
  }
}

const CoilModel: CoilModelType = {
  namespace: 'coil',
  state: {
    currentCoil: new Coil(),
  },
  effects: {
    * getResistance(_, { call, put, cancel }) {
      console.log('call getResistance');
      const response = yield call(getResistance);
      if (typeof response === 'number') {
        yield put({
          type: 'setResistance',
          payload: response,
        });
      } else {
        yield cancel()
      }
    },
    * getWraps(_, { call, put, cancel }) {
      console.log('call getWraps');
      const response = yield call(getWraps);
      if (typeof response === 'number') {
        yield put({
          type: 'setWraps',
          payload: response,
        });
      } else {
        yield cancel()
      }
    },
    * getSweetSpot(_, { call, put }) {
      console.log('call getSweetSpot');
      const response = yield call(getSweetSpot);
      yield put({
        type: 'setSweetSpot',
        payload: response,
      });
    },
  },
  reducers: {
    setSetup(
      state = {
        currentCoil: new Coil(),
      },
      { payload }) {
      return {
        ...state,
        currentCoil: {
          ...state.currentCoil,
          setup: payload,
        },
      };
    },
    setInnerDiameter(
      state = {
        currentCoil: new Coil(),
      },
      { payload }) {
      return {
        ...state,
        currentCoil: {
          ...state.currentCoil,
          innerDiameter: payload,
        },
      };
    },
    setResistance(
      state = {
        currentCoil: new Coil(),
      },
      { payload }) {
      return {
        ...state,
        currentCoil: {
          ...state.currentCoil,
          resistance: payload,
        },
      };
    },
    setWraps(
      state = {
        currentCoil: new Coil(),
      },
      { payload }) {
      return {
        ...state,
        currentCoil: {
          ...state.currentCoil,
          wraps: payload,
        },
      };
    },
    setLegsLength(
      state = {
        currentCoil: new Coil(),
      },
      { payload }) {
      return {
        ...state,
        currentCoil: {
          ...state.currentCoil,
          legsLength: payload,
        },
      };
    },
  },
};

export default CoilModel;
