import React, { useContext, useState } from 'react'
import style from './Auth.module.css'
import { Button, Container, Form } from 'react-bootstrap'
import Input from '../components/UI/Input'
import Span from '../components/UI/Span'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { CATALOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../Utils/Consts'
import { login, registration } from '../Http/UserAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import imagePassword from './medical.svg'
import imagePasswordHide from './hide_icon_184218.svg'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showRepeatPassword, setShowRepeatPassword] = useState(false)
	const [users, setUsers] = useState({})

	const click = async () => {
		try {
			let data
			if (isLogin) {
				data = await login(email, password)
				console.log(data)
				// document.location.reload()
			} else {
				data = await registration(users)
				console.log(data)
			}
			user.setUser(user)
			user.setIsAuth(true)
			history.push(CATALOG_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
	}
	let form = [
		{ type: 'text', name: 'name', placeholder: 'Имя' },
		{ type: 'text', name: 'lastName', placeholder: 'Фамилия' },
		{ type: 'text', name: 'phone', placeholder: 'Телефон' },
		{ type: 'text', name: 'email', placeholder: 'E-mail' },
	]
	const changeHandler = event => {
		setUsers({ ...users, [event.target.name]: event.target.value })
		console.log(users)
	}
	const changeHandlerCheckbox = event => {
		setUsers({ ...users, [event.target.name]: event.target.checkbox })
		console.log(users)
	}
	const test = i => {
		if (
			users.password !== users.repeatPassword &&
			users.repetPassword !== users.password
		) {
			console.log('Пароли не похожи', users)
		} else {
			console.log('пароли совподают')
		}
	}
	return (
		<div
			className={style.auth__wrapper}
			style={{ height: window.innerHeight - 54 }}
		>
			<div className={style.auth__container}>
				{isLogin ? (
					<div className={style.auth__login}>
						<h2 className={style.auth__title}>Вход</h2>
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
							<div className={style.auth__info}>
								<Link to={REGISTRATION_ROUTE}>У меня нет акаунта</Link>
							</div>

							<button
								className={style.auth__btn}
								variant={'outline-success'}
								onClick={click}
							>
								Войти
							</button>
						</div>
					</div>
				) : (
					<div className={style.auth__registration}>
						<div className={style.auth__title}>
							<h2>Регистация</h2>
						</div>
						<form>
							{form.map(({ type, name, placeholder }, i) => {
								return (
									<Input
										onChange={changeHandler}
										key={i}
										type={type}
										name={name}
										place={placeholder}
										style={{
											borderBottom: '1px solid #254A5A',
											margin: '4px 10px 16px 0 ',
											width: '250px',
											padding: '0 0 10px 5px',
										}}
									/>
								)
							})}
							<div className={style.img__password}>
								<Input
									onChange={changeHandler}
									name={'password'}
									type={showPassword ? 'text' : 'password'}
									place={'Пароль'}
									style={{
										fontSize: '16px',
										lineHeight: '170%',
										color: '#254A5A',
										width: '235px',
									}}
								/>
								<img
									onClick={() => setShowPassword(!showPassword)}
									style={{ cursor: 'pointer', width: '14px', height: '14px' }}
									src={showPassword ? imagePasswordHide : imagePassword}
									alt={'img password'}
								/>
							</div>
							<div className={style.img__password}>
								<Input
									onChange={event => setRepeatPassword(event.target.value)}
									name={'repeatPassword'}
									type={showRepeatPassword ? 'text' : 'password'}
									place={'Пароль'}
									style={{
										fontSize: '16px',
										lineHeight: '170%',
										color: '#254A5A',
										width: '235px',
									}}
								/>
								<img
									onClick={() => setShowRepeatPassword(!showRepeatPassword)}
									style={{ cursor: 'pointer', width: '14px', height: '14px' }}
									src={showRepeatPassword ? imagePasswordHide : imagePassword}
									alt={'img password'}
								/>
							</div>
						</form>
						<div className={style.auth__checked}>
							<div>
								<Input
									style={{ width: '15px', height: '15px' }}
									type={'checkbox'}
									name={'bool'}
									onClick={changeHandlerCheckbox}
								/>
								<Span
									style={{
										fontWeight: '500',
										fontSize: '12px',
										lineHeight: '16px',
										color: '#0F303F',
										marginLeft: '10px',
									}}
								>
									Я согласен с
									<Link to={'/'}> политикой конфиденциальности</Link>
								</Span>
							</div>
						</div>
						<div className={style.auth__block}>
							<Button
								className={style.auth__btn}
								variant={'outline-success'}
								onClick={click}
							>
								Регистрация
							</Button>
							<div className={style.auth__info}>
								У меня уже есть аккаунт чтобы
								<Link to={LOGIN_ROUTE}> войти</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
})

export default Auth
