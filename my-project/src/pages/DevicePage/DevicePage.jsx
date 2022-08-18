import React, { useEffect, useState, useContext } from 'react'
import { Container, Image, } from 'react-bootstrap'
import style from './DevicePage.module.css';
import { useParams } from 'react-router-dom'
import { fetchDevicees, fetchOneDevice } from "../../Http/DeviceAPI";
import { observer } from 'mobx-react-lite';
import { Context } from '../../index'
import DeviceModals from '../../store/DeviceModals';
import change from '../../assets/pen_edit_modify_icon_178422.png'

const Devicepage  = observer(() => {
    const { device } = useContext(Context)
    const { user } = useContext(Context)
    const [ smShow, setSmShow] = useState(false);
    const [ addGood, setAddGood ] = useState(false)
    const [ devicce, setDevicce] = useState({info: []})
    const [ sum, setSum] = useState(0)
    const { id } = useParams()
        
    const [ role, setRole ] = useState()
    
    const modalPanel = () => {
        setSmShow(true)
    }
    
    let so = [];
    
    const addBasket = (id) => {
        if (device.basket.length >= 1) {
            device.basket.map(i => so.push(i))
            check(id)
        } else {
            device.addBasket(devicce)
            setAddGood(true)
            modalPanel()
        }
    }

    let itemID = false 
    let PM = true 

    const check = (id) => {
        if (device.basket.length >= 1) {
            so.map(item => {
                if (item.id === id) {
                    itemID = true
                    PM = false
                } else {
                    itemID = false
                }
                return null
            })
        }
        
    
        if (itemID === false) {
            if (PM === true) {
                device.addBasket(devicce)
                setAddGood(true)
                modalPanel(devicce)
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

    const changeProduct = () => {
        
    }


    useEffect(() => {
        fetchOneDevice(id).then(data => setDevicce(data))
        fetchOneDevice(id).then(data => setSum(data.price))
        fetchDevicees().then(data => {
            device.setDevicees(data.rows)
        })
        setRole(user.users.role)
    }, [device, id, user])

    
    return (
        <div  className={style.container}>
            <div mt={2}>
                <Image className={style.sticky} width={550} height={550} src={process.env.REACT_APP_API_URL + devicce.img}/>
            </div>
            <div className={style.device__block}>
                <div className={style.dev}>
                    <div className={style.dev__name}>
                        {devicce.name}
                    </div>
                    <button className={style.change__btn} onClick={changeProduct}> {role === 'ADMIN' ? <img className={style.change__img} src={change} alt={change}/> : '' }</button>
                </div> 
                    <div className={style.in}>Информация по товару</div>
                    <div className={style.line}></div>

                {devicce.info.map((info, index) =>
                    <div className={style.info} key={info.id} >
                        <div className={style.title}>{info.title}:</div> <p className={style.desc}>{info.description}</p>
                    </div>
                )}
                <div  className={style.line__price}></div>
                
                <div className={style.price__block}>
                    <div className={style.discount}>
                        {device.discountPrice}
                    </div>
                    <div className={style.price}> 
                        {sum}
                    </div> <p className={style.som}>Сом</p>
                    <button onClick={() => addBasket(devicce.id)} className={style.block__basket}>В корзину</button>
                </div>
                <DeviceModals 
                smShow={smShow}
                setSmShow={setSmShow}
                addGood={addGood}
                />
                <div className={style.block__count}>
                </div>
            </div>   
        </div>
    )
})

export default Devicepage