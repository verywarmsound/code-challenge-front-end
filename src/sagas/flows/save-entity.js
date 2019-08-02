import { validationErrorsMapper } from '../../api/validation-errors-mapper';
import { formSubmit, showResponseError } from '../../reducers/app';
import { put } from 'redux-saga/effects';
import type { ErrorMapperOptions } from '../../types/validation-errors';

export type SaveEntityInput = {
  saveFn: () => Iterable,
  formBag: any,
  requestName: string,
  errorMapperOptions: ErrorMapperOptions
};

export function* saveEntity({ saveFn, formBag, requestName, errorMapperOptions }) {
  try {
    yield saveFn();
    yield put(formSubmit.start(requestName));
  } catch (e) {
    if (e.response && e.response.status === 400) {
      formBag.setSubmitErrors(validationErrorsMapper.fromAPI(e.response.data, errorMapperOptions));
    } else {
      yield put(showResponseError(requestName, e));
    }
  } finally {
    formBag.setSubmitting(false);
    yield put(formSubmit.complete(requestName));
  }
}
