import { $authHost, $host } from './index'

export const fetchFloors = async () => {
	const { data } = await $host.get('api/floor')
	return data
}
export const createCategory = async category => {
	const { data } = await $authHost.post('api/category', category)
	return data
}

export const fetchCategorys = async () => {
	const { data } = await $host.get('api/category')
	return data
}

export const createType = async type => {
	const { data } = await $authHost.post('api/type', type)
	return data
}

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type')
	return data
}

export const createDevice = async device => {
	const { data } = await $authHost.post('api/device', device)
	return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
	const { data } = await $host.get('api/device', {
		params: {
			typeId,
			brandId,
			page,
			limit,
		},
	})
	console.log(data)
	data.rows.map(i => {
		if (i.discount >= 1) {
			let item = (i.price / 100) * i.discount
			let itemPrice = Math.floor(i.price - item)
			i.prices = i.price
			i.pricee = i.price
			i.price = itemPrice
			i.discountPrice = i.price
		}
		return null
	})
	return data
}

export const fetchDevicees = async (page, limit = 9) => {
	const { data } = await $host.get('api/device/all', {
		params: { page, limit },
	})

	data.rows.map(i => {
		i.prices = i.price
		if (i.discount >= 1) {
			let item = (i.price / 100) * i.discount
			let itemPrice = Math.floor(i.price - item)
			i.prices = i.price
			i.pricee = i.price
			i.price = itemPrice
			i.discountPrice = i.price
		}
		return null
	})
	return data
}

export const fetchOneDevice = async id => {
	const { data } = await $host.get(`api/device/${id}`)
	return data
}
export const createHistoryOrder = async formData => {
	try {
		const { data } = await $host.post('api/his/history', formData)
		return data
	} catch (e) {
		console.log(e.message)
	}
}
export const fetchHistory = async () => {
	const { data } = await $host.get('api/his/history')
	return data
}

export const getOrder = async () => {
	const { data } = await $host.get('api/his/history')
	return data
}
