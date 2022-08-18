import React from 'react'
import style from './Admin.module.css'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { ADMIN_ROUTE, HISTORY_ROUTER } from '../../Utils/Consts'

export default function AdminPanel() {
    const history = useHistory()

    return (
        <div className={style.container}>
            <div className={style.block}>
                <Button
                    variant={"outline-success"}
                    className="mt-4 p-2"
                    onClick={() => history.push(ADMIN_ROUTE)}
                >
                    Добавить подразделение
                </Button>
                <Button
                    variant={"outline-success"}
                    className="mt-4 p-2"
                    onClick={() => history.push(HISTORY_ROUTER)}
                >
                    Просмотреть историю заказов
                </Button>
            </div>
        </div>
    )
}
