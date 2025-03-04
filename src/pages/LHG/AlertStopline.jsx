/** @format */
import React from 'react';
import ListLean from '../../components/stopline/ListLean';
import StoplineTitle from '../../components/stopline/StoplineTitle';

const AlertStopline = () => {
	return (
		<div className="">
			<StoplineTitle />
			<main className="mx-4 my-4 border-4 rounded-2xl border-[#002b5c] min-h-[500px] bg-red-600">
				<div className="">
					<ListLean />
				</div>
				<div className="border rounded-2xl m-2 p-2 min-h-20">
					nọi dung chính
				</div>
				<div className="grid grid-cols-3 gap-2 text-center mx-2 mb-2">
					<div className="border rounded-2xl min-h-80">1</div>
					<div className="border rounded-2xl min-h-80">2</div>
					<div className="border rounded-2xl min-h-80">3</div>
				</div>
			</main>
		</div>
	);
};

export default AlertStopline;
