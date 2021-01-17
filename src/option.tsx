import React, { Component } from 'react';

import styles from './App3.module.css';

import './App3.module.css';

class Option extends Component<{history: any}> {
    render(){
        return (
            <div id={styles.default}>
                <input type="button" id={styles.back} value="닫기" onClick={(event) => {
                    this.props.history.push('/main')
                }}/>                        
                <span id={styles.line}></span>
                
                <input type="button" id={styles.interface} value="인터페이스" onClick={(event) => {


                    
                        var name = document.getElementById("App3_interfaceoption__3Bi8x");
                        


                }}/>

                <span id={styles.interfaceoption}  >인터페이스</span>
            </div>
        );
    }
}

export default Option;