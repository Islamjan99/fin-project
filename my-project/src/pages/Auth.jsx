import React, { useContext, useState } from 'react'
import style from './Auth.module.css'
import { Container, Form } from 'react-bootstrap'
import Input from '../components/UI/Input'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { CATALOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../Utils/Consts'
import { login, registration } from '../Http/UserAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')

	const click = async () => {
		try {
			let data
			if (isLogin) {
				data = await login(email, password)
			} else {
				data = await registration(name, lastName, email, password, phone)
				console.log(data)
			}
			user.setUser(user)
			user.setIsAuth(true)
			history.push(CATALOG_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
		document.location.reload()
	}

	return (
		<div
			className={isLogin ? style.auth__wrapper : style.auth__registration}
			style={{ height: window.innerHeight - 54 }}
		>
			<div className={style.auth__container}>
				{isLogin ? (
					<div className={style.auth__login}>
						<h2 className={style.auth__title}>
							{isLogin ? 'Вход' : 'Регистрация'}
						</h2>
						<Input
							style={{
								borderBottom: '1px solid #254A5A',
								margin: '4px 0 16px 0 ',
								width: '100%',
							}}
							place='E-mail'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>

						<Input
							style={{
								borderBottom: '1px solid #254A5A',
								margin: '4px 0 16px 0 ',
								width: '100%',
							}}
							className='mb-3 mt-1'
							place='Пароль'
							value={password}
							onChange={e => setPassword(e.target.value)}
							type='password'
						/>
						<div className={style.auth__block}>
							<button
								className={style.auth__btn}
								variant={'outline-success'}
								onClick={click}
							>
								{isLogin ? 'Войти' : 'Регистрация'}
							</button>
							{isLogin ? (
								<div className={style.auth__info}>
									<NavLink to={REGISTRATION_ROUTE}>
										Забыли пароль / У меня нет акаунта
									</NavLink>
								</div>
							) : (
								<div className='mb-2'>
									Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className={style.auth__regist}>
						<Form.Control
							placeholder='Введите вашe имя'
							value={name}
							onChange={e => setName(e.target.value)}
							className='mb-3'
						/>
						<span>Фамилия (обязательно)</span>
						<Form.Control
							placeholder='Введите вашу фамилию'
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							className='mb-3'
						/>
						<span>Номер телефона (обязательно)</span>
						<Form.Control
							className='mb-3'
							placeholder='Введите ваш сотовый номер'
							value={phone}
							onChange={e => setPhone(e.target.value)}
							type='number'
						/>
						<span>E-mail (обязательно)</span>
						<Form.Control
							placeholder='Введите ваш e-mail адрес'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='mb-3'
						/>
						<span>Пароль (обязательно)</span>
						<Form.Control
							placeholder='Введите ваш пароль'
							value={password}
							onChange={e => setPassword(e.target.value)}
							type='password'
							className='mb-3'
						/>
						<div className={style.auth__block}>
							<button
								className={style.auth__btn}
								variant={'outline-success'}
								onClick={click}
							>
								{isLogin ? 'Войти' : 'Регистрация'}
							</button>
							{isLogin ? (
								<div className={style.auth__info}>
									<NavLink to={REGISTRATION_ROUTE}>
										Забыли пароль / У меня нет акаунта
									</NavLink>
								</div>
							) : (
								<div className='mb-2'>
									Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
})

export default Auth
