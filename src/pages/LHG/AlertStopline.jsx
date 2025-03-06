/** @format */
import React, { useEffect, useState } from 'react';
import ListLean from '../../components/stopline/ListLean';
import StoplineTitle from '../../components/stopline/StoplineTitle';
import * as signalR from '@microsoft/signalr';

import Cookies from 'js-cookie';
import { fetchListLean, fetchDataLean } from '../../apis/AlertStopline';
import { Card, Typography } from '@mui/material';

const COOKIE_NAME = 'selectedLean';
const COOKIE_EXPIRY_DAYS = 1;

const AlertStopline = () => {
  const [listLean, setListLean] = useState([]);
  const [selectedLean, setSelectedLean] = useState(
    Cookies.get(COOKIE_NAME) || ''
  );
  const [dataLean, setDataLean] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchListLean();
        setListLean(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu danh sách Lean:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLeanDetails = async () => {
      if (!selectedLean) return;
      try {
        const data = await fetchDataLean(selectedLean);
        setDataLean(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu Lean:', error);
      }
    };

    fetchLeanDetails();

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://your-server.com/stoplineHub')
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.error('SignalR Connection Error:', err));

    connection.on('ReceiveStoplineUpdate', (data) => {
      console.log('Dữ liệu nhận được từ SignalR:', data);
      setDataLean(data);
    });

    return () => {
      connection.stop();
    };
  }, [selectedLean]);

  // Cập nhật giá trị Lean vào cookies khi chọn mới
  const handleSelectLean = (lean) => {
    setSelectedLean(lean);
    Cookies.set(COOKIE_NAME, lean, { expires: COOKIE_EXPIRY_DAYS });
  };

  const isComplete = dataLean?.tierMeetingStatus === 'Complete';
  const borderColor = isComplete ? 'green' : 'red';
  const textColor = isComplete ? 'green' : 'red';

  return (
    <div className="w-full">
      <StoplineTitle />
      <main
        className={`mx-2 my-4 h-[620px] border-4 rounded-2xl  ${
          isComplete
            ? 'border-[#002b5c] bg-blue-200'
            : 'border-red-600 bg-red-400  animate-pulse'
        }`}
      >
        <div className="mb-5">
          <ListLean
            listLean={listLean}
            onSelectLean={handleSelectLean}
            selectedLean={selectedLean}
          />
        </div>

        {dataLean ? (
          <div className="p-2 space-y-3 ">
            <div className="grid grid-cols-2 gap-2">
              <Card
                sx={{
                  height: '100px',
                  fontSize: '18px',
                  fontWeight: 'medium',
                  padding: '10px',
                  border: `4px solid ${borderColor}`,
                  borderRadius: '12px',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
                  transition:
                    'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <p className="font-semibold text-xl">🎯 RFT tiêu chuẩn</p>{' '}
                <p className="font-bold text-4xl text-right">
                  {dataLean.rftDefault}%
                </p>
              </Card>
              <Card
                sx={{
                  height: '100px',
                  fontSize: '18px',
                  fontWeight: 'medium',
                  padding: '10px',
                  border: `4px solid ${borderColor}`,
                  borderRadius: '12px',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
                  transition:
                    'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  animation: !isComplete
                    ? 'blinking-border 1s infinite alternate'
                    : 'none',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <p className="font-semibold text-xl">📊 RFT hiện tại</p>
                <p className="font-bold text-4xl text-right">
                  {dataLean.rftNow}%
                </p>
              </Card>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Card
                sx={{
                  height: '100px',
                  fontSize: '18px',
                  fontWeight: 'medium',
                  padding: '10px',
                  border: `4px solid ${borderColor}`,
                  borderRadius: '12px',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
                  transition:
                    'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  animation: !isComplete
                    ? 'blinking-border 1s infinite alternate'
                    : 'none',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <p className="font-semibold text-xl">
                  📅 Thời gian ngưng chuyền
                </p>{' '}
                <p className="font-bold text-4xl text-right">
                  {new Date(dataLean.startDate)?.toLocaleTimeString('vi-VN')}
                </p>
              </Card>
              <Card
                sx={{
                  height: '100px',
                  fontSize: '18px',
                  fontWeight: 'medium',
                  padding: '10px',
                  border: `4px solid ${borderColor}`,
                  borderRadius: '12px',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
                  transition:
                    'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  animation: !isComplete
                    ? 'blinking-border 1s infinite alternate'
                    : 'none',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <p className="font-semibold text-xl">⚡ Trạng thái</p>
                <p
                  className={`ml-2 px-3 py-1 rounded-lg text-white ${
                    dataLean.tierMeetingStatus === 'Complete'
                      ? 'bg-green-500'
                      : 'bg-red-800 animate-pulse'
                  }`}
                >
                  {dataLean.tierMeetingStatus === 'Complete'
                    ? 'Đã xử lý'
                    : 'Đang ngưng chuyền'}
                </p>
              </Card>
            </div>
            <Typography
              sx={{
                color: `${textColor} `,
                fontWeight: 'bold',
                fontSize: '30px',
                textAlign: 'center',
                textDecoration: 'underline',
              }}
            >
              Top 3 lỗi
            </Typography>
            <div className="grid grid-cols-3 gap-2  text-center">
              {[1, 2, 3].map((i) => (
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '260px',
                    justifyContent: 'space-between',
                    fontSize: '18px',
                    fontWeight: 'medium',
                    padding: '10px',
                    border: `4px solid ${borderColor}`,
                    borderRadius: '12px',
                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
                    transition:
                      'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    overflow: 'auto',
                    animation: !isComplete
                      ? 'blinking-border 1s infinite alternate'
                      : 'none',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  <div className="overflow-auto flex-grow">
                    <p className="font-bold">{dataLean[`nameVit${i}`]}</p>
                    <p>~~~~~~~~~~~~~~~~</p>
                    <p className="font-bold">{dataLean[`nameEng${i}`]}</p>
                    <p>~~~~~~~~~~~~~~~~</p>
                    <p className="font-bold">
                      Số lần lỗi:{' '}
                      <span className="font-normal">{dataLean[`prs${i}`]}</span>
                    </p>
                    <p className="font-bold">
                      Tỷ lệ:{' '}
                      <span className="font-normal">
                        {dataLean[`curentQty${i}`]}%
                      </span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-5xl pt-[40%]">
            ⏳ Vui lòng chọn Lean...
          </p>
        )}
      </main>
    </div>
  );
};

export default AlertStopline;
