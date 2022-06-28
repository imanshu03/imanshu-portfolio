import React from 'react';
import { forwardRef } from 'react';
import TextWithShadow from '../Common/TextWithShadow';
import SubText from '../Common/SubText';

const ExperiencePage = forwardRef<React.RefObject<Element>, {}>(
  function ExperiencePage(props, wrapperRef) {
    return (
      <div
        className="flex flex-col flex-nowrap h-auto w-[100vw] p-[0.8rem] pt-8 lg:pr-[1.2rem] box-border"
        ref={wrapperRef as any}
      >
        <div className="w-full">
          <TextWithShadow
            className="text-YellowRed dark:text-PastelPink w-full tracking-widest"
            shadowClassName="ts-china-rose-2 md:ts-china-rose-3 lg:ts-china-rose-4 dark:ts-deep-ruby-2 dark:md:ts-deep-ruby-3 dark:lg:ts-deep-ruby-4"
          >
            experience
          </TextWithShadow>
          <SubText className="text-YellowRed dark:text-PastelPink">
            i love what i do
          </SubText>
        </div>
      </div>
    );
  },
);

export default React.memo(ExperiencePage);
