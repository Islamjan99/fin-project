const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	phone: { type: DataTypes.STRING },
	name: { type: DataTypes.STRING },
	lastName: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: 'USER' },
	img: { type: DataTypes.STRING, allowNull: true, defaultValue: 'empty' },
	percent: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
})

const Basket = sequelize.define('basket', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevice = sequelize.define('basket_device', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Device = sequelize.define('device', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: false, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	rating: { type: DataTypes.INTEGER, defaultValue: 5 },
	discount: { type: DataTypes.INTEGER, defaultValue: 0 },
	img: { type: DataTypes.STRING, allowNull: false },
	typeId: { type: DataTypes.INTEGER, allowNull: false },
	categoryId: { type: DataTypes.INTEGER, allowNull: false },
	floorId: { type: DataTypes.INTEGER, allowNull: false },
})

const Category = sequelize.define('category', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: false, allowNull: true },
	floorId: { type: DataTypes.STRING, unique: false, allowNull: true },
})

const Type = sequelize.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: false, allowNull: false },
	categoryId: { type: DataTypes.STRING, unique: true, allowNull: true },
})

const Floor = sequelize.define('floor', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	rate: { type: DataTypes.INTEGER, allowNull: false },
})

const DeviceInfo = sequelize.define('device_info', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
})

const History = sequelize.define('History', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	info: { type: DataTypes.STRING, allowNull: false },
	date: { type: DataTypes.STRING, allowNull: false },
	userName: { type: DataTypes.STRING, allowNull: false },
	userLastName: { type: DataTypes.STRING, allowNull: false },
	userEmail: { type: DataTypes.STRING, allowNull: false },
	userAddress: { type: DataTypes.STRING, allowNull: false },
	userPhone: { type: DataTypes.INTEGER, allowNull: false },
	OrderNumber: { type: DataTypes.INTEGER, allowNull: false },
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(History)
History.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Category.hasMany(Device)
Device.belongsTo(Category)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, { as: 'info' })
DeviceInfo.belongsTo(Device)

module.exports = {
	User,
	Basket,
	BasketDevice,
	Device,
	Type,
	Floor,
	Rating,
	DeviceInfo,
	History,
	Category,
}
