import React,{Component,Fragment} from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import  PropTypes from 'prop-types'

export class BackToTop extends Component{
   
    constructor(){
        super() 

        this.state = {
            isBack:false
        }
    }

    // 设置props的默认值
    static defaultProps = {
        scrollObj : window
    }

    // 设置props的类型
    static propTypes = {
        scrollObj : PropTypes.object.isRequired
    }

    backToTop = ()=>{
        this.props.scrollObj.scrollTo(0,0)
    }

    render(){
        const {backToTop} = this
       return(
        <Fragment>
            {this.state.isBack && <i className={classnames(styles.backToTop,'iconfont','icon-huidingbu') }  onClick={backToTop} ></i>}  
        </Fragment>
       )
    }


    componentDidMount(){
        
        const that = this

        this.props.scrollObj.onscroll = function(){
            const scrollTop = (this == window) ? (document.documentElement.scrollTop || document.body.scrollTop) : this.scrollTop
            // console.log(scrollTop)
            that.setState({
                isBack: scrollTop > 500
            })
        }  
    }
}

// 导出
export default BackToTop