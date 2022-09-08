import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, Dropdown } from 'react-bootstrap'
import { createType } from '../../Http/DeviceAPI'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'

const CreateType = observer(({ show, onHide }) => {
	const { device } = useContext(Context)
	const [value, setValue] = useState('')

	const addType = () => {
		createType({ name: value }).then(data => {
			setValue('')
			onHide()
		})

		onHide()
	}
	const setCategory = floor => {
		device.setSelectedFloor(floor)
	}
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Добавить тип
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={'Введите название типа'}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addType}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateType
