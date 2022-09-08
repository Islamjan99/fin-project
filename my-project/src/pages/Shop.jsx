import React, { useContext, useEffect } from 'react'
import style from './Shop.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchDevices, fetchFloors, fetchTypes } from '../Http/DeviceAPI'
import slide1 from './Group 150.png'
import slide2 from './Group 297.png'
import slide3 from './Group 157.png'
import slide4 from './Group 298.png'

const Shop = observer(() => {
	const { device } = useContext(Context)
	const sliders = [
		{ img: slide1, brand: 'american vintage' },
		{ img: slide2, brand: 'george gina lucy' },
		{ img: slide3, brand: 'DEHA' },
		{ img: slide4, brand: 'birkenstock' },
	]

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchFloors().then(data => device.setFloors(data))
		fetchDevices(null, null, 1, 2).then(data => {
			device.setDevices(data.rows)
			device.setTotalCount(data.count)
		})
	})

	useEffect(() => {
		fetchDevices(
			device.selectedType.id,
			// device.selectedFloors.id,
			device.page,
			2
		).then(data => {
			device.setDevices(data.rows)
			device.setTotalCount(data.count)
		})
	}, [device, device.page, device.selectedType, device.selectedFloors])

	return (
		<div className={style.shop__wrapper}>
			<div className={style.shop__back}>asd</div>
			<div className={style.shop__slider}>
				<img src={slide1} alt='image slider' />
			</div>
		</div>
	)
})

export default Shop
