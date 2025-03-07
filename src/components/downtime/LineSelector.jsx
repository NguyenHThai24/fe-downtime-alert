import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const LINE_COOKIE = 'lineDowntime';

const LineSelector = ({ listLine, onSelectLine, selectedFloor }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLine = Cookies.get(LINE_COOKIE);
    if (savedLine) {
      setSelectedValue(savedLine);
      onSelectLine(savedLine);
    }
  }, [onSelectLine]);

<<<<<<< HEAD
  // 🔥 Lọc danh sách line dựa trên selectedFloor
  const filteredLines = selectedFloor
    ? listLine
        .filter((item) => item.floor === selectedFloor)
        .map((item) => item.line)
    : [];

  // 🔥 Lấy danh sách line không trùng lặp
  const uniqueLines = [...new Set(filteredLines)];
=======
  const uniqueLines = Array.isArray(listLine)
    ? [...new Set(listLine.map((item) => item.line))]
    : [];
>>>>>>> 0d3321fe2e98f4ef75a3de95a9c26c57bf54be45

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelectLine(value);
    Cookies.set(LINE_COOKIE, value, { expires: 1 });
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        className="w-24 h-24 rounded-full bg-[#002b5c] text-white text-2xl font-bold shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!selectedFloor} // 🔥 Disable nếu chưa chọn Floor
      >
        Line
      </button>

      <div
        className="relative w-24 h-12 bg-[#002b5c] text-white text-2xl font-bold flex items-center justify-center mt-2"
        style={{
          clipPath: 'ellipse(100% 50% at 50% 50%)',
        }}
      >
        {selectedValue || '---'}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-28 text-white border-2 bg-blue-800 border-blue-800 shadow-md rounded-md h-56 overflow-auto z-50">
          {uniqueLines.length > 0 ? (
            uniqueLines.map((line) => (
              <div
                key={line}
                className="p-2 hover:bg-white hover:text-black cursor-pointer text-center"
                onClick={() => handleSelect(line)}
              >
                {line}
              </div>
            ))
          ) : (
<<<<<<< HEAD
            <p className="text-center p-2 text-gray-300">Không có line</p>
=======
            <div className="p-2 text-center text-gray-300">No data</div>
>>>>>>> 0d3321fe2e98f4ef75a3de95a9c26c57bf54be45
          )}
        </div>
      )}
    </div>
  );
};

export default LineSelector;
