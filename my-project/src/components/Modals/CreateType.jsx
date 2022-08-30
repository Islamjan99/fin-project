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
		createType({ name: value, categoryId: device.selectedCategory.id }).then(
			data => {
				setValue('')
				onHide()
			}
		)

		onHide()
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Добавить тип
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Dropdown className='mt-2 mb-2'>
					<Dropdown.Toggle>
						{device.selectedCategory.name || 'Выберите Категорию'}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{device.categorys.map(category => (
							<Dropdown.Item
								onClick={() => device.setSelectedCategory(category)}
								key={category.id}
							>
								{category.name}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
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
