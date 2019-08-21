import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import {Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import ctx from '@/assets/js/ctx'
import {connect} from 'react-redux'
import { changeToken } from "@/store/actionCreators";

export class LoginUI extends Component {
    static contextType = ctx

    constructor(){
        super()
        this.state={
            username:'',
            password:'',
        }
    }

    toBack=()=>{
        this.props.history.goBack()
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

    onLogin = (res) => {
        const {username,password} = this.state

        if(!username||!password){
            // 使用antd-mobile的弹框提示组件
            Toast.fail('请输入用户名和密码',2);

            return false
        }

        this.context.axios.post( 'userinfos/login' ,{
            username,
            password
        }).then((res)=>{
            const {code,msg,token} = res

            if(code == 1){
                Toast.success('登录成功');
                
                // 把token存到本地
                localStorage.setItem('token',token)

                // 把token存到store
                // this.context.store.changeToken(token)	
                this.props.changeToken(token)

                //返回到上一页
                this.props.history.goBack()
            }else{
                Toast.fail(msg);
            }
        })
    }
    
    render() {
        const {onLogin,toBack,iptUsername,iptPassword} = this
        
        return (
            <div className={styles.login}>
                <header>
                    <i className={classnames('iconfont','icon-fanhui')} onClick={toBack}></i>
                    <span>登录</span>
                    <Link to="/userinfos/register" replace>注册</Link>
                </header>
                <div className={styles.form}>
                    <i className={classnames('iconfont','icon-ren')}></i>
                    <input type='text'  id="username" onChange={iptUsername} placeholder='请输入您的用户名' />
                </div>
                <div className={styles.form}>
                    <i className={classnames('iconfont','icon-suo')}></i>
                    <input type='password' id="password" onChange={iptPassword} placeholder='请输入您的密码' />
                </div>
                <div className={styles.btn} onClick={onLogin}>登录</div>
                <div className={styles.more}>
                    <span>短信验证码登录</span>
                    <span>忘记密码</span>
                </div>
                <div className={styles.change}>
                    <span className={styles.line}></span>
                    <span>还可以选择以下登录方式</span>
                    <span className={styles.line}></span>
                </div>
                <div className={styles.weiChar}>
                    <i className={classnames('iconfont','icon-wei-xin-wang-ye-ban')}></i>
                    微信登录
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeToken: (token) => {
            dispatch(changeToken(token))
        }
    }
}

const LoginContainer = connect(null,mapDispatchToProps)(LoginUI)

export default LoginContainer
