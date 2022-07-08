import React, { memo } from 'react';
import * as Icons from '@assets/Skills';
import clsx from 'classnames';

interface IProps {
  text: string;
  icon?: string;
}

const SkillBox: React.FC<IProps> = (props) => {
  const { text, icon } = props;

  return (
    <div
      className={clsx(
        'w-[7rem] h-[7rem] lg:w-[10rem] lg:h-[10rem] flex flex-col flex-nowrap items-center justify-center m-3 lg:m-6 drop-shadow-lg p-[0.6rem] lg:p-[1.2rem] pointer-events-none disable-select',
        {
          'bg-gray-50/10': !icon,
        },
      )}
    >
      {icon &&
        React.createElement((Icons as any)[icon as any], {
          className: 'w-[5rem] h-[5rem] lg:w-[6.5rem] lg:h-[6.5rem] mb-2',
        })}
      <span className="p1-color p3-size text-center w-[7rem] lg:w-[10rem]">
        {text}
      </span>
    </div>
  );
};

export default memo(SkillBox);
