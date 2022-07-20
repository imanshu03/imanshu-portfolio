import * as React from 'react';

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 1500 300"
    fill="currentColor"
    {...props}
  >
    <path d="m190-250 328 1 1113 72-131 477S1235.4-50.9 725 150C214.6 350.9 0 0 0 0z" />
  </svg>
);

export default SvgComponent;
