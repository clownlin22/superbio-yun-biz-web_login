import {
  queryUser,
  removeUser,
  queryDepart,
  queryRoles,
  addUser,
  updateStatusUser,
  updateUserPass,
  updateUser,
  insertRoles,
  queryExperimental,
  queryResult,
  queryConfState,
  queryReagent,
} from '@/services/manage';

export default {
  namespace: 'manageUser',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    department: [],
    role: [],
    fileStatuss: [],
    experResult: [],
    confState: [],
    Reagent: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDepart({ payload }, { call, put }) {
      const response = yield call(queryDepart, payload);
      yield put({
        type: 'saveDepart',
        payload: response,
      });
    },
    *fetchRoles({ payload }, { call, put }) {
      const response = yield call(queryRoles, payload);
      yield put({
        type: 'saveRole',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload }, { call }) {
      yield call(removeUser, payload);
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *insertRole({ payload }, { call }) {
      yield call(insertRoles, payload);
    },
    *updateStatus({ payload }, { call, put }) {
      const response = yield call(updateStatusUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *updatePass({ payload }, { call, put }) {
      const response = yield call(updateUserPass, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
    saveDepart(state, action) {
      return {
        ...state,
        department: action.payload,
      };
    },
    saveRole(state, action) {
      return {
        ...state,
        role: action.payload,
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
