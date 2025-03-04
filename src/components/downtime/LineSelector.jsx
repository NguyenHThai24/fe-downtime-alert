/** @format */

import React, { useState } from 'react';

const LineSelector = () => {
	const [selectedValue, setSelectedValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const options = ['1', '2', '3', '4', '5'];

	const handleSelect = (value) => {
		setSelectedValue(value);
		setIsOpen(false);
	};

	return (
		<div className="flex flex-col items-center">
			<button
				className="w-24 h-24 rounded-full bg-[#002b5c] text-white text-2xl font-bold shadow-lg"
				onClick={() => setIsOpen(!isOpen)}>
				Line
			</button>

			<div
				className="relative w-24 h-12 bg-[#002b5c] text-white text-2xl font-bold flex items-center justify-center mt-2"
				style={{
					clipPath: 'ellipse(100% 50% at 50% 50%)',
				}}>
				{selectedValue}
			</div>

			{/* Dropdown options */}
			{isOpen && (
				<div className="mt-2 w-24 bg-white shadow-md rounded-md overflow-hidden">
					{options.map((option) => (
						<div
							key={option}
							className="p-2 hover:bg-blue-300 cursor-pointer text-center"
							onClick={() => handleSelect(option)}>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LineSelector;
