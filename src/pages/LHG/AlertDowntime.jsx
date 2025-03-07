import React, { useEffect, useState } from 'react';
import DowntimeTitle from '../../components/downtime/DowntimeTitle';
import FloorSelector from '../../components/downtime/FloorSelector';
import LineSelector from '../../components/downtime/LineSelector';

import {
  fetchDataDownTime,
  fetchListFloorLine,
} from '../../apis/AlertDowntime';
import Cookies from 'js-cookie';

import ThoMay from '../../assets/tho-may.png';

const FLOOR_COOKIE = 'floorDowntime';
const LINE_COOKIE = 'lineDowntime';
const COOKIE_EXPIRY_DAYS = 1;

const AlertDowntime = () => {
  const [listFloor, setListFloor] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(
    Cookies.get(FLOOR_COOKIE) || ''
  );
  const [selectedLine, setSelectedLine] = useState(
    Cookies.get(LINE_COOKIE) || ''
  );
  const [dataDowntime, setDataDowntime] = useState([]);
  // console.log('====================================');
  // console.log(dataDowntime);
  // console.log('====================================');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchListFloorLine();
      setListFloor(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let interval;
    const fetchDataDowntime = async () => {
      if (selectedFloor && selectedLine) {
        const data = await fetchDataDownTime(selectedFloor, selectedLine);
        setDataDowntime(data);

        // Kiểm tra nếu có sự cố (status === 1)
        const hasError = data.some((item) => item.status === 1);
        setIsError(hasError);
      }
    };

    fetchDataDowntime();
    interval = setInterval(fetchDataDowntime, 1000);
    return () => clearInterval(interval);
  }, [selectedFloor, selectedLine]);

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    Cookies.set(FLOOR_COOKIE, floor, { expires: COOKIE_EXPIRY_DAYS });
  };

  const handleLineSelect = (line) => {
    setSelectedLine(line);
    Cookies.set(LINE_COOKIE, line, { expires: COOKIE_EXPIRY_DAYS });
  };

  // Lọc dữ liệu theo điều kiện status
  const status1Data = dataDowntime.find((item) => item.status === 1);
  const status234Data = dataDowntime.filter((item) =>
    [2, 3, 4].includes(item.status)
  );

  return (
    <div className="w-full">
      <DowntimeTitle />
      <main
        className={`mx-2 my-4 h-[620px] p-4 grid-rows-2 gap-4 border-4 rounded-2xl ${
          isError
            ? 'bg-red-500 border-red-800 animate-pulse'
            : 'bg-blue-200 border-[#002b5c]'
        }`}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-2 relative">
            <FloorSelector
              listFloor={listFloor}
              onSelectFloor={handleFloorSelect}
              selectedFloor={selectedFloor}
            />
          </div>

          {/* Hiển thị duy nhất 1 bản ghi có status = 1 */}
          <div className="col-span-8 text-center">
            {status1Data ? (
              <div className="p-4 bg-white shadow-md rounded-lg border-4 border-red-600  animate-bounce">
                <h2 className="font-bold text-lg text-red-600">
                  🚨 SỰ CỐ CẦN THỢ 🚨
                </h2>
                <p>Mã máy: {status1Data.idMachine}</p>
                <p>Người yêu cầu: {status1Data.idUserRequest}</p>
                <p>
                  Thời gian yêu cầu:{' '}
                  {new Date(status1Data.dateUserRequest)?.toLocaleTimeString(
                    'vi-VN'
                  )}
                </p>
                <p>Mã thợ: {status1Data.idOwnerMechanic || 'Đợi xác nhận'}</p>
                <p>
                  Thợ: {status1Data.fixer === 'TM' ? 'Thợ Máy' : 'Thợ Điện'}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-900 text-[20px]">Không có sự cố máy</p>
                <img src={ThoMay} width="150px" style={{ margin: '0 auto' }} />
              </div>
            )}
          </div>

          <div className="col-span-2 relative">
            <LineSelector
              listLine={listFloor}
              onSelectLine={handleLineSelect}
              selectedLine={selectedLine}
              selectedFloor={selectedFloor}
            />
          </div>
        </div>

        {/* Hiển thị bảng cho status = 2, 3, 4 */}
        <div className="col-span-8 text-center mt-4 z-0 bg-amber-50 p-1.5">
          {status234Data.length > 0 ? (
            <div className="overflow-y-auto h-[350px]">
              <table className="min-w-full bg-white border border-black shadow-md rounded-lg">
                <thead style={{ top: 0, position: 'sticky' }}>
                  <tr className="bg-[#002b5c] text-white uppercase text-sm">
                    <th className="border border-black px-4 py-2">Mã máy</th>
                    <th className="border border-black px-4 py-2">
                      Người yêu cầu
                    </th>
                    <th className="border border-black px-4 py-2">
                      Thời gian yêu cầu
                    </th>
                    <th className="border border-black px-4 py-2">Mã thợ</th>
                    <th className="border border-black px-4 py-2">Thợ</th>
                    <th className="border border-black px-4 py-2">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {status234Data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border px-4 py-2 text-center">
                        {item.idMachine}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {item.idUserRequest}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {new Date(item.dateUserRequest)?.toLocaleTimeString(
                          'vi-VN'
                        )}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {item.idOwnerMechanic || '-'}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {item.fixer === 'TM' ? 'Thợ Máy' : 'Thợ Điện'}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {item.status === 2
                          ? 'Đã xác nhận'
                          : item.status === 3
                          ? 'Đang sửa'
                          : 'Hoàn thành'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600"></p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AlertDowntime;
