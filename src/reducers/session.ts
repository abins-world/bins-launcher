interface MCSession {
  accessToken: String,
  clientToken: String,
  name: String,
  uuid: String
}

/*
{
  accessToken,
  clientToken,
  name,
  uuid
}
*/

// 액션 타입 정의
const SET_SESSION = 'session/SET_SESSION';

// **** 초기상태 정의
const initialState = {
  accessToken: '',
  clientToken: '',
  name: '',
  uuid: ''
};

// **** 리듀서 작성
export default function session(state = initialState, action: any) {
  switch (action.type) {
    case SET_SESSION:
      return {
        accessToken: action.sess.accessToken,
        clientToken: action.sess.clientToken,
        name: action.sess.name,
        uuid: action.sess.uuid
      };
    default:
      return state;
  }
}

export { session }
export const setSession = (sess: MCSession) => ({ type: SET_SESSION, sess });