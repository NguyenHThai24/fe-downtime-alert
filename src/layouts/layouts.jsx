/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

const Layouts = () => {
	return (
		<div>
			<Header />
			<div className="bg-blue-800 h-[100vh]">
				<Outlet />
			</div>
		</div>
	);
};

export default Layouts;
