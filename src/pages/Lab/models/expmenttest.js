import {  queryceshi } from '@/services/expmenttest';

export default {
  namespace: 'expmenttest',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(queryceshi, payload);
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
  },
};
