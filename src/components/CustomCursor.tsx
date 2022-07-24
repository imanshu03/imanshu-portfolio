import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    function setMousePosition(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });
    }

    function onMouseDown() {
      setZoom((prev) => !prev);
    }

    window.addEventListener('mousemove', setMousePosition);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseDown);

    return () => {
      window.removeEventListener('mousemove', setMousePosition);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseDown);
    };
  }, []);

  return (
    <>
      <div
        className="absolute z-[110] cursor-shadow hidden lg:block"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${
            zoom ? 1 : 0
          })`,
        }}
      ></div>
      <div
        className="absolute z-[100] rounded-cursor hidden lg:block"
        style={{
          transform: `scale(${zoom ? 0.4 : 1})`,
          left: pos.x,
          top: pos.y,
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
