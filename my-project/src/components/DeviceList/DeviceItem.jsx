import React, { useEffect, useState } from 'react';
import Image from "react-bootstrap/Image";
import star from '../../assets/star.png'
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../../Utils/Consts";
import style from './Device.module.css';
import hard from '../../imgContainer/img/pngegg.png'
import hardLike from '../../imgContainer/img/heart-symbol-01.jpg' 

const DeviceItem = ({ device, addFavorites, removeLocalStorage, addBasket }) => {
    const history = useHistory()
    const [ likes, setLikes] = useState(false)


    const localFavorites = (device) => {
        addprod(device)
    }

    const addprod = (device) => {
        setLikes(!likes)
        addFavorites(device)
    }
    const removeLocal = (device) => {
        setLikes(!likes)
        removeLocalStorage(device)
    }


    return (
            <div className={style.item}>
                    <Image 
                        className={style.item_img} 
                        style={{cursor: "pointer"}}
                        width={320} height={320} 
                        src={process.env.REACT_APP_API_URL + device.img}
                        onClick={() => history.push(DEVICE_ROUTE + '/' + device.id )}
                    />
                        <div className={style.art}>Артикул товара: 0000{device.id}</div>
                <div  className={style.block} style={{width: 350}} border={"light"}>
                    <div className={style.device__block}>
                        <div className={style.item_name} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id )}>{device.name}</div>
                        <div>   {
                                    likes 
                                    ?
                                    <img 
                                        onClick={() => removeLocal(device)} 
                                        className={style.favorites} 
                                        src={hardLike} alt="" 
                                    /> 

                                    :
                                    <img 
                                        onClick={() => localFavorites(device)}
                                        className={style.favorites} 
                                        src={hard} alt="" 
                                    />

                                }
                        </div>
                    </div>
                </div>
                <div className={style.price__block}> 
                    { device.discount >= 1 ?
                        <div className={style.priceee}>
                            <div className={style.discountPrice}>
                                {device.discountPrice} сом
                            </div>
                            <div className={style.price}>
                                {device.pricee} сом
                            </div>
                            <div className={style.discount}>
                                {device.discount}%
                            </div>
                        </div> 
                        : 
                        <p className={style.item__price}>
                            {device.price} сом
                        </p>
                    }
                </div>
                <div className={style.item_btn}>
                    <button onClick={() => addBasket(device)} key={device.id} className={style.btn}>В корзину</button> 
                </div>
            </div>                                                                                                     
    );
};

export default DeviceItem;
