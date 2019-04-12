import {
  queryPrivilege,
  removePrivilege,
  addPrivilege,
  updateStatusPrivilege,
  updatePrivilege,
  queryExperimental,
  queryResult,
  queryConfState,
  queryReagent,
} from '@/services/manage';

export default {
  namespace: 'privilege',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    fileStatuss: [],
    experResult: [],
    confState: [],
    Reagent: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPrivilege, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload }, { call }) {
      yield call(addPrivilege, payload);
    },
    *remove({ payload }, { call }) {
      yield call(removePrivilege, payload);
    },
    *update({ payload }, { call }) {
      yield call(updatePrivilege, payload);
    },
    *updateStatus({ payload }, { call }) {
      yield call(updateStatusPrivilege, payload);
    },
    *fetchExperimental({ payload }, { call, put }) {
      const response = yield call(queryExperimental, payload);
      yield put({
        type: 'saveExper',
        payload: response,
      });
    },
    *fetchExperResult({ payload }, { call, put }) {
      const response = yield call(queryResult, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *fetchConfState({ payload }, { call, put }) {
      const response = yield call(queryConfState, payload);
      yield put({
        type: 'saveConfState',
        payload: response,
      });
    },
    *fetchReagent({ payload }, { call, put }) {
      const response = yield call(queryReagent, payload);
      yield put({
        type: 'saveReagent',
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
    saveExper(state, action) {
      return {
        ...state,
        fileStatuss: action.payload,
      };
    },
    saveResult(state, action) {
      return {
        ...state,
        experResult: action.payload,
      };
    },
    saveConfState(state, action) {
      return {
        ...state,
        confState: action.payload,
      };
    },
    saveReagent(state, action) {
      return {
        ...state,
        Reagent: action.payload,
      };
    },
  },
};
