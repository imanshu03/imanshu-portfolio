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
        'm-[0.2rem] md:m-[0.4rem] lg:m-[0.6rem] p-[0.6rem] disable-select',
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
      {!icon && text && (
        <div className="w-[2rem] h-[2rem] md:w-[3.5rem] md:h-[3.5rem] lg:w-[4.5rem] lg:h-[4.5rem] md:mb-1 lg:mb-2 flex items-center justify-center">
          <p className="p4-size p1-color text-center">{text}</p>
        </div>
      )}
    </div>
  );
};

export default memo(SkillBox);
