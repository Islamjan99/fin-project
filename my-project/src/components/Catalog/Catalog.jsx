import React, { useContext, useEffect, useState } from 'react'
import style from './Catalog.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import DeviceList from '../DeviceList/DeviceList'
import { fetchDevices, fetchTypes } from '../../Http/DeviceAPI'
import Pagin from '../Pagin'
import { useLocation } from 'react-router-dom'

const Catalog = observer(() => {
	const location = useLocation()
	const { device } = useContext(Context)
	const [product, setProduct] = useState()
	useEffect(() => {
		setProduct(location.pathname)
	}, [])

	return (
		<div className={style.container}>
			<div className={style.typeBar}>
				<Pagin />
			</div>
		</div>
	)
})

export default Catalog
