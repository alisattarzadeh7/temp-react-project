declare module 'react-step-progress-bar' {
  interface ProgressBarProps {
    percent?: number;
    filledBackground?: any;
    height?: string | number;
    stepPositions?: number;
  }

  interface StepProps {
    transition?: any;
    position?: any;
    style?:any;
  }

  // eslint-disable-next-line react/prefer-stateless-function,no-undef
  class ProgressBar extends React.Component<ProgressBarProps, any> {}

  // eslint-disable-next-line react/prefer-stateless-function,no-undef
  class Step extends React.Component<StepProps, any> {}
}
