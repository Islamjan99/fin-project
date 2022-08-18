import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button } from 'react-bootstrap'
import { createCategory } from '../../Http/DeviceAPI'

const CreateBrand = ({ show, onHide }) => {
	const [value, setValue] = useState('')

	const addBrand = () => {
		try {
			createCategory({ name: value }).then(data => {
				setValue('')
				onHide()
			})
		} catch (e) {}
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
