import React, { useEffect, useContext, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useLocation } from 'react-router-dom'
import P from '../UI/P'
import {
	BESTSELLE_ROUTER,
	BRAND_ROUTE,
	CATALOG_ROUTE,
	DEVICE_ALL,
	DISCOUNTS_BROUTER,
	NEW_PRODUCT_ROUTER,
	SETS_ROUTER,
	US_ROUTE,
} from '../../Utils/Consts'
import { Context } from '../../index'
import Search from '../Search/Search'
import ChangeLanguage from '../ChanchLang/ChangeLanguage'
import Img from '../UI/Img'
import cadinet from './cabinet.svg'
import favorites from './favorites.svg'
import basket from './basket.svg'

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false)
	const [inp, setInp] = useState('')
	const { device } = useContext(Context)
	const location = useLocation()
	const us = location.pathname === US_ROUTE
	const brand = location.pathname === BRAND_ROUTE
	const deviceAll = location.pathname === DEVICE_ALL
	const catalog = location.pathname === CATALOG_ROUTE

	const bestseller = location.pathname === BESTSELLE_ROUTER
	const discounts = location.pathname === DISCOUNTS_BROUTER
	const sets = location.pathname === SETS_ROUTER
	const new_product = location.pathname === NEW_PRODUCT_ROUTER

	const onIsOpen = () => {
		setIsOpen(true)
	}

	useEffect(() => {}, [isOpen])

	return (
		<div className={style.navBar__wrapper}>
			<div className={style.navBar__container}>
				<div className={style.navBar__block}>
					<Link to={'/women'}>
						<P
							style={{
								fontWeight: '400',
								fontSize: '16px',
								lineHeight: '22px',
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								color: location.pathname === '/women' ? '#0F303F' : '#B7C1C5',
							}}
						>
							Женщины
						</P>
					</Link>

					<Link to={'./men'}>
						<P
							style={{
								fontWeight: '400',
								fontSize: '16px',
								lineHeight: '22px',
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								color: location.pathname === '/men' ? '#0F303F' : '#B7C1C5',
							}}
						>
							Мужчины
						</P>
					</Link>
				</div>
				<div className={style.serach__block}>
					<div className={style.inp__block}>
						<P
							style={{
								fontWeight: '400',
								fontSize: '16px',
								lineHeight: '22px',
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								color: '#0F303F',
							}}
						>
							Поиск
						</P>
						<input
							className={style.inp}
							type='text'
							placeholder='___________________'
							onChange={e => setInp(e.target.value)}
							onClick={() => onIsOpen()}
						/>
						<div className={style.inp__img}></div>
						<div className={isOpen ? style.search : ''}>
							<Search
								inp={inp}
								setInp={setInp}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
							/>
						</div>
					</div>
				</div>
				<div>
					<ChangeLanguage />
				</div>
				<div className={style.navBar__nav}>
					<Link to={'/login'}>
						<Img
							style={{ width: '22px', height: '16px' }}
							src={cadinet}
							alt={'icon account'}
						/>
					</Link>
					<Link to={'/favorites'}>
						<Img
							style={{ width: '22px', height: '16px' }}
							src={favorites}
							alt={'icon favorites'}
						/>
					</Link>
					<Link to={'/basket'}>
						<Img
							style={{ width: '22px', height: '16px' }}
							src={basket}
							alt={'icon basket'}
						/>
					</Link>
				</div>
			</div>
		</div>
	)
}
