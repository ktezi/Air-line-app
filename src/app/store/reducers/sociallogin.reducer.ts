import * as socialLoginActions from '../actions/sociallogin.actions';
import * as types from '../../models/sociallogin.action.types';
import { SocialLoginState } from '../../models/app.state';
 
export const initialState: SocialLoginState = {
    SocialLogin: [],
};
 
export function SocialLoginReducer(
  state = initialState,
  action: socialLoginActions.Actions
): SocialLoginState {
  switch (action.type) {
    case types.LOAD_SOCIAL_LOGIN_DATA_SUCCESS: {
      return { ...state, SocialLogin: action.payload };
    }
    default:
      return state;
  }
}
