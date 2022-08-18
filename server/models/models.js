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
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	rating: { type: DataTypes.INTEGER, defaultValue: 5 },
	discount: { type: DataTypes.INTEGER, defaultValue: 0 },
	img: { type: DataTypes.STRING, allowNull: false },
})

const Category = sequelize.define('category', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Type = sequelize.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Brand = sequelize.define('brand', {
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

const TypeBrand = sequelize.define('type_brand', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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

Category.hasMany(Type)
Type.belongsTo(Category)

Type.hasMany(Device)
Device.belongsTo(Type)

Category.hasMany(Device)
Device.belongsTo(Category)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, { as: 'info' })
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
	User,
	Basket,
	BasketDevice,
	Device,
	Type,
	Brand,
	Rating,
	TypeBrand,
	DeviceInfo,
	History,
	Category,
}