/** @format */

import React, { useState } from 'react';

const FloorSelector = () => {
	const [selectedValue, setSelectedValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const options = ['1', '2', '3', '4', '5', '6'];

	const handleSelect = (value) => {
		setSelectedValue(value);
		setIsOpen(false);
	};

	return (
		<div className="flex flex-col items-center">
			{/* Floor button to open selection */}
			<button
				className="w-24 h-24 rounded-full bg-blue-500 text-white text-xl font-bold shadow-lg"
				onClick={() => setIsOpen(!isOpen)}>
				Floor
			</button>

			<div
				className="relative w-24 h-12 bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mt-2"
				style={{
					clipPath: 'ellipse(100% 50% at 50% 50%)', // Crescent shape
				}}>
				{selectedValue}
			</div>

			{/* Dropdown options */}
			{isOpen && (
				<div className="mt-2 w-24 bg-white shadow-md rounded-md  h-56 overflow-auto">
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

export default FloorSelector;
