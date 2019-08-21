import React, { Component } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import BackToTop from '../../components/BackToTop'
import GoodsItem from '../../components/GoodsItem'
import ctx from '@/assets/js/ctx'
import { PullToRefresh, ListView ,SearchBar,Toast} from 'antd-mobile';

export class Search extends Component {
    static contextType = ctx
    constructor(){
        super()
        this.state={
            goods:[],
            hotList:[
                '综合意外',
                '长期保障型',
                '航班延误',
                '有车一族',
                '高额保障',
                '孝敬父母',
                '住院门诊全覆盖',
                '高额意外',
                '专保癌症',
                '少儿高发疾病保障'
            ],
            classList:[
                '医疗',
                '重疾',
                '意外',
                '航旅'
            ],
            isRefreshing:false,
            dataSource : new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),

            ipt_keyword: '',
            keyword: '',
            goodsType:'',
            pageNum:1,
            textList:[
                '意外','长期','航','车','高额','老年','住院','意外','癌症','少儿'
            ]
        }

        this.listTop = React.createRef()

    }

    reqGoodsList(pageNum){
        const {keyword,goodsType} = this.state

        return this.context.axios.post('datebaogoods/list2',{
            pageNum,
            keyword,
            goodsType
        })
    }
    // 下拉刷新
    loadTop = (type='下拉刷新')=>{
        // 如果是下拉刷新动作触发的刷新，清空输入框的值和搜索关键字
        if(type == '下拉刷新'){
            this.setState({
                // ipt_keyword: '',
                // keyword: ''
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

    onSearch=()=>{
        this.setState({
            keyword: this.state.ipt_keyword
        },() => {//回调函数
            this.loadTop('模糊查询')
        })
    }

    hotChosen=(item,index)=>{
        this.setState({
            keyword:this.state.textList[index],
            ipt_keyword: item
        },()=>{
            this.loadTop('hot')
        })
    }

    classChosen=(item,index)=>{
        this.setState({
            keyword:'不想查~~不想查!!',
            goodsType: index + 1,
            ipt_keyword: item
        },()=>{
            this.loadTop('class')
        })
        
    }

    toBack=()=>{
        if(this.state.keyword){
            this.setState({
                keyword:'',
                ipt_keyword: ''
            })
        }else{
            this.props.history.goBack()
        }
        
    }

    render() {
        const {keyword,ipt_keyword,hotList,classList}=this.state
        const {onSearch,iptKeyword,toBack,hotChosen,classChosen} = this
        return (
            <div className={styles.search}>
                <div className={styles.top}>
                    <i onClick={toBack} className={classnames('iconfont','icon-fanhui',styles.back)}></i>
                    <SearchBar placeholder="请输入关键字" value={ipt_keyword} onChange={iptKeyword} onSubmit={onSearch} />
                </div>

                {
                    !keyword&&
                    <>
                    <div className={styles.hotSou}>
                        <p>热门搜索</p>
                        <div>
                            {
                                hotList.map((e,i)=>{
                                    return(
                                        <span onClick={()=>hotChosen(e,i)} key={i}>{e}</span>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.classify}>
                        <p>保险分类</p>
                        <div>
                            {
                                classList.map((e,i)=>{
                                    return(
                                        <span onClick={()=>classChosen(e,i)} key={i}>{e}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    </>
                }
                
                {
                    keyword&&
                    <>
                    <div className ={styles.goods}>
                        <ul>
                            <ListView 
                                ref={this.listTop}
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
                    </>
                }
            </div>
        )
    }
}

export default Search
