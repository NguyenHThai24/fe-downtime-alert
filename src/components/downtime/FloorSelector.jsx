import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const FLOOR_COOKIE = 'floorDowntime';

const FloorSelector = ({ listFloor, onSelectFloor }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedFloor = Cookies.get(FLOOR_COOKIE);
    if (savedFloor) {
      setSelectedValue(savedFloor);
      onSelectFloor(savedFloor);
    }
  }, [onSelectFloor]);

  const uniqueFloors = [...new Set(listFloor.map((item) => item.floor))];

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelectFloor(value);
    Cookies.set(FLOOR_COOKIE, value, { expires: 1 });
    setIsOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        className="w-24 h-24 rounded-full bg-[#002b5c] text-white text-2xl font-bold shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        Floor
      </button>

      <div
        className="relative w-24 h-12 bg-[#002b5c] text-white text-2xl font-bold flex items-center justify-center mt-2"
        style={{
          clipPath: 'ellipse(100% 50% at 50% 50%)',
        }}
      >
        {selectedValue}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-28 text-white border-2 bg-blue-800 border-blue-800 shadow-md rounded-md h-56 overflow-auto z-50">
          {uniqueFloors.map((floor) => (
            <div
              key={floor}
              className="p-2 hover:bg-white hover:text-black cursor-pointer text-center"
              onClick={() => handleSelect(floor)}
            >
              {floor}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloorSelector;
