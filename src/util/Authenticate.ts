import axios from 'axios'

axios.defaults.withCredentials = false

class Authenticator {

    static userInfo: any = {}

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
            Authenticator.userInfo = response.data
        } catch(err) {
            if(err.response.status === 403) {
                ok = false
                console.log('[Auth] Login Failed')
            }
        }

        return ok
    }
}

export default Authenticator