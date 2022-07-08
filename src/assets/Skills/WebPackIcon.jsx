import * as React from 'react';

const SvgComponent = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={480}
    height={480}
  >
    <path fill="#eceff1" d="M24 4 7 14v20l17 10 17-10V14z" />
    <path
      fill="#0277bd"
      d="M23.5 24.5v9L15 29v-9.5zM24.5 24.5v9L33 29v-9.5zM24 23.5l-8.5-5L24 14l8.5 4.5z"
    />
    <g fill="#81d4fa">
      <path d="M23.5 7v6l-9 5-5-3zM23.5 41v-6l-9-5-5 3zM14 19l-5-3v16l5-3zM24.5 7v6l9 5 5-3zM24.5 41v-6l9-5 5 3zM34 19l5-3v16l-5-3z" />
    </g>
  </svg>
);

export default SvgComponent;
