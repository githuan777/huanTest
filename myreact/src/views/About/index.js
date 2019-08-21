import React,{Component} from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import ctx from '@/assets/js/ctx'
import {connect} from 'react-redux'
import {changeToken} from '@/store/actionCreators'

class AboutUI extends Component{
    static contextType = ctx
    
    constructor(){
        super() 
        this.state = {
            userInfo:''
        }
    }
    toLogin=()=>{
        if(this.state.userInfo){
            localStorage.setItem('token','')

            // 将当前组件中的token和userInfo清空
            this.setState({
                userInfo:null
            })

            // 将仓库中的token清空 
            this.props.changeToken('')
        }else{
            this.props.history.push('userinfos/login')
        }
        
    }
    reqUserInfo(){
        this.context.axios.post('/userinfos/info',{
            noLogin:true
        }).then((res)=>{
            const {code,msg,info}=res

            if(code==1){
                this.setState({
                    userInfo:info
                })
            }else{
                this.setState({
                    userInfo:null
                })
            }
        })
    }
    // 退出登录
    exit=()=>{
        // 将本地存储上的token清空
        localStorage.setItem('token','')

        // 将当前组件中的token和userInfo清空
        this.setState({
            userInfo:null
        })

        // 将仓库中的token清空 
        this.props.changeToken('')
    }
    
    render(){
        const {userInfo} = this.state
        const {toLogin} = this
        return (
            <div className={styles.about}>
                <header>
                    <div className={styles.top}>
                        <strong> </strong>
                        <span>个人中心</span>
                        <i className={classnames('iconfont','icon-lingdang-xianxing')}></i>
                    </div>
                    <div className={styles.logoImg}>
                        <img className={styles.logo} src={require('@/assets/img/logo.jpg')} alt="" />
                    </div>
                    <div className={styles.dingwei} >
                        <div className={styles.left} >
                            <i className={classnames('iconfont','icon-tubiaosvg-')}></i>
                            <span className={styles.grow} > 成长值 0</span>
                        </div>
                        <span className={styles.right} > 〉 </span>
                    </div>
                    <p onClick={toLogin}>{userInfo?userInfo.username:'登录 / 注册'}</p>
                </header>
                <div  className={styles.hedBottom}>
                    <div>
                        <span>0</span>
                        <span>余额</span>
                    </div>
                    <div>
                        <span>0</span>
                        <span>优惠券</span>
                    </div>
                    <div>
                        <span>0</span>
                        <span>积分</span>
                    </div>
                </div>
                <nav>
                    <div className={styles.left}>
                        <div>
                            <span>
                                <i className={classnames('iconfont','icon-anquanbaozhang')}></i>
                            </span>
                            <span>保障中</span>
                        </div>
                        <div>
                            <span>
                                <i className={classnames('iconfont','icon-jindudengdai')}></i>
                            </span>
                            <span>待支付</span>
                        </div>
                        <div>
                            <span>
                                <i className={classnames('iconfont','icon-baoxianxubao')}></i>
                            </span>
                            <span>待续保</span>
                        </div>
                    </div>
                    
                    <img className={styles.line} src={require('@/assets/img/line.jpg')} alt="" />
                    <div className={styles.right}>
                        <span>
                            <i className={classnames('iconfont','icon-list1')}></i>
                        </span>
                        <span>全部保单</span>
                    </div>
                </nav>
                <footer>
                    <div className={styles.wai}>
                        <div className={styles.left}>
                            <i className={classnames('iconfont','icon-list2')}></i>
                            <span>申请理赔</span>
                        </div>
                        <div className={styles.right}>
                            〉
                        </div>
                    </div>
                    <div className={styles.wai}>
                        <div className={styles.left}>
                            <i className={classnames('iconfont','icon-baodanyanzhen')}></i>
                            <span>保单验真</span>
                        </div>
                        <div className={styles.right}>
                            〉
                        </div>
                    </div>
                    <div className={styles.wai}>
                        <div className={styles.left}>
                            <i className={classnames('iconfont','icon-liwu')}></i>
                            <span>我的礼包</span>
                        </div>
                        <div className={styles.right}>
                            〉
                        </div>
                    </div>
                    <div className={styles.wai}>
                        <div className={styles.left}>
                            <i className={classnames('iconfont','icon-wodepindan')}></i>
                            <span>我的拼单</span>
                        </div>
                        <div className={styles.right}>
                            〉
                        </div>
                    </div>
                    <div className={styles.wai}>
                        <div className={styles.left}>
                            <i className={classnames('iconfont','icon-jiankang')}></i>
                            <span>健康计划</span>
                        </div>
                        <div className={styles.right}>
                            〉
                        </div>
                    </div>
                    <div className={styles.wai}>
                        <div className={styles.left}>
                            <i className={classnames('iconfont','icon-tubiaosvg-')}></i>
                            <span>品牌保障</span>
                        </div>
                        <div className={styles.right}>
                            〉
                        </div>
                    </div>
                    <div className={styles.wai}>
                        <div className={styles.left}>
                            <i className={classnames('iconfont','icon-set')}></i>
                            <span>设置</span>
                        </div>
                        <div className={styles.right}>
                            〉
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
    componentDidMount(){
        this.reqUserInfo()
    }
}

function mapStateToProps(state){
    return{
        token:state.token.token
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeToken:(token)=>{
            dispatch(changeToken(token))
        }
    }
}
const AboutContainer = connect(mapStateToProps,mapDispatchToProps)(AboutUI)
// 导出
export default AboutContainer