import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import ctx from '@/assets/js/ctx'

export class Home extends Component {
    static contextType = ctx

    constructor(){
        super()
        this.state={
            list:[
                {
                    id: 1484,
                    local_product_name: "亚太综合意外险",
                    current_price: "39元/年",
                    list_img_url_app: "https://pubsto.datebao.com/ladderUploads/1484/wap/420-300.jpg",                    
                    list_subtitle: "超高性价比，最低39元享整整一年保障"
                },
                {
                    id: 1763,
                    local_product_name: "华贵大麦定期寿险",
                    current_price: "19元起",
                    list_img_url_app: "https://pubsto.datebao.com/ladderUploads/1763/wap/420-300.jpg",
                    list_subtitle: "免体检最高300万保额，超高性价比的王牌定寿！"
                }
            ]
        }
    }

    toSearch=()=>{
        this.props.history.push('/search')
    }
    toDetail(id){
        
        this.props.history.push('/goods/detail/' + id)
    }

    render() {
        const {list}=this.state
        const {toSearch}=this
        return (
            <div className ={styles.home}>
                <div className ={styles.top}>
                    <h1>关于保险</h1>
                    <p>你需要的都在这里</p>
                    <p>一</p>
                    <div className ={styles.sou} onClick={toSearch}>
                        <i className={classnames('iconfont','icon-seachx')}></i>
                        <span>输入“长期医疗”，嗖一下就告诉你...</span>
                    </div>
                </div>
                <h3 className ={styles.tjHeader}>
                    为您推荐
                    <i className={classnames('iconfont','icon-icon-test')}></i>
                </h3>
                <div className ={styles.recommend}>
                    <ul>
                        {
                            list.map((e,i)=>{
                                return(
                                <li key={i} onClick={() => this.toDetail(e.id)}>
                                    <div className ={styles.reTop}>
                                        <img src={e.list_img_url_app} alt="" />
                                        <div>
                                            <p>{e.local_product_name}</p>
                                            <p>{e.current_price}</p>
                                        </div>
                                    </div>
                                    <div className ={classnames(styles.reBottom,'sl')}>
                                        <i className={classnames('iconfont','icon-react')}></i>
                                        <span>{e.list_subtitle}</span>
                                    </div>
                                </li>)
                            })
                        }
                        
                    </ul>
                </div>
                <div className ={styles.girl}></div>
                <div className ={styles.ensure}>
                    <h3>
                        品牌保障
                        <i className={classnames('iconfont','icon-you')}></i>
                        <span>GUARANTEE</span>
                    </h3>
                    <div className ={styles.enbottom}>
                        <div className ={styles.lipei}>
                            <i className={classnames('iconfont','icon-ico')}></i>
                            <p>极速理赔</p>
                            <p>线上提交理赔材料大特保全程服务</p>
                        </div>
                        <div className ={styles.xubao}>
                            <i className={classnames('iconfont','icon-baohu')}></i>
                            <p>支持续保</p>
                            <p>大特保可以为您提供多种续保方案</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
