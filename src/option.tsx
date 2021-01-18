import React, { Component } from 'react';

import styles from './App3.module.css';

import './App3.module.css';

class Option extends Component<{history: any}> {

    render(){
        function clear() {
            const name = document.getElementById("App3_interfaceoption__3Bi8x");
            if(!name)
                return;
        
        
            const interfaceoption = document.getElementById("App3_interface__1OnR4");
            if(!interfaceoption)
                return;
            interfaceoption.style.bottom = '480px'
            interfaceoption.style.height = '40px'


            interfaceoption.style.right = '990px'
            interfaceoption.style.width = '180px'
           

            name.style.visibility = 'hidden'
            name.style.opacity = '0'
        }
        return (
            <div id={styles.default}>
                <input type="button" id={styles.back} value="닫기" onClick={(event) => {
                    this.props.history.push('/main')
                }}/>                        
                <span id={styles.line}></span>
                
                <input type="button" id={styles.interface} value="인터페이스" onClick={(event) => {
                        const name = document.getElementById("App3_interfaceoption__3Bi8x");
                        if(!name)
                            return;
                    
                    
                        const here = document.getElementById("App3_interface__1OnR4");
                        if(!here)
                            return;
                        here.style.bottom = '485px'
                        here.style.height = '30px'


                        here.style.right = '995px'
                        here.style.width = '170px'
                       

                        name.style.visibility = 'visible'
                        name.style.opacity = '1'



                        
                        


                }}/>

                <span id={styles.interfaceoption}  >인터페이스</span>
            </div>
        );
    }
}

export default Option;