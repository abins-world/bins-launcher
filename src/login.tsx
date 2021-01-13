import React, { ChangeEvent, Component } from 'react';
import logo from './icon/Abins-world.png';



import styles from './App.module.css';
import Authenticator from './util/Authenticate';
import { Link } from 'react-router-dom';

interface State {
  email: String,
  password: String
}

class Login extends Component<{}, State> {

  buttonRef: any

  constructor (props: any){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.buttonRef = []
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onEmailChange (event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: event.target.value,
      password: this.state.password
    })
  }

  onPasswordChange (event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: this.state.email,
      password: event.target.value
    })
  }

  render() {

    const passworld={
      padding: "0px 0px 20px 0px"
    }
    const complete={
      padding: "8px 120px 8px 120px"
    }
    const minecraft={
      padding: "100px 0px 0px 0px"
    }

    return (
      <div className={styles.App}>
        <Link to="/main">개발자모드: 로그인 우회</Link>
        <header className={styles.css}>
          <img src={logo}  className={styles.logo} alt="logo" />
          <p className={[styles.font, styles.hello].join(' ')}>
            어빈월드에 온 걸 환영해!
            
            먼저 로그인부터 해줄래?
          </p>
          
          <div className={styles.block}>
            
            <p style={minecraft} className={styles.minecraft} >
              Minecraft 계정
            </p>

            <p className={[styles.font, styles.i].join(' ')} >
              <p className={[styles.email, styles.i].join(' ')} >
                이메일
              </p>
              <input type="text" className={styles.Box} onChange={this.onEmailChange}/>
            </p>
            

            <p  className={[styles.password, styles.i].join(' ')}>
            비밀번호
              </p>
              



              <p style={passworld} className={styles.font} >
                <input type="password"  className={styles.ps} onChange={this.onPasswordChange}/>
                <p>
                  <input style={complete} type="button" name="complete" value="로그인" className={styles.complete} ref={a => this.buttonRef[0] = a} onClick={(event) => {
                    this.buttonRef[0].value = '잠깐만요..'
                    this.buttonRef[0].className = styles['login-in-progress']
                    this.buttonRef[0].disabled = true

                    let auth: Authenticator = new Authenticator()
                    console.log(`Email: ${this.state.email}, Password: ${this.state.password}`)
                    auth.authenticate(this.state.email, this.state.password).then((b) => {
                      if(!b) {
                        alert('비밀번호 또는 아이디가 틀렸습니다.')
                        this.buttonRef[0].value = '로그인'
                        this.buttonRef[0].className = styles.complete
                        this.buttonRef[0].disabled = false
                      }
                    })
                  }}/>
                </p>
              </p>
              </div>

            
            

            <a
            className={styles.passwordlink}
            href="https://www.minecraft.net/ko-kr/password/forgot"
            target="_blank"
            rel="noopener noreferrer">
            비밀번호를 잊으셨나요?
          </a>
            <a
            className={styles.passwordlink}
            href="https://signup.live.com/signup?ru=https%3a%2f%2flogin.live.com%2foauth20_authorize.srf%3flc%3d2066%26redirect_uri%3dhttps%3a%252f%252fsisu.xboxlive.com%252fconnect%252foauth%252fXboxLive%26response_type%3dcode%26state%3dLAAAAAEB1ufJ-SJRurM1pEgCt7g4ZoV_faB9gfe4CDuRFQgW2higKAGC4-SWMWUzZWQ4Y2I1YWE0NDViMDk5MWI2MDBlMDJkZDg3MjEx%26client_id%3d000000004420578E%26scope%3dXboxLive.Signin%26lw%3d1%26fl%3ddob%2ceasi2%26xsup%3d1%26cobrandid%3d8058f65d-ce06-4c30-9559-473c9275a65d%26mkt%3dKO-KR%26uaid%3d917ed2f1993144599f260777fbcda0a9&mkt=KO-KR&uiflavor=web&lw=1&fl=dob%2ceasi2&cobrandid=8058f65d-ce06-4c30-9559-473c9275a65d&client_id=000000004420578E&uaid=917ed2f1993144599f260777fbcda0a9&suc=000000004420578E&lic=1"
            target="_blank"
            rel="noopener noreferrer">
            계정이 없으신가요?
          </a>
          
        </header>
      </div>
    );
  }
}

export default Login;
