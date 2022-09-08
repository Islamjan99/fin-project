import React, { useContext, useEffect, useState } from 'react'
import style from './Catalog.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import DeviceList from '../DeviceList/DeviceList'
import { fetchDevices, fetchTypes } from '../../Http/DeviceAPI'
import Pagin from '../Pagin'
import { useLocation } from 'react-router-dom'
import P from '../UI/P'

const Catalog = observer(() => {
	const locations = useLocation()
	const [location, setLocation] = useState()
	const { device } = useContext(Context)
	const [categorys, setCategorys] = useState([])
	const [product, setProduct] = useState([])

	const getInfo = () => {
		console.log(device.categorys)
	}

	useEffect(() => {
		setLocation(locations.pathname)

		getInfo()
	}, [])

	return (
		<div className={style.container}>
			<div className={style.categoryBar}>
				{device.categorys.map(item => {
					return <P>{item.name}</P>
				})}
			</div>
			<div className={style.typeBar}>
				{device.types.map(item => {
					return <P>{item.name}</P>
				})}
			</div>
			<Pagin />
		</div>
	)
})

export default Catalog
