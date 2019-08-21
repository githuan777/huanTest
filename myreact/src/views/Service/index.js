import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'

export class Service extends Component {
    constructor(){
        super()
        this.state={
            vipTuList:[1,2,3,4],
            adList:[
                {
                    id: "530",
                    title: "【保险微课堂】如何用保险保障孩子的一生？",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/de75887c1510297443ca69bdbf74b6e5.jpg",
                    keywords: ["少儿保险","学平险","意外险","重疾险"],
                    visitation: "1264",
                    praise: "10",
                    show_in_list: "1",
                    commentCount: 1,
                    articleInfoUrl: "/find/articleInfo/530",
                    canPraise: 1
                },
                    {
                    id: "519",
                    title: "【保险微课堂】意外险，你买对了么？",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/03a7c0f4be7b208b74ff8ba406a5aabb.jpg",
                    keywords: ["保险","意外险"],
                    visitation: "972",
                    praise: "14",
                    show_in_list: "1",
                    commentCount: 1,
                    articleInfoUrl: "/find/articleInfo/519",
                    canPraise: 1
                },
                    {
                    id: "505",
                    title: "【保险微课堂】买了百万医疗险，重疾险还有必要么？",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/26a9db7272e44731ae1dd67cc1728223.jpg",
                    keywords: ["百万医疗险","重疾险"],
                    visitation: "1128",
                    praise: "15",
                    show_in_list: "1",
                    commentCount: 0,
                    articleInfoUrl: "/find/articleInfo/505",
                    canPraise: 1
                },
                    {
                    id: "493",
                    title: "【保险微课堂】重疾险这样买，才靠谱！",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/3ad69a04712661366a94e3b41eb6e6ea.jpg",
                    keywords: ["精算师告诉你重疾险怎么买才靠谱"],
                    visitation: "964",
                    praise: "14",
                    show_in_list: "1",
                    commentCount: 2,
                    articleInfoUrl: "/find/articleInfo/493",
                    canPraise: 1
                },
                    {
                    id: "483",
                    title: "【保险微课堂】人生第一份保单到底该怎么买？",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/058b9822adde4937bfbf02f245997496.jpg",
                    keywords: ["人生第一份保险该怎么买"],
                    visitation: "788",
                    praise: "9",
                    show_in_list: "1",
                    commentCount: 0,
                    articleInfoUrl: "/find/articleInfo/483",
                    canPraise: 1
                },
                    {
                    id: "437",
                    title: "投保时哪些人会被拒保？什么情况下必须先体检？",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/c338b4fc369cf0480f87f2ef3b0007a9.jpg",
                    keywords: ["拒保","体检"],
                    visitation: "737",
                    praise: "19",
                    show_in_list: "1",
                    commentCount: 3,
                    articleInfoUrl: "/find/articleInfo/437",
                    canPraise: 1
                },
                    {
                    id: "426",
                    title: "年轻小夫妻如何配置保险？",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/bcfb43c8687f88eca4f13c60b05d09bb.jpg",
                    keywords: ["年轻","小夫妻","保险","方案"],
                    visitation: "982",
                    praise: "28",
                    show_in_list: "1",
                    commentCount: 0,
                    articleInfoUrl: "/find/articleInfo/426",
                    canPraise: 1
                },
                    {
                    id: "414",
                    title: "除了性价比，重疾险还应关注哪些因素？",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/54ef77412604bd65d3ba6196f2cd69be.jpg",
                    keywords: ["重疾险","性价比","关注因素"],
                    visitation: "848",
                    praise: "26",
                    show_in_list: "1",
                    commentCount: 1,
                    articleInfoUrl: "/find/articleInfo/414",
                    canPraise: 1
                },
                    {
                    id: "403",
                    title: "7月1号起，商业健康保险的费用予以税前扣除政策全国适用！",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/9c9519ece8c830e3a27476ad5850b834.jpg",
                    keywords: ["商业健康保险","扣税","全国适用"],
                    visitation: "967",
                    praise: "16",
                    show_in_list: "1",
                    commentCount: 2,
                    articleInfoUrl: "/find/articleInfo/403",
                    canPraise: 1
                },
                    {
                    id: "363",
                    title: "2017中国城市癌症报告出炉，每个人都有3成患癌风险",
                    category: "1",
                    img: "//pubsto.datebao.com/opadminUploads/app/article/393183f28b2b61e2005a4c2c43d00aa6.jpg",
                    keywords: ["城市癌症","数据","患癌风险","保险"],
                    visitation: "791",
                    praise: "40",
                    show_in_list: "1",
                    commentCount: 1,
                    articleInfoUrl: "/find/articleInfo/363",
                    canPraise: 1
                }
            ]
        }
    }
    render() {
        const {vipTuList,adList} = this.state
        
        return (
            <div className={styles.service}>
                <header>
                    <div>
                        <i className={classnames('iconfont','icon-kuandaitisu')}></i>
                        <span>极速理赔</span>
                    </div>
                    <div>
                        <i className={classnames('iconfont','icon-dianzibaodan')}></i>
                        <span>电子保单</span>
                    </div>
                    <div>
                        <i className={classnames('iconfont','icon-shenqingfapiao')}></i>
                        <span>申请发票</span>
                    </div>
                    <div>
                        <i className={classnames('iconfont','icon-baodanchaxun')}></i>
                        <span>保单验真</span>
                    </div>
                    <div>
                        <i className={classnames('iconfont','icon-lvshifeijisuan')}></i>
                        <span>律师服务</span>
                    </div>
                </header>
                {/* <div className={styles.stickTop}>享服务</div> */}
                <div className={styles.vip}>
                    <h3>会员专享服务</h3>
                    <div>
                        <span>如何成为会员</span>
                        <i className={classnames('iconfont','icon-wenhao')}></i>
                    </div>
                </div>
                <div className={styles.vipTu}>
                    <div>
                        {
                            vipTuList.map((e,i)=>{
                                return(
                                    <img key={i} src={require('@/assets/img/'+e+'.jpg')} alt="" />
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.serv}>
                    <h3>大客户服务通道</h3>
                    <p>从以下通道购买过大特保保险的用户，可找回保单并享受服务。</p>
                    <img src={require('@/assets/img/5.jpg')} alt="" />
                </div>
                <div className={styles.lib}>
                    <h3>保险科技实验室</h3>
                    <div className={styles.libImg}>
                        <img src={require('@/assets/img/6.jpg')} alt="" />
                        <img src={require('@/assets/img/7.jpg')} alt="" />
                    </div>
                    
                </div>
                <div className={styles.heathy}>
                    <h3>医疗健康</h3>
                    <img src={require('@/assets/img/8.jpg')} alt="" />
                </div>
                <div className={styles.heathySay}>
                    <h3>健康讲堂</h3>
                    <div className={styles.content}>
                        <ul>
                            {
                                adList.map((e,i)=>{
                                    return(
                                    <li key={i}>
                                        <div className={styles.left}>
                                            <div className={styles.head}>
                                                {e.title}
                                            </div>
                                            <div className={styles.adNav}>
                                                {
                                                    e.keywords.map((item,index)=>{
                                                        return(
                                                            <span key={index}>{item}</span>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className={styles.adShow}>
                                                <p>
                                                    <i className={classnames('iconfont','icon-xinxi')}></i>
                                                    {e.commentCount}
                                                </p>
                                                <p>
                                                    <i className={classnames('iconfont','icon-zan')}></i>
                                                    {e.praise}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.right}>
                                            <img src={e.img} alt="" />
                                        </div>
                                    </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default Service
