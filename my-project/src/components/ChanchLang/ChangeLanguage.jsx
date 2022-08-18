import React, { useEffect, useState } from 'react'
import P from '../UI/P'
import styled from './ChangeLanguage.module.css'

const ChangeLanguage = () => {
	const [lang, setLang] = useState(true)

	const changeLanguage = lan => {
		if (lan) {
			setLang(lan == 'ru' ? true : false)
		}
	}
	useEffect(() => {}, [lang])

	return (
		<div className={styled.changeLanguage__wrapper}>
			<div className={styled.changeLanguage__container}>
				<P
					onClick={() => changeLanguage('ru')}
					style={{
						fontWeight: '400',
						fontSize: '16px',
						lineHeight: '22px',
						textAlign: 'center',
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
						color: lang == true ? '#E64926' : '#0F303F',
						borderBottom: lang ? '2px solid #E64926' : 'none',
						cursor: 'pointer',
					}}
				>
					Ru
				</P>
				<P
					onClick={() => changeLanguage('en')}
					style={{
						fontWeight: '400',
						fontSize: '16px',
						lineHeight: '22px',
						textAlign: 'center',
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
						cursor: 'pointer',
						color: lang == true ? '#0F303F' : '#E64926',
						borderBottom: lang ? 'none' : '2px solid #E64926',
					}}
				>
					En
				</P>
			</div>
		</div>
	)
}

export default ChangeLanguage
