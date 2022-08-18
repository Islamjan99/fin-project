import AdminPanel from './pages/Admin/AdminPanel'
import Admin from './pages/Admin/Admin'
import {
	ADMIN_PANEL_ROUTE,
	ADMIN_ROUTE,
	BASKET_ROUTE,
	BESTSELLE_ROUTER,
	BRAND_ROUTE,
	CABINET_ROUTER,
	CREATE_BRAND_ROUTE,
	CREATE_DEVICE_ROUTE,
	CREATE_TYPE_ROUTE,
	DEVICE_ALL,
	DEVICE_ROUTE,
	DISCOUNTS_BROUTER,
	FAVORITES_ROUTE,
	HISTORY_ROUTER,
	LOGIN_ROUTE,
	MEN_ROUTER,
	NEW_PRODUCT_ROUTER,
	REGISTRATION_ROUTE,
	SEARCH_ROUTE,
	SENDING__AN_ORDER_ROUTER,
	SETS_ROUTER,
	SHOP_ROUTE,
	US_ROUTE,
	WOMEN_ROUTER,
} from './Utils/Consts'

import Basket from './pages/Basket/Basket'
import Shop from './pages/Shop'
import Auth from './pages/Auth'
import DevicePage from './pages/DevicePage/DevicePage'
import Catalog from './components/Catalog/Catalog'
import BrandBar from './components/BrandBar/BrandBar'
import createDeivce from './components/Modals/CreateDevice'
import createType from './components/Modals/CreateType'
import createBrand from './components/Modals/CreateBrand'
import DeviceAll from './components/DeviceList/DeviceAll'
import Search from './components/Search/Search'
import Favorites from './pages/Favorites/Favorites'
import Order from './components/Order/Order'
import Cabinet from './components/Cabinet/Cabinet'
import History from './components/Cabinet/History/History'
import InfoUs from './components/InfoUS/InfoUs'
import Bestseller from './components/Bestseller/Bestseller'
import Discounts from './components/Discounts/Discounts'
import Sets from './components/Sets/Sets'
import NewProduct from './components/NewProduct/NewProduct'

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
	{
		path: ADMIN_PANEL_ROUTE,
		Component: AdminPanel,
	},
	{
		path: CREATE_DEVICE_ROUTE,
		Component: createDeivce,
	},
	{
		path: CREATE_TYPE_ROUTE,
		Component: createType,
	},
	{
		path: CREATE_BRAND_ROUTE,
		Component: createBrand,
	},
	{
		path: CABINET_ROUTER,
		Component: Cabinet,
	},
	{
		path: HISTORY_ROUTER,
		Component: History,
	},
]

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Shop,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: BRAND_ROUTE,
		Component: BrandBar,
	},
	{
		path: DEVICE_ROUTE + '/:id',
		Component: DevicePage,
	},
	{
		path: DEVICE_ALL,
		Component: DeviceAll,
	},
	{
		path: SEARCH_ROUTE,
		Component: Search,
	},
	{
		path: BASKET_ROUTE,
		Component: Basket,
	},
	{
		path: FAVORITES_ROUTE,
		Component: Favorites,
	},
	{
		path: SENDING__AN_ORDER_ROUTER,
		Component: Order,
	},
	{
		path: US_ROUTE,
		Component: InfoUs,
	},
	{
		path: BESTSELLE_ROUTER,
		Component: Bestseller,
	},
	{
		path: DISCOUNTS_BROUTER,
		Component: Discounts,
	},
	{
		path: SETS_ROUTER,
		Component: Sets,
	},
	{
		path: NEW_PRODUCT_ROUTER,
		Component: NewProduct,
	},
	{
		path: MEN_ROUTER,
		Component: Catalog,
	},
	{
		path: WOMEN_ROUTER,
		Component: Catalog,
	},
]
