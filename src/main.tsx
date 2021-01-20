import React, { Component } from 'react';
import ckdlogo from './icon/CKDtitle.png'
import styles from './App2.module.css';
import Authenticator from './util/Authenticate';



class App extends Component<{history: any}> {
    render() {

        const play={
            padding: "10px 120px 10px 120px"
        }
        return(



            <div className={styles.default}>
                
                <header className={styles.App}>

                <div className={styles.serversTitle}>
                    서버 목록
                </div>
                
                    <div className={styles.servers}>
                        <div className={styles.state}>
                            <input style={play}className={styles.play} type="button" name="play" value="플레이"></input>
                            
                        </div>
                        <div>
                            <input className={styles.ckd} type="button" name="ckd" value=""></input>
                        </div>
                        
                        <img src={ckdlogo} alt="ckd" className={styles.ckdlogo}></img>
                        {/* <a 
                        href="https://github.com/A-Bins/bins-launcher"
                        target="_blank"
                        rel="noopener noreferrer">
                            <input className={styles.github} type="button" name="github" value=""></input>
                        </a> */}
                        <img className={styles.profile} src={`https://cravatar.eu/helmavatar/${Authenticator.userInfo.name === '' ? 'A-Bins' : Authenticator.userInfo.name}/50`} alt="profile"></img>   

                        <span className={styles.profileName}>{Authenticator.userInfo.name === '' ? 'A-Bins' : Authenticator.userInfo.name}</span>
                        <span className={styles.profileTitle}></span>
                            <div className={styles.options}>
                                
                                <input id={styles.option} type="button" name="option" value=""  onClick={(event) => {
                                    
                                    this.props.history.push('/option')
                            
                                }}/>
                                <span id={styles.optiontip}>
                                    설정
                                </span>
                            </div>
                            
                     
                    </div>
            
                </header>


            </div>

        
        )


    }
}

    export default App;