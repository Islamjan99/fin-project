import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter/AppRouter'
import Header from './components/Header/Header'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import { check } from './Http/UserAPI'
import { Spinner } from 'react-bootstrap'

const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		check()
			.then(data => {
				user.setUser(true)
				user.setIsAuth(true)
			})
			.finally(() => setLoading(false))
	})

	if (loading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	}

	return (
		<div className='App'>
			<BrowserRouter>
				{/* <Header /> */}
				<AppRouter />
			</BrowserRouter>
		</div>
	)
})

export default App
