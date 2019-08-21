import React, { Component } from 'react'
import ctx from '@/assets/js/ctx'
import styles from './index.module.scss'
import {withRouter} from 'react-router-dom'
import classnames from 'classnames'


export class GoodsItem extends Component {
    static contextType = ctx



    toDetail(id){
        // 复用组件props对象里没有history，需要调用第三方高阶组件withRouter，修饰此组件，才会有
        this.props.history.push('/goods/detail/' + id)
    }

    render() {
        const {itemInfo} = this.props

        return( 
            <div className={styles.goodsItem} onClick={() => this.toDetail(itemInfo.id)}>
                <img className={styles.left} src={itemInfo.list_img_url_app} alt=""  />

                <div className={styles.right} >
                    <span className={classnames(styles.name,'sl') }>{itemInfo.local_product_name}</span>
                    <span className={classnames(styles.title,'sl')}>{itemInfo.features}</span>

                    <div className={styles.textNum} >
                        <span className={styles.text}>{itemInfo.company_short_name}</span>
                        <span className={styles.num}>已售{itemInfo.product_sales_volume}份</span>
                    </div>
                    <div className={styles.price} >
                        <span>{itemInfo.display_price_float}</span>
                        <span>{itemInfo.display_price_str}</span>
                    </div>

                </div>
            </div>
            
            // <a className={styles.goodsItem} href={itemInfo.url} >
            //     <img className={styles.left} src={itemInfo.list_img_url_app} alt=""  />

            //     <div className={styles.right} >
            //         <span className={classnames(styles.name,'sl') }>{itemInfo.local_product_name}</span>
            //         <span className={classnames(styles.title,'sl')}>{itemInfo.features}</span>

            //         <div className={styles.textNum} >
            //             <span className={styles.text}>{itemInfo.company_short_name}</span>
            //             <span className={styles.num}>已售{itemInfo.product_sales_volume}份</span>
            //         </div>
            //         <div className={styles.price} >
            //             <span>{itemInfo.display_price_float}</span>
            //             <span>{itemInfo.display_price_str}</span>
            //         </div>

            //     </div>
            // </a>
        )
    }

}
export default withRouter(GoodsItem)
