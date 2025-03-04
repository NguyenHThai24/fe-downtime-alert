/** @format */

import React from 'react';
import { AlertTriangle } from 'lucide-react'; // Sử dụng thư viện Lucide cho icon

const Header = () => {
	return (
		<div className="flex items-center justify-center gap-3 p-2  shadow-lg rounded-md text-blue-900">
			<AlertTriangle
				size={32}
				className="text-yellow-400 animate-bounce"
			/>
			<h1 className="font-extrabold text-5xl uppercase tracking-wide">
				LHG Alert
			</h1>
		</div>
	);
};

export default Header;
