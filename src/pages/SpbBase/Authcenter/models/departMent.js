import {
  queryDeparts,
  removeDepart,
  addDepart,
  updateDepart,
  queryExperimentals,
  queryConfStates,
} from '@/services/manage';

export default {
  namespace: 'departMent',

  state: {
    data: [],
    Result: [],
    Experimental: [],
    ConfState: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDeparts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchExperimental({ payload }, { call, put }) {
      const response = yield call(queryExperimentals, payload);
      yield put({
        type: 'saveExperimental',
        payload: response,
      });
    },
    *fetchConfState({ payload }, { call, put }) {
      const response = yield call(queryConfStates, payload);
      yield put({
        type: 'saveConfState',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addDepart, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload }, { call }) {
      yield call(removeDepart, payload);
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateDepart, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveResult(state, action) {
      return {
        ...state,
        Result: action.payload,
      };
    },
    saveExperimental(state, action) {
      return {
        ...state,
        Experimental: action.payload,
      };
    },
    saveConfState(state, action) {
      return {
        ...state,
        ConfState: action.payload,
      };
    },
  },
};
