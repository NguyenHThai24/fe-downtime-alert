/** @format */

import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const Header = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	// Cập nhật thời gian mỗi giây
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// Định dạng ngày giờ
	const formattedTime = currentTime.toLocaleTimeString('vi-VN', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
	const formattedDate = currentTime.toLocaleDateString('vi-VN');

	return (
		<div className="relative flex items-center justify-between px-4 shadow-lg rounded-md">
			{/* Thời gian thực */}
			<div className="text-left text-black">
				<p className="text-2xl font-bold">{formattedTime}</p>
				<p className="text-lg font-semibold text-center">{formattedDate}</p>
			</div>

			{/* Logo với hiệu ứng nổi */}
			<div className="flex items-center gap-3">
				<AlertTriangle
					size={32}
					className="text-red-600 animate-bounce drop-shadow-xl"
				/>
				<h1 className="font-extrabold text-5xl uppercase tracking-wide text-blue-950 drop-shadow-[5px_5px_5px_#8000ff]">
					LHG Alert
				</h1>
			</div>

			{/*Tai khoan*/}
			<div>
				<img
					src="../../../public/image/user-logo.png"
					alt=""
					width="70px"
				/>
			</div>
		</div>
	);
};

export default Header;
