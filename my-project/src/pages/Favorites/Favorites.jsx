import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './Favorites.module.css'
import { useHistory } from 'react-router-dom'
import { DEVICE_ROUTE } from '../../Utils/Consts'

const Favorites = observer(() => {
	const history = useHistory()
	const { device } = useContext(Context)
	const { favorites } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('favorites') != null) {
			favorites.getLocalFavorites()
		}
	}, [device])

	const removeItem = product => {
		favorites.removeItem(product)
	}

	const log = () => {
		console.log(favorites.favorites)
	}

	return (
		<div className={style.container}>
			<center>
				<h2>Избранное</h2>
			</center>
			<button onClick={() => log()}>log </button>
			<div className={style.block__item}>
				{favorites.favorites !== undefined
					? favorites.favorites.map(product => {
							return (
								<div key={product.id} className={style.item}>
									<div
										style={{ width: 200 }}
										border={'light'}
										onClick={() =>
											history.push(DEVICE_ROUTE + '/' + product.id + '/')
										}
									>
										<img
											className={style.item_img}
											style={{ cursor: 'pointer' }}
											width={200}
											height={200}
											src={process.env.REACT_APP_API_URL + product.img}
											alt=''
										/>
										<div className={style.art}>
											Артикул товара: 0000{product.id}
										</div>
									</div>
									<div className={style.block__name}>
										<div>{product.name}</div>
									</div>
									<div>
										{product.discount >= 1 ? (
											<div className={style.block__price}>
												<p className={style.discountPrice}>
													{product.discountPrice} Сом
												</p>
												<p className={style.prices}>{product.prices} Сом</p>
												<p className={style.discount}>{product.discount}%</p>
											</div>
										) : (
											<div className={style.block__price}>
												<p className={style.price}>{product.price} Сом</p>
											</div>
										)}
									</div>
									<div className={style.remove}>
										<button
											onClick={() => removeItem(product)}
											className={style.remove__btn}
											key={product.id}
										>
											Удалить
										</button>
									</div>
								</div>
							)
					  })
					: ''}
			</div>
		</div>
	)
})

export default Favorites
