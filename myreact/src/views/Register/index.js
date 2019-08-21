import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import {Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import ctx from '@/assets/js/ctx'

export class Register extends Component {
    static contextType = ctx

    constructor(){
        super()
        this.state={
            username:'',
            password:'',
        }
    }

    iptUsername = (event) => {
        this.setState({
            username:event.target.value
        })
    }
    iptPassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }

    onRegister = ()=>{
        const {username,password} = this.state

        if(!username||!password){
            // 使用antd-mobile的弹框提示组件
            Toast.fail('请输入用户名和密码',2);

            return false
        }

        this.context.axios.post('userinfos/register',{
            username,
            password
        }).then((res)=>{
            const {code,msg} = res

            if(code == 1){
                Toast.success('注册成功',2,()=>this.props.history.replace('/userinfos/login'))
            }else{
                Toast.fail(msg);
            }
        })
    }
    

    toBack=()=>{
        this.props.history.goBack()
    }

    render() {
        const {onRegister ,toBack,iptUsername,iptPassword} = this
        return (
            <div className={styles.register}>
                <header>
                    <i className={classnames('iconfont','icon-fanhui')} onClick={toBack}></i>
                    <span>注册</span>
                    <Link to="/userinfos/login" replace>登录</Link>
                </header>
                <div className={styles.form}>
                    <input type='text'id="username" onChange={iptUsername} placeholder='请输入您的用户名' />
                </div>
                <div className={styles.form}>
                    <input type='text' placeholder='请输入您的手机号' />
                </div>
                <div className={styles.form}>
                    <input type='password' placeholder='请输入验证码' />
                    <div className={styles.formBtn}>获取验证码</div>
                </div>
                <div className={styles.form}>
                    <input type='password'id="password" onChange={iptPassword} placeholder='请输入您的密码' />
                </div>
                <p>密码为6 ~ 16位的数字或字母</p>
                <div className={styles.btn} onClick={onRegister}>注册</div>
                <div className={styles.more}>
                    <span>注册代表你同意<i>大特保条款</i></span>
                </div>
                <div className={styles.change}>
                    <span>一分钟了解大特保</span>
                </div>
            </div>
        )
    }
}

export default Register
