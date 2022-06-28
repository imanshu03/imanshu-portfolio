import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../Assets/ErrorLottie.json';

type STATE = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  STATE
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      };
      return (
        <main className="flex flex-col items-center justify-center h-[100vh] w-[100vw] bg-white">
          <Lottie options={defaultOptions} width={500} height={500} />
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
