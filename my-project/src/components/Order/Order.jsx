import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './Order.module.css'
import { createHistoryOrder, getOrder } from '../../Http/DeviceAPI'
import axios from 'axios'
import OrderModals from './OrderModals'

export default function Order() {
    const { device } = useContext(Context)
    const { user } = useContext(Context)
    const [ agr, setAgr ] = useState(false)
    const [ check, setCheck ] = useState(false)
    const [ handleChange, setHandleChange ] = useState(false)
    const [ smShow, setSmShow] = useState(false);
    
    let orderNum = device.OrderHistory.length + 1;
    // Адрес
    const [ street, setStreet] = useState()
    const [ houseNumber, sethouseNumber ] = useState()
    const [ entrance, setEntrance ] = useState()
    const [ floor, setFloor ] = useState()
    const [ apartmentNumber, setApartmentNumber ] = useState()
    // 
    const [ name, setName ] = useState(user.users.name)
    const [ lastName, setLastName ] = useState(user.users.lastName)
    const [ phone, setPhone ] = useState(user.users.phone)
    const [ email, setEmail ] = useState(user.users.email)

    let productTG = []
    let product = []
    let createAddress = {}

    const finalPrice = []
    const [ b, setB] = useState()

    let a = []
    let x = 0

    let date = new Date();
    let AddDate = {}
    let month = date.getMonth()
    let hours = date.getHours()
    let minutes = date.getMinutes()


    useEffect(() => {
        AddDate = {
            "День": date.getDate(),
            "Месяц": month +=1,
            "Год": date.getFullYear(),
            "Час": hours,
            "Минута": minutes
        }
        getOrder().then(data => device.setOrderHistory(data))
        finPrice()
        prod()
    })

    const saveAddress = () => {
        if (street === '') {
            setStreet('Не указан')
        }
        if (houseNumber === '') {
            sethouseNumber('Не указан')
        } 
        if (entrance === '') {
            setEntrance('Не указан')
        } 
        if (floor === '') {
            setFloor('Не указан')
        } 
        if (apartmentNumber === '') {
            setApartmentNumber('Не указан')
        } 
        
        createAddress = {
            'Улица': street !== undefined ? street : 'Не указан',
            'Дом': houseNumber !== undefined ? houseNumber : 'Не указан',
            'Подьезд': entrance !== undefined ? entrance : 'Не указан',
            'Этаж': floor !== undefined ? floor : 'Не указан',
            'Квартира': apartmentNumber !== undefined ? apartmentNumber : 'Не указан',
        }
    }

    const prod = () => {
        product = []
        productTG = []
        device.basket.map(item => {
            let tovar = `%0A Продукт: %0A Название: ${item.name}, ${item.discount >= 1 ? `%0A  Цена с учётом скидки: ${item.prices}` : `%0A  Цена: ${item.prices}`}, %0A Количество: ${item.count}, ${item.discount >= 1 ? ` %0A Скидка на товар ${item.discount}% %0A`: ''}`
            let TG = {
                'Название': item.name,
                'Количество': item.count,
                'Цена': item.prices,
                'Скидка': `${item.discount}%`
            }
            product.push(tovar)
            productTG.push(TG)

        })
    }

    const agree = () => {
        setAgr(!agr)
    }

    const finPrice = () => {
        device.basket.map(item => finalPrice.push(item.price))

        a.push(finalPrice.map(i=>x+=i, x=0).reverse()[0])
        
        a.map((number) => setB(number))
    }

    const toggle = () => {
        setCheck(!check)
    }
    const checks = () => {
        if (name !== undefined) {
            if (phone !== undefined) {
                addOrger()
            } else {
                alert('Пожалуйста введите ваш сотовой номер')
            }
        } else {
            alert('Пожалуйста введите ваше имя')
        }
    }

    const addOrger = () => {
        prod()
        saveAddress()

        const formData = new FormData()

        if (user.users.id !== null) {
            formData.append('userId', user.users.id)
        } else {
            formData.append('userId', 0)
        }
        
        formData.append('info', JSON.stringify(productTG))
        formData.append('date',  JSON.stringify(AddDate))
        formData.append('userName', name)
        formData.append('userLastName', lastName)
        formData.append('userEmail', email)
        if (agr !== false) {
            formData.append('userAddress', JSON.stringify(createAddress))
        } else {
            formData.append('userAddress', 'Самовывоз')
        }
        formData.append('userPhone', phone)
        formData.append('OrderNumber', orderNum)

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' +  pair[1]); 
        }

        createHistoryOrder(formData)
        
        axios.post(`${process.env.REACT_APP_API_URL_POST}
                %0A Заказ:  №: ${orderNum}
                %0A Имя: ${name}
                %0A Фамилия: ${lastName}
                %0A Телефон: ${phone}
                %0A Email: ${email}
                %0A Заказаный товар: %0A ${JSON.stringify(product)}
                %0A Доставка: ${handleChange 
                ? `
                %0A Улица: ${street !== undefined ? street : 'Не указан'}
                %0A дом: ${houseNumber !== undefined ? houseNumber : 'Не указан'}
                %0A Подъезд: ${entrance !== undefined ? entrance : 'Не указан'}
                %0A Этаж: ${floor !== undefined ? floor : 'Не указан'}
                %0A Квартира: ${apartmentNumber !== undefined ? apartmentNumber : 'Не указан'}
                `:  
                'Самовывоз'
            }`)
            setSmShow(true)
            
    }

    
    return (
        <div className={style.container}>
            <center>
                <h2>Подтверждение заказа №: {device.OrderHistory.length + 1}</h2>
                <h3>Пожауйста проверти данные</h3>
            </center>
            <div className={style.order__block}>

                <div className={style.block__data}>
                    <h3 className={style.h3}>Личные данные</h3>
                    <div className={style.order__form}>
                        
                        <div className={style.personal__data}>
                            <div className={style.block}>
                                <div className={style.order__inp}>
                                    <p className={style.name}>Имя</p> <p>(обязательно)</p>
                                    <input 
                                        className={style.inp}  
                                        type="text" 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    /> 
                                </div>
                                <div className={style.order__inp}>
                                    <p className={style.name}>Фамилия </p> <p>(обязательно)</p>
                                    <input 
                                        className={style.inp}  
                                        type="text" 
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    /> 
                                </div>
                            </div>
                            <div className={style.block}>
                                <div className={style.order__inp}>
                                    <p className={style.email}>E-mail</p>
                                    <input 
                                        className={style.inp} 
                                        type="text" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={style.order__inp}>
                                    <p className={style.name}>Номер телефона</p> <p>(обязательно)</p>
                                    <input 
                                        className={style.inp} 
                                        type="number" 
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                Доставка <input type="checkbox" onClick={agree} onChange={e => setHandleChange(e.target.checked)}/>

                                    <div className={style.p}>
                                        <p  className={style.pod}>
                                            Согласен получитить <br /> 
                                            товар без точной даты  <br />
                                            (Для заказа вам не обходимо поставить галочку)
                                        </p> 
                                        <input 
                                            onClick={() => toggle()} 
                                            className={style.i} 
                                            type="checkbox"
                                        /> 
                                    </div>

                                    <p>(Ваш заказ будет подтвержден <br />  менеджером по телефону <br />  в течение суток)</p>

                            </div>
                        </div>

                        <div className={style.delivery__form}>
                            <div>
                                
                                {
                                    agr 
                                    ? 
                                    <div className={style.delivery__inp}>
                                        <h5> Введите адрес доставки</h5>
                                        
                                        <p className={style.line__info}>Улица</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setStreet(e.target.value)}
                                            value={street} 
                                            type="text" 
                                            placeholder="Введите улицу"
                                        />

                                        <p className={style.line__info}>Номер дома</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => sethouseNumber(e.target.value)}
                                            value={houseNumber} 
                                            type="text" 
                                            placeholder="Введите номер дома"
                                        />

                                        <p className={style.line__info}>Подъезд</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setEntrance(e.target.value)}
                                            value={entrance} 
                                            type="text" 
                                            placeholder="Введите подьезд квартиры"
                                        />

                                        <p className={style.line__info}>Этаж</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setFloor(e.target.value)}
                                            value={floor} 
                                            type="text" 
                                            placeholder="Введите этаж квартиры "
                                        />

                                        <p className={style.line__info}>Номер квартиры</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setApartmentNumber(e.target.value)}
                                            value={apartmentNumber} 
                                            type="text" 
                                            placeholder="Введите номер квартиры"
                                        />

                                        <p className={style.p}>(Стоимость доставки менеджер озвучит при подтвержении заказа)</p>
                                        <button onClick={saveAddress}>подтвертить адрес</button>
                                    </div>
                                    : 
                                    ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.order__product}>
                    <div>
                        <h3 className={style.h3}>Подробности заказа</h3>
                        
                    </div>
                    <div className={style.order__info}>
                        <div>
                            <p className={style.linen}>Название, количество, цена продукта</p>
                        </div>
                        
                        <div className={style.block__prod}>
                            {device.basket.map(item => 
                                <> 
                                    <p>Название: {item.name}</p> 
                                    <p>Количество: {item.count} шт.</p>
                                    <p>Цена: {item.prices} KGS 1 ед.</p>
                                    <div className={style.line}> </div>
                                </>
                            )}
                        </div>
                        <h4 className={style.h4}>Итоговая сумма заказа </h4>
                        <h4 className={style.sum}>{b} KGS</h4>
                        {
                            check ? 
                                <div className={style.block__order}>
                                    <button onClick={() => checks()} className={style.btn__order}>заказать</button>
                                </div>
                            : 
                                ""
                        }
                        
                    </div>
                </div>
            <OrderModals
                smShow={smShow}
                setSmShow={setSmShow}
            />
        </div>
    )
}
