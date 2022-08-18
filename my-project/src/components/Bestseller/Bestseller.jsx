import React, { useContext, useState } from 'react'
import { Context } from '../..'
import style from '../DeviceList/StyleItem.module.css'
import DeviceModals from '../../store/DeviceModals'
import DeviceItem from '../DeviceList/DeviceItem'
import { observer } from 'mobx-react-lite'

const Bestseller = observer(() => {
	const { device } = useContext(Context)
	const [smShow, setSmShow] = useState(false)
	const [addGood, setAddGood] = useState(false)

	const data = []

	const log = () => {
		if (localStorage.getItem('favorites') !== null) {
			let prod = JSON.parse(localStorage.getItem('favorites'))
			data.push(prod)
			console.log('deviceList')
		}
	}
	log()

	const addFavorites = device => {
		setTimeout(() => {
			data.push(device)
		}, 500)

		chek(device)
	}

	const chek = device => {
		if (localStorage.getItem('favorites') !== null) {
			let storage = JSON.parse(localStorage.getItem('favorites'))
			storage.map(item => {
				if (item.id !== device.id) {
					addLocal(device)
				} else {
					removeLocalStorage(device)
				}
				return item
			})
		} else {
			setTimeout(() => {
				localStorage.setItem('favorites', JSON.stringify(data))
			}, 600)
		}
	}

	const addLocal = () => {
		setTimeout(() => {
			localStorage.setItem('favorites', JSON.stringify(data))
		}, 600)
	}

	const removeLocalStorage = device => {
		for (let step = 0; step < data.length; step++) {
			data.map((item, index) => {
				if (item.id === device.id) {
					data.splice(index, 1)
				}

				return item
			})

			addLocal(device)

			if (data.length < 1) {
				localStorage.removeItem('favorites')
			}
			console.log(data)
		}
	}

	//  избранное
	let so = []

	const addBasket = devic => {
		if (device.basket !== '') {
			device.basket.map(i => so.push(i))
			check(devic)
			return
		} else {
			device.addBasket(devic)
			setAddGood(true)
			modalPanel()
			return
		}
	}

	let itemID = false
	let PM = true

	const check = devic => {
		if (so !== null) {
			so.map(item => {
				if (item.id === devic.id) {
					itemID = true
					PM = false
				} else {
					itemID = false
				}
				return so
			})
		}

		if (itemID === false) {
			if (PM === true) {
				device.addBasket(devic)
				setAddGood(true)
				modalPanel(devic)
				PM = true
			} else {
				setAddGood(false)
				modalPanel()
			}
		} else {
			setAddGood(false)
			modalPanel()
		}
		so = [1]
	}

	// Оповещение о добавление продукта

	const modalPanel = () => {
		setTimeout(() => {
			setSmShow(true)
		}, 200)

		setTimeout(() => {
			setSmShow(false)
		}, 2000)
	}

	return (
		<div className={style.container}>
			<div className={style.product__block}>
				{device.devicees.map(device =>
					device.categoryId === 1 ? (
						<>
							<DeviceItem
								key={device.id}
								device={device}
								addFavorites={addFavorites}
								removeLocalStorage={removeLocalStorage}
								smShow={smShow}
								setSmShow={setSmShow}
								addGood={addGood}
								addBasket={addBasket}
							/>
						</>
					) : (
						''
					)
				)}
			</div>
			<DeviceModals
				smShow={smShow}
				setSmShow={setSmShow}
				addGood={addGood}
				device={device}
			/>
		</div>
	)
})

export default Bestseller
