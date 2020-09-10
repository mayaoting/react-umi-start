import { Effect, Reducer } from 'umi';
import { fakeSubmitForm } from './service';
export interface StateType {
  current?: string;
  step?: {
    payAccount: string;
    receiverAccount: string;
    receiverName: string;
    amount: string;
  };
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
}
const Model: ModelType = {
  namespace: 'formAndstepForm',
  state: {},
  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },
};

export default Model;
