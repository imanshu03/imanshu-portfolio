import React from 'react';
import animationData from '@assets/ErrorLottie.json';

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
      const Lottie = React.lazy(() => import('react-lottie'));
      return (
        <main className="flex flex-col items-center justify-center h-[100vh] w-[100vw] bg-white">
          <React.Suspense fallback={<div />}>
            <Lottie options={defaultOptions} width={500} height={500} />
          </React.Suspense>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
