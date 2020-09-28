import { Action } from '@ngrx/store';
import * as types from '../../models/sociallogin.action.types';

// tslint:disable-next-line: class-name
export class loadSocialLoginSuccessAction implements Action {
  readonly type = types.LOAD_SOCIAL_LOGIN_DATA_SUCCESS ;
  constructor(public payload: any) {}
}

export type Actions =  loadSocialLoginSuccessAction;
