import React, { Component } from 'react';
import ckdlogo from './icon/CKDtitle.png'
import styles from './App2.module.css';



class App extends Component<{history: any}> {
    constructor (props: any){
        super(props);
    } 
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

                            <div className={styles.profile}>
                              <table>
                                <tr>
                                  <td rowSpan={2}><img src="https://minotar.net/avatar/f93bb85a694c4eb7a35ae080c0b1eb21" height="84" width="84"></img></td>
                                </tr>
                                <tr>
                                  <td>test</td>
                                </tr>
                                <tr>
                                <td>test</td>
                                </tr>
                              </table>
                            </div>

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