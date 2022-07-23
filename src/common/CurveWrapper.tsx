import React from 'react';
import clsx from 'classnames';
import CurveUpPrimary from '@assets/Curves/CurveUpPrimary.svg';
import CurveUpSecondary from '@assets/Curves/CurveUpSecondary.svg';
import CurveDownPrimary from '@assets/Curves/CurveDownPrimary.svg';
import CurveDownSecondary from '@assets/Curves/CurveDownSecondary.svg';

interface IProps {
  direction?: 'up' | 'down';
  variant?: 'primary' | 'secondary';
  className?: string;
  invert?: boolean;
  shadowDirection?: 'up' | 'down';
}

const SVG_ELEMENTS = {
  up: {
    primary: CurveUpPrimary,
    secondary: CurveUpSecondary,
  },
  down: {
    primary: CurveDownPrimary,
    secondary: CurveDownSecondary,
  },
};

const CurveWrapper: React.FC<IProps> = (props) => {
  const {
    direction = 'up',
    className = '',
    variant = 'primary',
    invert = false,
    shadowDirection = 'down',
  } = props;

  return (
    <div
      className={clsx('w-full overflow-hidden', className, {
        'curve-up': direction === 'up',
        'curve-down': direction === 'down',
        'curve-ds-up-2 md:curve-ds-up-4 lg:curve-ds-up-6':
          shadowDirection === 'up',
        'curve-ds-down-2 md:curve-ds-down-4 lg:curve-ds-down-6':
          shadowDirection === 'down',
        'inverted-curve': invert,
      })}
    >
      {React.createElement(SVG_ELEMENTS[direction][variant])}
    </div>
  );
};

export default CurveWrapper;
