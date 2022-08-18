import { makeAutoObservable } from "mobx";    

export default class HistoryStore {

    constructor() {
        this._history = []
        this._historyDate = []
        this._historyProduct = []
        this._historyAddress = []

        makeAutoObservable(this)

    }

    setHistory(histor) {
        this._history = []
        this._historyDate = []
        this._historyProduct = []
        this._historyAddress = []
        
        histor.map(item => {
            this._history.push(item)
            let dat = JSON.parse(item.date)
            let date = {
                "Дата": `${dat.День}.${dat.Месяц < 10 ? `0${dat.Месяц}` : dat.Месяц}.${dat.Год}. ${dat.Час}:${dat.Минута < 10 ? `0${dat.Минута}`: dat.Минута}`,
            }
            this._historyDate.push(date)
            return null
        })

        histor.map(item => {
            let keys = ['Продукт', 'Количество', 'Цена', 'Скидка']
            let info = JSON.parse(item.info)
            let infoLength = []
            let infoLengt = []
            if (info.length > 1 ) {
                info.map(i => {
                    let obj = {};

                    let infoProduct = [              
                        i.Название,
                        i.Количество,
                        i.Цена,
                        i.Скидка,
                    ]

                    let key = null 
                    let value = null
    
                    for (let i = 0; i <= 3; i++) {
        
                        key = keys[i];
                        value = infoProduct[i];
                        
                        obj[key] = value;
                        
                    }
                    infoLength.push(obj)
                    
                    return null
                })
                this._historyProduct.push(infoLength)
            } else {
                info.map(i => {
                    let obj = {};

                    let infoProduct = [              
                        i.Название,
                        i.Количество,
                        i.Цена,
                        i.Скидка,
                    ]

                    let key = null 
                    let value = null
    
                    for (let i = 0; i <= 3; i++) {
                        key = keys[i];
                        value = infoProduct[i];
                        
                        obj[key] = value;
                    }
                    infoLengt.push(obj)
                    this._historyProduct.push(infoLengt)
                    return null
                })
            }
           
            
            return null
        })

        
        histor.map(item => {
            let addres =  JSON.parse(item.userAddress)
            let userAddress = {
                "Адрес": `${addres.Улица}. ${addres.Дом}`,
                "Подьезд": addres.Подьезд,
                "Этаж": addres.Этаж,
                "Квартира": addres.Квартира,
            }
            this._historyAddress.push(userAddress)
            return null
        })
    }
    setHistoryDate(history) {
        this._historyDate = history
    }
    setHistoryProduct(history) {
        this._historyProduct = history
    }
    setHistoryAddress(history) {
        this._historyAddress = history
    }

    get history () {
        return this._history
    }
    get historyDate () {
        return this._historyDate
    }
    get historyProduct () {
        return this._historyProduct
    }
    get historyAddress () {
        return this._historyAddress
    }
}  