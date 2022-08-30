import React, { useContext, useEffect, useState } from 'react'
import style from './Catalog.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import DeviceList from '../DeviceList/DeviceList'
import { fetchDevices, fetchTypes } from '../../Http/DeviceAPI'
import Pagin from '../Pagin'
import { useLocation } from 'react-router-dom'

const Catalog = observer(() => {
	const locations = useLocation()
	const [location, setLocation] = useState()
	const { device } = useContext(Context)
	const [categorys, setCategorys] = useState([])
	const [product, setProduct] = useState([])

	const getInfo = () => {
		setCategorys(device.categorys)
		console.log(device.categorys)
	}

	useEffect(() => {
		setLocation(locations.pathname)
		if (categorys.length < 1) {
			getInfo()
		}
	}, [categorys])

	return (
		<div className={style.container}>
			<div className={style.typeBar}>
				<Pagin />
			</div>
		</div>
	)
})

export default Catalog
