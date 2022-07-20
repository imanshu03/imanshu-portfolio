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
        'flex flex-col flex-nowrap items-center justify-center m-1 drop-shadow-lg p-[0.6rem] pointer-events-none disable-select',
        {
          'bg-gray-50/10': !icon,
        },
      )}
    >
      {icon &&
        React.createElement((Icons as any)[icon as any], {
          className: 'w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mb-2',
        })}
      {/* <span className="p1-color p3-size text-center w-[7rem] lg:w-[10rem]">
        {text}
      </span> */}
    </div>
  );
};

export default memo(SkillBox);
