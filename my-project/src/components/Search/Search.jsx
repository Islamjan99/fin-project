import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import style from './Search.module.css'
import Image from "react-bootstrap/Image";
import star from '../../assets/star.png'
import { useHistory } from "react-router-dom"
import { DEVICE_ROUTE } from '../../Utils/Consts'
import { Container } from 'react-bootstrap';
import { Context } from '../..';
import DeviceModals from '../../store/DeviceModals';
import hard from '../../imgContainer/img/pngegg.png'
import hardLike from '../../imgContainer/img/heart-symbol-01.jpg' 

export default function Search({inp, setInp, isOpen, setIsOpen}) {
    const { device } = useContext(Context)
    const history = useHistory()
    const [ product, setProduct] = useState([])
    const [ smShow, setSmShow] = useState(false);
    const [ addGood, setAddGood ] = useState(false)
    const [ likes, setLikes] = useState(false)
    const [ prod, setProd ] = useState()
    
    const data = [];

    let a = []
    let so = []

    function getProduct() {
        axios.get(`http://localhost:5000/api/device`)
            .then((response) => {
                response.data.rows.map(i => {
                    if (i.discount >= 1) {
                        let item = (i.price / 100) * i.discount
                        let itemPrice = Math.floor(i.price - item)
                        i.price = itemPrice
                    } else {
                        setProduct(response.data.rows);
                    }
                })
            });
    }

    useEffect(() => {
        getProduct()
    }, [])

    const localFavorites = (device) => {
        if (localStorage.getItem('favorites') != null) {
            const cart = JSON.parse(localStorage.getItem('favorites'));
            setProd(cart)
            console.log('if 1');
            if (prod != null) {
                addprod(device)

            } else {
                addprod(device)
                console.log('else 2');
            }

        } else {
            addprod(device)
            console.log('else 1');
        } 

    }

    const addprod = (device) => {
        if (likes === false) {
            setLikes(!likes)
            addFavorites(device)
            
        }
    }

    const removeLocal = (device) => {
        setLikes(!likes)
        removeLocalStorage(device.id)
    }
    const removeLocalStorage = (id) => {

        data.map((item, index )=> {
            if (item.id === id) {
                a.push(index)
            } 
            if (item.id === id) {
                data.splice(a, 1);
            }
             return null
        })

        addLocal()

        a = []
    } 
    
    let filterProduct = []
    if (inp !== undefined) {
        if (inp !== '') {
            filterProduct = product.filter(prod => {
                return prod.name.toLowerCase().includes(inp.toLocaleLowerCase())
            })
        }
        
    }
        

    
    const addBasket = (devic) => {
        if (device.basket !== '') {
            device.basket.map(i => so.push(i))
            check(devic)
        } else {
            device.addBasket(devic)
            setAddGood(true)
            modalPanel()
        }
    }
    
    const addFavorites = (device) => {
        data.push(device)
        addLocal()
    }
    
    const addLocal = () => {
        localStorage.setItem('favorites', JSON.stringify(data))
        
    }

    let itemID = false 
    let PM = true 

    const check = (devic) => {
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

    const basMod = (devic) => {
        addBasket(devic)

    }

    const modalPanel = () => {
        setTimeout(() => {
            setSmShow(true)
        }, 200);

        setTimeout(() => {
            setSmShow(false)
        }, 2000);
    }
    const closeModal = (bool) => {
    
        
    }
    return (
        <>
            {   isOpen ?
                <div className={style.container} onClick={() => setIsOpen(false)}>
                <DeviceModals
                    smShow={smShow}
                    setSmShow={setSmShow}
                    addGood={addGood}
                    device={device}
                />
                <div className={inp === '' ? style.search__block : style.search } onClick={e => e.stopPropagation()}>
                    {
                        filterProduct.map((produ, index) => {
                            return (
                                <div className={style.item}>
                                    <div className={style.img__block}>
                                        <Image 
                                            className={style.item_img} 
                                            style={{cursor: "pointer"}}
                                            width={100} height={100} 
                                            src={process.env.REACT_APP_API_URL + produ.img}
                                            onClick={() => history.push(DEVICE_ROUTE + '/' + produ.id )}
                                        />
                                        <span className={style.art}>Артикул товара: 0000{produ.id}</span>
                                    </div>
                                    <div  className={style.block__name}>
                                        <div className={style.device__block}>
                                            <div className={style.item_name} onClick={() => history.push(DEVICE_ROUTE + '/' + produ.id )}>{produ.name}</div>
                                        </div>
                                        <div className={style.item_cor}>
                                            <div className={style.item_price}>
                                                <p>{produ.price} сом</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className={style.btn}>
                                        <button onClick={() => basMod(produ)} key={produ.id} className={style.item_btn}>В корзину</button>
                                    </div>
                                </div>                                                                                                     
                
                            )                                                                                                                                                                
                        }
                        ) 
                    }                                                                                                                                                                        
                </div>
            </div>
            :''}
        </>
        
    )
}
