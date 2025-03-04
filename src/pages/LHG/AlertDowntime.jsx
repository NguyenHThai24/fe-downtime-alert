/** @format */

import React from 'react';
import DowntimeTitle from '../../components/downtime/DowntimeTitle';
import FloorSelector from '../../components/downtime/FloorSelector';
import LineSelector from '../../components/downtime/LineSelector';

const AlertDowntime = () => {
	return (
		<div className="">
			<DowntimeTitle />
			<main className="mx-4 my-4 p-4 grid grid-cols-12 border-2 rounded-2xl  min-h-[500px]">
				<div className="col-span-2">
					<FloorSelector />
				</div>
				<div className="col-span-8 text-center">1</div>
				<div className="col-span-2">
					<LineSelector />
				</div>
			</main>
		</div>
	);
};

export default AlertDowntime;
