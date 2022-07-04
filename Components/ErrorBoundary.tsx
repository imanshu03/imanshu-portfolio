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
      const Lottie = React.lazy(() => import('lottie-react'));
      return (
        <main className="flex flex-col items-center justify-center h-[100vh] w-[100vw] bg-white">
          <React.Suspense fallback={<div />}>
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-[500px] h-[500px]"
            />
          </React.Suspense>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
