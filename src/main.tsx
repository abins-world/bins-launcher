import React, { Component } from 'react';
import ckdlogo from './icon/CKDtitle.png'
import styles from './App2.module.css';
import Authenticator from './util/Authenticate';
import { LaunchPhases } from './util/LaunchPhases';

interface State {
    status: String
}

class App extends Component<{history: any}, State> {

    buttonRef: any
    constructor (props: any){
        super(props);
        this.state = {
            status: ''
        }
        this.buttonRef = []
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
                            <input style={play} className={styles.play} type="button" name="play" value="플레이" ref={a => this.buttonRef[0] = a} onClick={async (event: React.MouseEvent) => {
                                this.buttonRef[0].className = styles.noPlay
                                this.buttonRef[1].className = 'state'
                                this.setState({status: '파일 확인중...'})
                                const launchphase: LaunchPhases = new LaunchPhases()
                                const check1: boolean = await launchphase.checkFilesExistsAndEdited()
                                if(!check1) {
                                    this.setState({status: '모드 다운로드중... (1/2)'})
                                    await launchphase.downloadFileGh('/abins-world/dist/raw/main/abinworld-mod-1.0-SNAPSHOT.jar', launchphase.getModFolder() + '/mod.jar')
                                    this.setState({status: '모드 다운로드중... (2/2)'})
                                    await launchphase.downloadFileCf('minecraft/mc-mods/fabric-api/download/3174110/file', launchphase.getModFolder() + '/fabricApi.jar')
                                }
                                this.setState({status: '무결성 확인중... (1/2)'})
                                const check2 = await launchphase.checkChecksum(launchphase.getModFolder() + '/mod.jar', 'http://github.com/abins-world/dist/raw/main/abinworld-mod-1.0-SNAPSHOT.jar.sha1')
                                if(!check2) {
                                    alert('무결성 검사 실패! ' + launchphase.getModFolder() + ' 폴더를 삭제한 뒤에 다시 시도해주세요!')
                                    window.require('electron').app.exit(1)
                                }
                                this.setState({status: '무결성 확인중... (2/2)'})
                                const check3 = await launchphase.checkChecksum(launchphase.getModFolder() + '/fabricApi.jar', 'http://github.com/abins-world/dist/raw/main/fabricApi.jar.sha1')
                                if(!check3) {
                                    alert('무결성 검사 실패! ' + launchphase.getModFolder() + ' 폴더를 삭제한 뒤에 다시 시도해주세요!')
                                    window.require('electron').app.exit(1)
                                }
                                this.setState({status: `${check2}, ${check3}: 통과! 실행 준비중..`})
                            }}></input>

                            <div className={styles.noState} ref={a => this.buttonRef[1] = a}>{this.state.status}</div>
                            
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
                        <img className={styles.profile} src={`https://crafatar.com/avatars/${Authenticator.userInfo.uuid === '' ? 'MHF_Steve' : Authenticator.userInfo.uuid}?size=50`} alt="profile"></img>   

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