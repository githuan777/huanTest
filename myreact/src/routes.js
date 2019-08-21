// 引入各种路由组件
import Service from './views/Service'
import About from './views/About'
import Home from './views/Home'
import Search from './views/Search'
import GoodsList from './views/GoodsList'
import GoodsDetail from './views/GoodsDetail'
import Register from './views/Register'
import Login from './views/Login'
import Error from './views/Error'

const routes = [
    {
        path:'/home',
        key:'home',
        component:Home,
    },
    {
        path:'/search',
        key:'search',
        component:Search,
    },
    {
        path:'/goods/list',
        key:'goodslist',
        component:GoodsList,
    },
    {
        path:'/goods/detail/:id',
        key:'goodsdetail',
        component:GoodsDetail,
    },
    {
        path:'/userinfos/register',
        key:'register',
        component:Register,
    },
    {
        path:'/userinfos/login',
        key:'login',
        component:Login,
    },
    {
        path:'/service',
        key:'service',
        component:Service
    },
    {
        path:'/about',
        key:'about',
        component:About
    },
    {
        path:'',
        key:'error',
        component:Error
    }
]

export default routes
