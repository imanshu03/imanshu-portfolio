import * as React from 'react';

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 45 45"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M44.952 22.108c0-1.25-.478-2.424-1.362-3.308L30.627 5.831a2.5 2.5 0 0 0-3.536 0 2.511 2.511 0 0 0 0 3.546l10.574 10.57H2.484C1.102 19.948 0 21.081 0 22.464v.028c0 1.382 1.102 2.523 2.484 2.523h35.182L27.094 35.579a2.504 2.504 0 0 0 3.538 3.54l12.958-12.97a4.633 4.633 0 0 0 1.362-3.309v-.732z" />
  </svg>
);

export default SvgComponent;
