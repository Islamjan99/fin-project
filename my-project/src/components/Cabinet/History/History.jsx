import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../..'
import style from './History.module.css'
import { observer } from 'mobx-react-lite'
import { fetchHistory } from '../../../Http/DeviceAPI'

const History = observer(() => {
    const { History } = useContext(Context)
    const { user } = useContext(Context)
    const [ userId, setUserId] = useState()
    const [ role, setRole ] = useState()

    
    let historyDate = []
    const sum = []

    useEffect(() => {
        fetchHistory().then(data => History.setHistory(data))
        setUserId(user.users.id)
        setRole(user.users.role)
        setTimeout(() => {
            get()
        }, 500);
    }, [])

    const get = () => {
        historyDate = []
        History.history.map(item => {
            if (item.userId === userId) {
                let dat = JSON.parse(item.date)
                let date = {
                    "Дата": `${dat.День}.${dat.Месяц < 10 ? `0${dat.Месяц}` : dat.Месяц}.${dat.Год}. ${dat.Час}:${dat.Минута}`,
                }
                historyDate.push(date.Дата)
            }
            console.log('asd');
        })
    }

    const log = () => {
        historyDate.map(item => console.log(item))

    }

    return (
        <div className={style.container}>
            <center><h2>История заказов</h2></center>
            <button onClick={() => get()}>get</button>
            <button onClick={() => log()}>log</button>

            <div>
                {
                    role !== "ADMIN" ? 
                    <div className={style.block}>
                        <div className={style.block__name}>
                            <div className={style.flex__dat}>
                                <p className={style.flex__date}>Дата</p> 
                                <div className={style.block__column}>
                                    {
                                        historyDate.map(item => 
                                            item.userId === userId ?
                                            History.historyDate.map(i => 
                                                <div key={i.id} className={style.itemDate}>
                                                    <p>{i.Дата}</p>
                                                </div>    
                                            )
                                            :
                                            ''
                                        )
                                    }
                                </div>
                            </div>    
                            <div className={style.flex__nam}>
                                <p className={style.flex__name}>Имя</p> 
                                <div className={style.block__column}>
                                    {History.history.map(item => 
                                        <div key={item.id} className={style.itemName}>
                                            <p>{item.userName}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={style.flex__lastNam}>
                                <p className={style.flex__lastName}>Фамилия</p> 
                                    {History.history.map(item => 
                                        <div key={item.id} className={style.itemLastName}>
                                            <p>{item.userLastName}</p>
                                        </div>
                                    )}
                            </div>
                            <div className={style.flex__phon}>
                                <p className={style.flex__phone}>Телефон</p> 
                                    {History.history.map(item => 
                                        <div key={item.id} className={style.itemPhone}>
                                            <p>{item.userPhone}</p>
                                        </div>
                                    )}
                            </div>
                            <div className={style.flex__inf}>
                                <p className={style.flex__info}>Информация по заказу</p> 
                                    {History.historyProduct.map(item => 
                                        <div>
                                            { item.length > 1 ? 
                                                <div className={style.itemInfoLength}>
                                                    {item.map(i => 
                                                        <div key={i.id} className={style.itemInfo}>
                                                            <p>
                                                                <span>Название: </span> 
                                                                <span>{i.Продукт}</span>
                                                            </p>
                                                            <p>
                                                                <span>Цена с учетом скидки: </span> 
                                                                <span>{i.Цена}, 1шт</span>
                                                            </p>
                                                            <p>
                                                                <span>Количество: </span>
                                                                <span>{i.Количество}</span>
                                                            </p>
                                                            <p>
                                                                <span>Скидка: </span> 
                                                                <span>{i.Скидка}</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                : 
                                                item.map( i => 
                                                    <div key={i.id} className={style.itemInfo}>
                                                        <p>
                                                            <span>Название: </span> 
                                                            <span>{i.Продукт}</span>
                                                        </p>
                                                        <p>
                                                            <span>Цена с учетом скидки: </span> 
                                                            <span>{i.Цена}, 1шт</span>
                                                        </p>
                                                        <p>
                                                            <span>Количество: </span>
                                                            <span>{i.Количество}</span>
                                                        </p>
                                                        <p>
                                                            <span>Скидка: </span> 
                                                            <span>{i.Скидка}</span>
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                            
                                    )}
                            </div>
                            <div className={style.flex__x}>
                                <p className={style.flex__xx}>Доставка/Самовывоз</p> 
                                    {History.historyAddress.map(item => 
                                        <div className={style.itemAddres}>
                                            <p>
                                               <span>Адрес: </span> 
                                               <span>{item.Адрес}</span>
                                            </p>
                                            <p>
                                                <span>Квартира: </span> 
                                                <span>{item.Квартира}</span>
                                            </p>
                                            <p>
                                                <span>Подьезд: </span>
                                                <span>{item.Подьезд}</span>
                                            </p>
                                            <p>
                                                <span>Этаж: </span> 
                                                <span>{item.Этаж}</span>
                                            </p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    : 
                    <div className={style.block}>
                        <div className={style.block__name}>
                            <div className={style.flex__dat}>
                                <p className={style.flex__date}>Дата</p> 
                                <div className={style.block__column}>
                                    {History.historyDate.map(item => 
                                        <div key={item.id} className={style.itemDate}>
                                            <p>{item.Дата}</p>
                                        </div>
                                    )}
                                </div>
                                
                            </div>    
                            <div className={style.flex__nam}>
                                <p className={style.flex__name}>Имя</p> 
                                <div className={style.block__column}>
                                    {History.history.map(item => 
                                        <div key={item.id} className={style.itemName}>
                                            <p>{item.userName}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={style.flex__lastNam}>
                                <p className={style.flex__lastName}>Фамилия</p> 
                                    {History.history.map(item => 
                                        <div key={item.id} className={style.itemLastName}>
                                            <p>{item.userLastName}</p>
                                        </div>
                                    )}
                            </div>
                            <div className={style.flex__phon}>
                                <p className={style.flex__phone}>Телефон</p> 
                                    {History.history.map(item => 
                                        <div key={item.id} className={style.itemPhone}>
                                            <p>{item.userPhone}</p>
                                        </div>
                                    )}
                            </div>
                            <div className={style.flex__inf}>
                                <p className={style.flex__info}>Информация по заказу</p> 
                                    {History.historyProduct.map(item => 
                                        <div>
                                            { item.length > 1 ? 
                                                <div className={style.itemInfoLength}>
                                                    {item.map(i => 
                                                        <div key={i.id} className={style.itemInfo}>
                                                            <p>
                                                                <span>Название: </span> 
                                                                <span>{i.Продукт}</span>
                                                            </p>
                                                            <p>
                                                                <span>Цена с учетом скидки: </span> 
                                                                <span>{i.Цена}, 1шт</span>
                                                            </p>
                                                            <p>
                                                                <span>Количество: </span>
                                                                <span>{i.Количество}</span>
                                                            </p>
                                                            <p>
                                                                <span>Скидка: </span> 
                                                                <span>{i.Скидка}</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                : 
                                                item.map( i => 
                                                    <div key={i.id} className={style.itemInfo}>
                                                        <p>
                                                            <span>Название: </span> 
                                                            <span>{i.Продукт}</span>
                                                        </p>
                                                        <p>
                                                            <span>Цена с учетом скидки: </span> 
                                                            <span>{i.Цена}, 1шт</span>
                                                        </p>
                                                        <p>
                                                            <span>Количество: </span>
                                                            <span>{i.Количество}</span>
                                                        </p>
                                                        <p>
                                                            <span>Скидка: </span> 
                                                            <span>{i.Скидка}</span>
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                            
                                    )}
                            </div>
                            <div className={style.flex__x}>
                                <p className={style.flex__xx}>Доставка/Самовывоз</p> 
                                    {History.historyAddress.map(item => 
                                        <div className={style.itemAddres}>
                                            <p>
                                               <span>Адрес: </span> 
                                               <span>{item.Адрес}</span>
                                            </p>
                                            <p>
                                                <span>Квартира: </span> 
                                                <span>{item.Квартира}</span>
                                            </p>
                                            <p>
                                                <span>Подьезд: </span>
                                                <span>{item.Подьезд}</span>
                                            </p>
                                            <p>
                                                <span>Этаж: </span> 
                                                <span>{item.Этаж}</span>
                                            </p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                } 
            </div>
        </div>
    )
})

export default History