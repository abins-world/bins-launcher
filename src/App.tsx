import React from 'react';
import logo from './icon/Abins-world.png';
import './App.css';

 function App() {
  const id={
    padding: "50px 0px 0px 0px"
  }
  const passworld={
    padding: "0px 0px 20px 0px"
  }
  const complete={
    padding: "8px 120px 8px 120px"
  }
  const minecraft={
    padding: "20px 0px 0px 0px"
  }
  return (
    <div className="App">
      <header  className="css-selector">
        
        <img src={logo}  className="App-logo" alt="logo" />
       
        <p className="font">
          어빈월드에 온걸 환영해!
          
          먼저 로그인부터 해줄래?
        </p>

        <div className="block"></div>
          
          <p style={minecraft} className="fontminecraft" >
            Minecraft 계정
          </p>

          <p style={id} className="font" >
            <p style={id} className="email">
              이메일
            </p>
            <input type="text"  className="Box"/>
          </p>
          

          <p style={id} className="password">
          비밀번호
            </p>
            



            <p style={passworld} className="font" >
              <input type="password"  className="ps"/>
              <p>
                <input style={complete} type="button" name="complete" value="로그인" className="complete"/>
              </p>
            </p>

          
          

          <a
          className="passwordlink"
          href="https://www.minecraft.net/ko-kr/password/forgot"
          target="_blank"
          rel="noopener noreferrer">
          비밀번호를 잊으셨나요?
        </a>
          <a
          className="passwordlink"
          href="https://signup.live.com/signup?ru=https%3a%2f%2flogin.live.com%2foauth20_authorize.srf%3flc%3d2066%26redirect_uri%3dhttps%3a%252f%252fsisu.xboxlive.com%252fconnect%252foauth%252fXboxLive%26response_type%3dcode%26state%3dLAAAAAEB1ufJ-SJRurM1pEgCt7g4ZoV_faB9gfe4CDuRFQgW2higKAGC4-SWMWUzZWQ4Y2I1YWE0NDViMDk5MWI2MDBlMDJkZDg3MjEx%26client_id%3d000000004420578E%26scope%3dXboxLive.Signin%26lw%3d1%26fl%3ddob%2ceasi2%26xsup%3d1%26cobrandid%3d8058f65d-ce06-4c30-9559-473c9275a65d%26mkt%3dKO-KR%26uaid%3d917ed2f1993144599f260777fbcda0a9&mkt=KO-KR&uiflavor=web&lw=1&fl=dob%2ceasi2&cobrandid=8058f65d-ce06-4c30-9559-473c9275a65d&client_id=000000004420578E&uaid=917ed2f1993144599f260777fbcda0a9&suc=000000004420578E&lic=1"
          target="_blank"
          rel="noopener noreferrer">
          계정이 없으신가요?
        </a>
        
      </header>
    </div>
  );
}

export default App;
