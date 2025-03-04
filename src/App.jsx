/** @format */

import { BrowserRouter } from 'react-router';
import RoutesConfig from './routes/routes';

function App() {
	return (
		<>
			<BrowserRouter>
				<RoutesConfig />
			</BrowserRouter>
		</>
	);
}

export default App;
