import axios from 'axios'

axios.defaults.withCredentials = false

class Authenticator {

    static userInfo: AccountSession = {
      accessToken: '',
      name: '',
      uuid: ''
    }

    async authenticate(email: String, pw: String) : Promise<boolean> {
        let ok = false
        try {
            const response = await axios.post('https://authserver.mojang.com/authenticate',
                {
                    agent: {
                        name: "Minecraft",
                        version: 1
                    },
                    username: email,
                    password: pw,
                    requestUser: true
                },
                {
                  withCredentials: false
                }
            )

            ok = true
            Authenticator.userInfo = {
              accessToken: response.data.accessToken,
              name: response.data.selectedProfile.name,
              uuid: response.data.selectedProfile.id
            }
        } catch(err) {
            if(err.response.status === 403) {
                ok = false
                console.log('[Auth] Login Failed')
            }
        }

        return ok
    }
}

export interface AccountSession {
  accessToken: String,
  name: String,
  uuid: String
}
export default Authenticator