import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import DeviceListAll from '../DeviceList/DeviceListAll'
import { fetchDevicees } from '../../Http/DeviceAPI'
import Pagin from '../Pagin'

const DeviceAll = observer(() => {
    const { device } = useContext(Context)

    useEffect(() => {
        
        
        
    }, [ device ])



    return (
        <div >
            <DeviceListAll />
            <Pagin />
        </div>

    )
})

export default DeviceAll;
