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
                </div>
                
            </header>
        </div>
    
    )
}

    export default App;