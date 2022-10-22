import React from 'react';
import * as Icons from '@assets/Connect';
import socialData from './details.json';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText?: string;
    socialData: Array<{
      icon: string;
      value: string;
      href: string;
      target?: string;
      alt: string;
    }>;
  };
}

const ConnectPage: React.FC<{}> = (props) => {
  return <div className=""></div>;
};

export default ConnectPage;
