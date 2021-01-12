import React from 'react';
import styles from './App2.module.css';


function App () { 
    const play={
        padding: "10px 120px 10px 120px"
    }
    return(
        <div className={styles.default}>
            <header className={styles.App}>
                    
            <div className={styles.serversTitle}>서버 목록</div>
                <div className={styles.servers}>
                    <div className={styles.state}>
                        <input style={play}className={styles.play} type="button" name="play" value="플레이"></input>
                    
                    </div>
                    
                    <input style={play}className={styles.play} type="button" name="play" value="플레이"></input>
                    {/* <a 
                    href="https://github.com/A-Bins/bins-launcher"
                    target="_blank"
                    rel="noopener noreferrer">
                        <input className={styles.github} type="button" name="github" value=""></input>
                    </a> */}
                        <input className={styles.option} type="button" name="option" value=""></input>

                </div>
            </header>
        </div>
    
    )
}

    export default App;