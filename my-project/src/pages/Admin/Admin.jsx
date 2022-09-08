import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../../components/Modals/CreateBrand'
import CreateDevice from '../../components/Modals/CreateDevice'
import CreateType from '../../components/Modals/CreateType'

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false)
	const [typeVisible, setTypeVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)

	return (
		<Container className=' d-flex flex-column'>
			{/* <Button
				variant={'outline-success'}
				className='mt-4 p-2'
				onClick={() => setBrandVisible(true)}
			>
				Добавить категорию
			</Button> */}
			<Button
				variant={'outline-success'}
				className='mt-4 p-2'
				onClick={() => setTypeVisible(true)}
			>
				Добавить тип
			</Button>

			<Button
				variant={'outline-success'}
				className='mt-4 p-2'
				onClick={() => setDeviceVisible(true)}
			>
				Добавить товар
			</Button>
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateDevice
				show={deviceVisible}
				onHide={() => setDeviceVisible(false)}
			/>
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
		</Container>
	)
}

export default Admin
