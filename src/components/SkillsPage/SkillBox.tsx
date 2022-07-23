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
        'flex flex-col flex-nowrap items-center justify-center mx-[0.2rem] md:mx-[0.4rem] lg:mx-[0.6rem] p-[0.6rem] disable-select',
        {
          'bg-gray-50/10': !icon,
        },
      )}
    >
      {icon &&
        React.createElement((Icons as any)[icon as any], {
          className:
            'w-[2rem] h-[2rem] md:w-[3.5rem] md:h-[3.5rem] lg:w-[4.5rem] lg:h-[4.5rem] md:mb-1 lg:mb-2',
        })}
      {/* <span className="p1-color p3-size text-center w-[7rem] lg:w-[10rem]">
        {text}
      </span> */}
    </div>
  );
};

export default memo(SkillBox);
