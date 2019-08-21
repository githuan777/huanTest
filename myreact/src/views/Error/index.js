import React,{Component} from 'react'
import styles from './index.module.scss'



class Error extends Component{
    constructor(){
        super()
        this.state={
          
        }
    }

    render() {
       
        return (<div className={styles.err}>
            <h2>您的页面走丢了 ˉ∩ˉ</h2>
            
        </div>)
    }
}

export default Error