import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, Dropdown } from 'react-bootstrap'
import { createCategory } from '../../Http/DeviceAPI'
import { Context } from '../..'

const CreateBrand = ({ show, onHide }) => {
	const { device } = useContext(Context)
	const [value, setValue] = useState('')

	const addBrand = () => {
		try {
			createCategory({
				name: value,
			}).then(data => {
				setValue('')
				onHide()
			})
		} catch (e) {}
	}
	const setFloor = floor => {
		console.log(floor)
		device.setSelectedFloor(floor)
	}
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Добавить категорию
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={'Введите название категории'}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addBrand}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateBrand
