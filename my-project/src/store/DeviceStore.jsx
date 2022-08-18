import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._categorys = []
        this._devices = []
        this._pages = 1
        this._devicees = []
        this._skins = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        this._basket = []
        this._orderHistory = []
        this._discountProduct = []
        
        makeAutoObservable(this)
    } 
    

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setCategorys(category) {
        this._categorys = category
    }
    setDevices(devices) {
        this._devices = devices
    }
    setDevicesPush(prod) {
        this._devices.push(prod)
    }
    setDevicees(devicees) {
        this._devicees = devicees
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSkinType(skins) {
        this._selectedType = skins
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setSelectedCategory(category) {
        this._selectedCategory = category
    }
    setPage(page) {
        this._page = page
    }
    setPages(pages) {
        this._pages = pages
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    basketRemove(id) {
        this._basket = []
    }
    addBasket(basket) {
        this._basket.push(basket)
        this._basket.map(item => item.count = 1)
        this._basket.map(item => item.prices = item.price)
        // basket.discount >= 1 ba
    }
    basketIncrement (produ) {
        this._basket.map(item  => {
            if (item.id === produ.id) {
                if (item.count <= 4) {
                    item.price += item.prices
                    item.count ++
                }
            }
            return this._basket
        });
    }
    basketDecrement(produ) {
        this._basket.map(item  => {
            if (item.id === produ.id) {
                if (item.count !== 1) {
                    item.price -= item.prices
                    item.count --
                }
            }
            return this._basket
        });
    }
    removeProduct ( id, basket ) {
        this._basket = this._basket.filter(i => i.id !== id)   
    }
    setOrderHistory(data) {
        this._orderHistory = data
    }
    setDiscountProd() {
        this._devices.map(i => {
            if (i.discount >= 1) {
                let item = (i.price / 100) * i.discount
                let itemPrice = Math.floor(i.price - item)
                i.price = itemPrice
                this._discountProduct.push(i)
                console.log(i);
            }
            return null
        })
    }
    getDiscountProd(prod) {
        this._discountProduct.push(prod)
        this._devices.push(prod)
    }
    get types () {
       return this._types
    }
    get brands () {
        return this._brands
    }
    get categorys () {
        return this._categorys
    }
    get devices () {
        return this._devices
    }
    get devicees () {
        return this._devicees
    }
    get selectedType () {
        return this._selectedType
    }
    get skinType () {
        return this._skins
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get pages() {
        return this._pages
    }
    get limit() {
        return this._limit
    }
    get idProduct() {
        return this._idProduct
    }
    get basket() {
        return this._basket
    }
    get basketClone() {
        return this._basketClone
    }
    get OrderHistory() {
        return this._orderHistory
    }
    get discountProd() {
        return this._discountProduct
    }
}