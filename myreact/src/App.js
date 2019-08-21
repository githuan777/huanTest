import React from 'react'; // 引入类库文件
import './App.scss' // 引入当前组件的全局样式
import classnames from 'classnames'

import './App.module.scss'; 

import {Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom' // 引入React的内置组件Route

import routes from './routes.js'


// 定义一个函数，其实也是定义一个组件
function App(props) {

	const pathname = props.location.pathname
	const showNav = /home|(goods\/list)|service|about/.test(pathname)

	const element = (
		<div className="App">
			<Switch>
				<Redirect from="/" to="/home" exact />
				{
					routes.map(e => <Route {...e} />)
				}
			</Switch>

			{/* 导航 */}
			{
				showNav && 
				<div className="nav">

					<NavLink to="/home">
						<i className={classnames('iconfont','icon-home-heart-line')}></i>
						首页
					</NavLink>
					
					<NavLink to="/goods/list">
						<i className={classnames('iconfont','icon-list')}></i>
						找保险
					</NavLink>
				
					<NavLink to="/service">
						<i className={classnames('iconfont','icon-fuwu')}></i>
						享服务
					</NavLink>
				
					<NavLink to="/about">
						<i className={classnames('iconfont','icon-wode')}></i>
						我的
					</NavLink>
					
				</div>
			}
			
		</div>
	)

	// 导出一个React元素
	return element
}

// 导出这个组件
export default withRouter(App);
