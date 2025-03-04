/** @format */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layouts from '../layouts/layouts';
import MainPage from '../pages/MainPage';

const RoutesConfig = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Layouts />}>
				<Route
					index
					element={<MainPage />}
				/>
			</Route>
		</Routes>
	);
};

export default RoutesConfig;
