import React from 'react';
import logo from './Abins-world.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p className="font">
          어빈월드에 온걸 환영해!
          
          먼저 로그인부터 해줄래?
        </p>

        <p className="font" >
          아이디 : <input type="text" className="Box"/>
          </p>
        

        <p className="font" >
          비밀번호 : <input type="text" className="Box"/>
          </p>
        
      </header>
    </div>
  );
}

export default App;
