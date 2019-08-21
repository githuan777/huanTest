import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import BackToTop from '../../components/BackToTop'
import GoodsItem from '../../components/GoodsItem'
import ctx from '@/assets/js/ctx'
import { PullToRefresh, ListView ,Toast} from 'antd-mobile';

export class GoodsList extends Component {
    static contextType = ctx

    constructor(){
        super()
        this.state={
            sortList:[
                {
                    select:'全部'
                },
                {
                    select:'医疗'
                },
                {
                    select:'重疾'
                },
                {
                    select:'意外'
                },
                {
                    select:'航旅'
                }
            ],
            goods:[],
            textList:[
                {select:'综合排序'},
                {select:'价格最低'},
                {select:'销量最高'}
            ],
            gsList:[
                {select:'中国平安'},
                {select:'太平洋保险'},
                {select:'泰康在线'},
                {select:'人寿保险类公司'},
                {select:'财险保险类公司'},
                {select:'其他'},
                {select:'重置'},
            ],
            paixuLable:'综合排序',
            gongsiLable:'保险公司',
            shaixLable:'筛选',
            paixuShow:false,
            gongsiShow:false,
            shaixShow:false,

            isRefreshing:false,
            dataSource : new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),

            ipt_keyword: '', // 输入框的值
            pageNum:1,
            goodsType: '',
            keyword: '',
            rank: '', // 排序依据
            order: 0 ,// 排序顺序
            ipt_start: '',
            ipt_end: '',
            start: '',
            end: ''
        }

        this.listTop = React.createRef()
        

    }

   
    reqGoodsList(pageNum){
        const {keyword,goodsType,rank,order,start,end} = this.state

        return this.context.axios.post('datebaogoods/list2',{
            pageNum,
            keyword,
            goodsType,
            rank,
            order,
            start,
            end
        })
    }

    // 下拉刷新
    loadTop = (type='下拉刷新')=>{
        // 如果是下拉刷新动作触发的刷新，清空输入框的值和搜索关键字
        if(type == '下拉刷新'){
            this.setState({
                ipt_keyword: '',
                keyword: ''
            })
        }

        // 添加顶部loading
        this.setState({
            isRefreshing: true
        })

        this.reqGoodsList(1)
        .then(res=>{
            const {code,msg,list}=res
            if(code==1){
                this.setState({
                    goods: list,
                    dataSource: this.state.dataSource.cloneWithRows(list),
                    pageNum: 1, // 页数变成1
                    isRefreshing: false, // 是否正在刷新
                    isLoadingMore: false, // 是否正在加载更多
                    hasMore: true // 是否还有更多数据
                })
                
                this.listTop.current.scrollTo(0,0) // 自动回到顶部
                
            }else{
                Toast.fail(msg)
            }
        })
    }
    // 上拉加载更多
    loadBottom = ()=>{
        // 当没有更多数据的时候，就不再执行加载更多
        if(!this.state.hasMore) return false

        // 显示正在加载中
        this.setState({
            isLoadingMore: true
        })

        // 显示正在加载中
        this.reqGoodsList(this.state.pageNum + 1)
        .then(res=>{
            const {code,msg,list} = res

            if(code == 1){

                if(list.length){
                    // 将新数据拼接在旧数据的后面
                    const goodsList = this.state.goods.concat(list)
                    this.setState({
                        goods:goodsList,
                        dataSource: this.state.dataSource.cloneWithRows(goodsList),
                        pageNum: this.state.pageNum + 1 // 页数加1
                    })
                }else{
                    // 关闭上拉加载更多的功能
                    this.setState({
                        hasMore: false
                    })
                }
                // 去掉底部提示
                this.setState({
                    isLoadingMore: false
                })
            }else{
                Toast.fail(msg)
            }
        })
    }

    iptKeyword = (val)=>{
        this.setState({
            ipt_keyword: val
        })
    }



    //点击搜索跳转
    toSearch=()=>{
        this.props.history.push('/search')
    }
    //四种核心分类
    onClass=(item,index)=>{
        const newList = this.state.sortList.concat()
        newList.map((e)=>{
           return e.isChosen =false
        })
        item.isChosen = true
        this.setState({
            sortList:newList,
            goodsType:index,
            paixuShow:false,
            gongsiShow:false,
            shaixShow:false,
        },()=>{
            this.loadTop('goodsType')
        })
    }
    toPxshow=()=>{
        this.setState({
            paixuShow:!this.state.paixuShow,
            gongsiShow:false,
            shaixShow:false,
        })
    }
    duiGou=(item,index)=>{
        const newList = this.state.textList.concat()
        newList.map((e)=>{
           return e.isChosen =false
        })
        item.isChosen = true
        this.setState({
            textList:newList,
            paixuLable:item.select,
            paixuShow:false,
        },()=>{
            if(index==0){
                this.loadTop('综合')
            }else if(index==1){
                this.setState({
                    rank:'display_price_float',
                    order : 1
                },()=>{
                    this.loadTop('价低')
                })
            }else if(index==2){
                this.setState({
                    rank:'product_sales_volume',
                    order : -1
                },()=>{
                    this.loadTop('量高')
                })
            }
        })
    }

    //保险公司
    toGsshow=()=>{
        this.setState({
            gongsiShow:!this.state.gongsiShow,
            paixuShow:false,
            shaixShow:false
        })
    }
    gsduoxuan=(item,index)=>{
        const newList = this.state.gsList.concat()
        newList.map((e)=>{
            return e.isChosen =false
         })
        item.isChosen =true
        this.setState({
            gsList:newList,
            gongsiLable:item.select,
            gongsiShow:false,
        },()=>{
            if(index==0){
                this.setState({
                    keyword:'中国平安'
                },()=>{
                    this.loadTop('中国平安')
                })
            }else if(index==1){
                this.setState({
                    keyword:'太平洋保险'
                },()=>{
                    this.loadTop('太平洋保险')
                })
            }else if(index==2){
                this.setState({
                    keyword:'泰康在线'
                },()=>{
                    this.loadTop('泰康在线')
                })
            }
            else if(index==3){
                this.setState({
                    keyword:'人寿'
                },()=>{
                    this.loadTop('人寿')
                })
            }
            else if(index==4){
                this.setState({
                    keyword:'财险'
                },()=>{
                    this.loadTop('财险')
                })
            }
            else if(index==5){
                this.setState({
                    keyword: ''
                },()=>{
                    this.loadTop('其他')
                })
            }else if(index==6){
                item.isChosen =false
                this.setState({
                    gongsiLable:'保险公司',
                    keyword: ''
                },()=>{
                    this.loadTop('重置')
                })
            }
        })
    }

    // 显示筛选
    toSxShow=()=>{
        this.setState({
            shaixShow:!this.state.shaixShow,
            paixuShow:false,
            gongsiShow:false
        })
    }
    // 输入最低价
    iptMinPrice = (event) => {
        this.setState({
            ipt_start: event.target.value
        })
    }
    // 输入最高价
    iptMaxPrice = (event) => {
        this.setState({
            ipt_end: event.target.value
        })
    }  
    // 选择价格区间
    choosePrice = () => {
        if(!this.state.ipt_start&&!this.state.ipt_end){
            this.setState({
                start : '',
                end : '',
                shaixShow : false,
                shaixLable: '筛选', 
            })
            return false
        }
        this.setState({
                start : this.state.ipt_start,
                end : this.state.ipt_end,
                shaixShow : false,
                shaixLable: `${this.state.ipt_start} ~ ${this.state.ipt_end}`, 
            },() => this.loadTop('价格区间')
        )
    }
    resetPrice=()=>{
        this.setState({
            ipt_start: '',
            ipt_end: '',
            start: '',
            end: '',
            shaixShow : false,
            shaixLable:'筛选'
        },()=>{
            this.loadTop('所有价格')
        })
    }

    bgHide=()=>{
        this.setState({
            gongsiShow:false,
            paixuShow:false,
            // shaixShow : false
        })
    }   




    render() {
        const {sortList,textList,paixuShow,paixuLable,gongsiLable,gongsiShow,gsList,shaixShow,shaixLable} = this.state
        const {toSearch,onClass,duiGou,toPxshow,gsduoxuan,toGsshow,toSxShow,bgHide}=this
        return (
            <div className={styles.goodsList}>
                <div className ={styles.sou} onClick={toSearch}>
                    <i className={classnames('iconfont','icon-seachx')}></i>
                    <span>请输入您想搜索的关键字</span>
                </div>

                <div className ={styles.sort}>
                    <div className ={styles.sort1}>
                        {
                            sortList.map((e,i)=>{
                                return (
                                    <span className={ e.isChosen ? styles.active : ''} onClick={()=>onClass(e,i)} key={i}>{e.select}</span>
                                )
                            })
                        }
                    </div>
                    <div className ={styles.sort2}>
                        <span onClick={toPxshow} className={styles.active}>
                            <b>{paixuLable}</b>
                            
                            <i className={classnames('iconfont', !paixuShow?'icon-below-s':'icon-top-s')}></i>
                        </span>
                        <span onClick={toGsshow} className={gongsiLable != '保险公司'? styles.active:''}>
                            
                            <b>{gongsiLable}</b>
                            <i className={classnames('iconfont', !gongsiShow?'icon-below-s':'icon-top-s')}></i>
                        </span>
                        <span  onClick={toSxShow} className={shaixLable != '筛选'? styles.active:''}>
                            
                            <b>{shaixLable}</b>
                            <i className={classnames('iconfont','icon-shaixuan')}></i>
                        </span>
                    </div>
                    {
                        paixuShow&&
                        <div className={styles.pxHide} onClick={bgHide}>
                            <ul>
                                {
                                    textList.map((e,i)=>{
                                        return(
                                            <li className={e.isChosen ? styles.active : ''} onClick={()=>duiGou(e,i)} key={i}>
                                                <span>{e.select}</span>
                                                <span>√</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {
                        gongsiShow&&
                        <div className={styles.gsHide} onClick={bgHide}>
                            <ul>
                                {
                                    gsList.map((e,i)=>{
                                        return(
                                            <li className={e.isChosen ? styles.active : ''} onClick={()=>gsduoxuan(e,i)} key={i}>
                                                <span>{e.select}</span>
                                                <span>√</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {
                        shaixShow&&
                        <div className={styles.sxHide} onClick={bgHide}>
                            <div>
                                <p>
                                    <span>价格区间：</span>
                                    <input type="number" placeholder='最低价' value={this.state.ipt_start} onChange={this.iptMinPrice} />
                                    <span>~</span>
                                    <input type="number" placeholder='最高价' value={this.state.ipt_end} onChange={this.iptMaxPrice} />
                                </p>
                                <div className={styles.towBtn}>
                                    <button onClick={this.resetPrice}>重置</button>
                                    <button onClick={this.choosePrice}>确定</button>
                                </div>
                            </div>
                            
                        </div>
                    }                         
                </div>
                
                <div className ={styles.goods}>
                    <ul>
                        <ListView  ref={this.listTop}
                            style={{
                                height:'calc(100vh - 0.5rem)',
                                overflow:'auto'
                            }}

                            // 数据源
                            dataSource={this.state.dataSource}
                            renderRow={
                                (rowData, sectionID, rowID)=>{

                                
                                    return <GoodsItem itemInfo={rowData} key={rowID} />
                                    
                                }
                            }
                            // 下拉刷新
                            pullToRefresh=
                            {<PullToRefresh
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.loadTop}
                            />}

                            // 上拉加载更多
                            onEndReached={this.loadBottom}
                            onEndReachedThreshold={1}
                            renderFooter={()=>{
                                const {isLoadingMore,hasMore}=this.state
                                return (
                                    <div style={{ 
                                        padding: 30, 
                                        textAlign: 'center'
                                        }}>
                                            {
                                                isLoadingMore?'正在加载中':(hasMore ? '' : '没有更多数据了')
                                            }
                                    </div>
                                )
                            }}
                        />
                        
                    </ul>
                </div>

                {/* 回到顶部 */}
                {
                    this.listTop.current && <BackToTop scrollObj={this.listTop.current.listviewRef.ListViewRef.ScrollViewRef} />
                }
            </div>
        )
    }
    componentDidMount(){
        this.loadTop()
    }
}

export default GoodsList
