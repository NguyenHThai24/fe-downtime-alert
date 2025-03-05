/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

const Layouts = () => {
	return (
		<div className="">
			<Header />
			<div className="">
				<Outlet />
			</div>
		</div>
	);
};

export default Layouts;
