import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import classnames from 'classnames'
import { DatePicker, Picker,List ,Toast,ActionSheet} from 'antd-mobile';
import { district, provinceLite } from 'antd-mobile-demo-data';
import arrayTreeFilter from 'array-tree-filter';
import {connect} from 'react-redux'

const minDate = new Date('1958/1/1');
const maxDate = new Date('2001/12/31');

export class GoodsDetailUI extends Component {
    static contextType = ctx

    constructor(){
        super()
        this.state={
            id:'',
            list:null,
            payList: [
                {
                    select : '一次性缴清'
                },
                {
                    select : '5年'
                },
                {
                    select:'10年'
                },
                {
                    select:'20年'
                },
                {
                    select:'30年'
                }
            ],
            sexList:[
                {
                    select:'男'
                },
                {
                    select:'女'
                }
            ],
            dayList:[
                {
                    select:'10年'
                },
                {
                    select:'20年'
                },
                {
                    select:'30年'
                },
                {
                    select:'保至60岁'
                },
                {
                    select:'保至65岁'
                },
                {
                    select:'保至70岁'
                }
            ],
            pickerValue: [],
            baoList:[
                {
                    select:'有社保'
                },
                {
                    select:'无社保'
                }
            ],
            visible: false,
            buyNum:10,
            data:'',
            companyName:'华贵人寿',
            imgList:[
                'https://pubsto.datebao.com/ladderUploads/1763/wap/wap-1.jpg',
                'https://pubsto.datebao.com/ladderUploads/1763/wap/%E5%AE%98%E7%BD%91-%E5%8D%8E%E8%B4%B5%E5%A4%A7%E9%BA%A6%E5%AE%9A%E6%9C%9F%E5%AF%BF%E9%99%A9wap_02.jpg',
                'https://pubsto.datebao.com/ladderUploads/1763/wap/%E5%AE%98%E7%BD%91-%E5%8D%8E%E8%B4%B5%E5%A4%A7%E9%BA%A6%E5%AE%9A%E6%9C%9F%E5%AF%BF%E9%99%A9wap_03.jpg',
                'https://pubsto.datebao.com/ladderUploads/1763/wap/%E5%AE%98%E7%BD%91-%E5%8D%8E%E8%B4%B5%E5%A4%A7%E9%BA%A6%E5%AE%9A%E6%9C%9F%E5%AF%BF%E9%99%A9wap_04.jpg',
                'https://pubsto.datebao.com/ladderUploads/1763/wap/%E5%AE%98%E7%BD%91-%E5%8D%8E%E8%B4%B5%E5%A4%A7%E9%BA%A6%E5%AE%9A%E6%9C%9F%E5%AF%BF%E9%99%A9wap_05.jpg'
                ],
            clicked: 'none',
            clicked1: 'none',
            clicked2: 'none',
        }
    }

    reqGoodsDetail(){
        this.context.axios.post('/datebaogoods/detail',{
            goodsId:this.state.id,
            noLogin:true
        }).then((res)=>{
            const {code,msg,list}=res
            if(code==1){
                this.setState({
                    list
                })
            }else{
                Toast.fail(msg)
            }
        })
    }


    
    selectPay=(item,index)=>{
        const newList = this.state.payList.concat()
        newList.map((e)=>{
           return e.isChosen =false
        })
        item.isChosen = true
        this.setState({
            payList:newList
        })
    }
    selectSex=(item,index)=>{
        const newList = this.state.sexList.concat()
        newList.map((e)=>{
           return e.isChosen =false
        })
        item.isChosen = true
        this.setState({
            sexList:newList
        })
    }
    selectDay=(item,index)=>{
        const newList = this.state.dayList.concat()
        newList.map((e)=>{
           return e.isChosen =false
        })
        item.isChosen = true
        this.setState({
            dayList:newList
        })
    }
    selectBao=(item,index)=>{
        const newList = this.state.baoList.concat()
        newList.map((e)=>{
           return e.isChosen =false
        })
        item.isChosen = true
        this.setState({
            baoList:newList
        })
    }
    getSel=()=> {
        const value = this.state.pickerValue;
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    jian=()=>{
        if(this.state.buyNum==10){
            Toast.fail('至少为10万')
            return
        }
        this.setState({
            buyNum:this.state.buyNum-10
        })
    }
    jia=()=>{
        this.setState({
            buyNum:this.state.buyNum+10
        })
    }
    toBack=()=>{
        this.props.history.goBack()
    }
    dataList = [
        { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
        { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
        { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
        { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
        { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
      ].map(obj => ({
        icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
        title: obj.title,
    }));
    toShare = () => {
        ActionSheet.showShareActionSheetWithOptions({
          options: this.dataList,
          message: '分享到',
        },
        (buttonIndex) => {
          this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
          return new Promise((resolve) => {
            Toast.info('〇ω〇');
            setTimeout(resolve, 1000);
          });
        });
    }
    toBuy=()=>{
        if(!this.props.token){
            this.props.history.push('/userinfos/login')
        }else{
            Toast.success('投保成功~',2,()=>{
                this.props.history.push('/goods/list')
            })
        }
    }

    render() {
        const {payList,sexList,dayList,baoList,buyNum,list}=this.state
        const {selectPay,selectSex,selectDay,selectBao,jian,jia,toBack,toShare,toBuy}=this
        return (
            <>
            {
                list &&

                <div className={styles.goodsDetail}>
                    <header>
                        <i className={classnames('iconfont','icon-fanhui')} onClick={toBack} ></i>
                        <span>{list.local_product_name}</span>
                        <i className={classnames('iconfont','icon-fenxiang1')} onClick={toShare} ></i>
                    </header>
                    <img className={styles.img} src={list.list_img_url_app} alt="" />
                    <div className={styles.age}>
                        <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                            <DatePicker
                                mode="date"
                                title="Select Date"
                                minDate={minDate}
                                maxDate={maxDate}
                                value={this.state.date}
                                onChange={date => this.setState({ date })}
                                >
                                <List.Item arrow="horizontal">出生日期</List.Item>
                            </DatePicker>
                        </List>
                    </div>
                    <div className={styles.pay}>
                        <span className={styles.payWay}>缴费方式：</span>
                        {
                            payList.map((e,i)=>{
                                return(
                                    <span className={classnames(styles.payOne,(e.isChosen ? styles.active : styles.one))} key={i} onClick={ () => selectPay(e,i)} > {e.select} </span>
                                )
                            })
                        }
                    </div>
                    <div className={styles.sex}>
                        <span className={styles.sexWay}>您的性别：</span>
                        {
                            sexList.map((e,i)=>{
                                return(
                                    <span className={classnames(styles.sexOne,(e.isChosen ? styles.active : styles.one))} key={i} onClick={ () => selectSex(e,i)} > {e.select} </span>
                                )
                            })
                        }
                    </div>
                    <div className={styles.day}>
                        <span className={styles.dayWay}>保障期限：</span>
                        {
                            dayList.map((e,i)=>{
                                return(
                                    <span className={classnames(styles.dayOne,(e.isChosen ? styles.active : styles.one))} key={i} onClick={ () => selectDay(e,i)} > {e.select} </span>
                                )
                            })
                        }
                    </div>
                    <div className={styles.adress}>
                        <List style={{ backgroundColor: 'white' }} className="picker-list">
                            <Picker
                            visible={this.state.visible}
                            data={district}
                            value={this.state.pickerValue}
                            onChange={v => this.setState({ pickerValue: v })}
                            onOk={() => this.setState({ visible: false })}
                            onDismiss={() => this.setState({ visible: false })}
                            >
                            <List.Item extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
                                常住地区：
                            </List.Item>
                            </Picker>
                        </List>
                    </div>
                    <div className={styles.how}>
                        <span className={styles.howWay}>保额(单位为万)：</span>
                        <span className={styles.jian} onClick={jian}>-</span>
                        <input type='text' value = {buyNum} readOnly/>
                        <span className={styles.jia} onClick={jia}>+</span>

                    </div>
                    <div className={styles.bao}>
                        <span className={styles.baoWay}>缴费方式：</span>
                        {
                            baoList.map((e,i)=>{
                                return(
                                    <span className={classnames(styles.baoOne,(e.isChosen ? styles.active : styles.one))} key={i} onClick={ () => selectBao(e,i)} > {e.select} </span>
                                )
                            })
                        }
                    </div>
                    <div className={styles.compNane}>
                        本产品由{list.company_short_name}承保并负责理赔
                    </div>
                    <div className={styles.introduce}>
                        产品介绍
                    </div>
                    <div className={styles.tu}>
                        {
                            list.imgList.map((e,i)=>{
                                return(
                                    <img src={e} key={i} alt="" />
                                )
                            })
                        }
                    </div>
                    <footer>
                        <div className={styles.left}>
                            <i className={classnames('iconfont','icon-kefu')} onClick={toShare} ></i>
                            <span>客服</span>
                        </div>
                        <div className={styles.middle}>
                            <span>价格：￥</span>
                            <span>{list.display_price_float}</span>
                        </div>
                        <div className={styles.right} onClick={toBuy}>
                            立即投保
                        </div>
                    </footer>

                </div>

            }
            </>
        )
    }
    componentDidMount(){
        this.setState({
            id: this.props.match.params.id
        },()=>{
            this.reqGoodsDetail()
            console.log(this.state.id)
        })
    }
}

function mapStateToProps(state){
    return {
        token: state.token.token
    }
}

const GoodsDetailContainer = connect(mapStateToProps)(GoodsDetailUI)

export default GoodsDetailContainer