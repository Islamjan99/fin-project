import { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import UserStore from './store/UserStore'
import DeviceStore from './store/DeviceStore'
import HistoryStore from './store/HistoryStore'
import FavoritesStore from './store/FavoritesStore'

export const Context = createContext(null)

ReactDOM.render(
	<Context.Provider
		value={{
			user: new UserStore(),
			device: new DeviceStore(),
			History: new HistoryStore(),
			favorites: new FavoritesStore(),
		}}
	>
		<App />
	</Context.Provider>,
	document.getElementById('root')
)
