import React, { useContext, useEffect, useState } from 'react'
import style from './Header.module.css'
import NavBar from '../NavBar/NavBar'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import {
	ADMIN_PANEL_ROUTE,
	BASKET_ROUTE,
	CABINET_ROUTER,
	FAVORITES_ROUTE,
	LOGIN_ROUTE,
} from '../../Utils/Consts'
import {
	fetchCategorys,
	fetchDevicees,
	fetchDevices,
	fetchFloors,
	fetchTypes,
} from '../../Http/DeviceAPI'
import { authuser, getRole } from '../../Http/UserAPI'
import Search from '../Search/Search'
import Img from '../UI/Img'
import logo from './Group.svg'

const Header = observer(() => {
	const history = useHistory()
	const { user } = useContext(Context)
	const { device } = useContext(Context)
	const { History } = useContext(Context)
	const [roles, setRoles] = useState()
	const [userInfo, setUserInfo] = useState()
	const [isOpen, setIsOpen] = useState(false)
	const [inp, setInp] = useState('')

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchCategorys().then(data => device.setCategorys(data))
		fetchFloors().then(data => device.setFloors(data))
		getRole().then(data => user.setRoleToken(data.token))
		fetchDevicees().then(data => device.setDevicees(data.rows))
		fetchDevices(device.page, 9).then(data => {
			device.setDevicees(data.rows)
		})
	}, [device, device.page, device.selectedType])

	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			user.setUsers()
			authuser(user.users.id).then(data => setUserInfo(data))
			setRoles(user.users.role)
		}
		if (localStorage.getItem('favorites') !== null) {
		}
	}, [user])

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
		delete localStorage.token
		delete localStorage.image
	}

	const test = async () => {
		setRoles(user.users.role)
	}
	const basketRoute = () => {
		history.push(BASKET_ROUTE)
	}
	const favoritesRoute = () => {
		history.push(FAVORITES_ROUTE)
	}

	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			test()
			user.getUsersId(userInfo)
		}
	})

	const onIsOpen = () => {
		setIsOpen(true)
	}

	return (
		<div className={style.header__wrapper}>
			<div className={style.header__container}>
				<div className={style.logo}>
					<Link to={'/'}>
						<Img src={logo} alt='LOGO' />
					</Link>
				</div>
				<NavBar />
			</div>
		</div>
	)
})

export default Header
