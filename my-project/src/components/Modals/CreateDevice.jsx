import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Dropdown, Form, Row, Col } from 'react-bootstrap'
import { Context } from '../../index'
import {
	createDevice,
	fetchCategorys,
	fetchFloors,
	fetchTypes,
} from '../../Http/DeviceAPI'
import { observer } from 'mobx-react-lite'
import style from './Create.module.css'
import P from '../UI/P'

const CreateDevice = observer(({ show, onHide }) => {
	const { device } = useContext(Context)
	const [name, setName] = useState('')
	const [price, setPrice] = useState()
	const [file, setFile] = useState(null)
	const [info, setInfo] = useState([])
	const [floor, setFloor] = useState({})
	const [discount, setDiscount] = useState(0)
	const [handleChange, setHandleChange] = useState(false)

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchFloors().then(data => device.setFloors(data))
		fetchCategorys().then(data => device.setCategorys(data))
	}, [device])

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	const removeInfo = number => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)))
	}

	const selectFile = e => {
		setFile(e.target.files[0])
	}

	const addDevice = () => {
		const formData = new FormData()
		formData.append('name', name)
		formData.append('price', `${price}`)
		formData.append('img', file)
		formData.append('floors', device.selectedfloor.id)
		formData.append('types', device.selectedType.id)
		formData.append('categorys', device.selectedCategory.id)
		formData.append('info', JSON.stringify(info))
		formData.append('discount', discount)
		createDevice(formData).then(data => onHide())
	}
	const floors = str => {
		console.log(str)
	}
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Добавить устройство
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-2 mb-2'>
						<div className={style.checkbox__block}>
							<p className={style.checkboxP}>Продукт со скидкой?</p>

							<div className={style.checkbox}>
								<p>{handleChange ? 'Да' : ' Нет'}</p>
								<input
									type='checkbox'
									onChange={e => setHandleChange(e.target.checked)}
								/>
							</div>
						</div>
					</Dropdown>
					<Dropdown className='mt-2 mb-2'>
						<Dropdown.Toggle>
							{floor.name || 'К какому полу предназначен товар'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => floors('Мужской')}>
								Мужской
							</Dropdown.Item>
							<Dropdown.Item onClick={() => floors('Женский')}>
								Женский
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className='mt-3'
						placeholder='Введите тип'
					/>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className='mt-3'
						placeholder='Введите название товара'
					/>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className='mt-3'
						placeholder='Введите название товара'
					/>
					<Form.Control
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
						className='mt-3'
						placeholder='Введите цену товара'
						type='number'
					/>
					<Form.Control className='mt-3' type='file' onChange={selectFile} />
					{handleChange ? (
						<>
							<P className='mt-3'>Введите процент скидки</P>
							<Form.Control
								value={discount}
								onChange={e => setDiscount(Number(e.target.value))}
								className='mt-1'
								placeholder=''
								type='number'
							/>
						</>
					) : (
						''
					)}
					<hr />
					<Button variant={'outline-dark'} onClick={addInfo}>
						Добавить новое свойство
					</Button>
					{info.map(i => (
						<Row className='mt-4' key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={e => changeInfo('title', e.target.value, i.number)}
									placeholder='Введите название свойства'
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={e =>
										changeInfo('description', e.target.value, i.number)
									}
									placeholder='Введите описание свойства'
								/>
							</Col>
							<Col md={4}>
								<Button
									onClick={() => removeInfo(i.number)}
									variant={'outline-danger'}
								>
									Удалить
								</Button>
							</Col>
						</Row>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addDevice}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateDevice
