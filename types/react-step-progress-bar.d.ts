// react-step-progress-bar.d.ts

declare module "react-step-progress-bar" {
  import { CSSProperties, FC, ReactNode } from "react";

  export interface ProgressBarProps {
    percent: number;
    filledBackground?: string;
    unfilledBackground?: string;
    height?: string | number;
    stepPositions?: number[];
    hasStepZero?: boolean;
    children?: ReactNode;
    width?: string | number;
    className?: string;
    style?: CSSProperties;
  }

  export interface StepRenderProps {
    accomplished: boolean;
    index: number;
  }

  export interface StepProps {
    position?: number;
    children: (props: StepRenderProps) => ReactNode;
    transition?: string;
    className?: string;
  }

  export const ProgressBar: FC<ProgressBarProps>;
  export const Step: FC<StepProps>;
}
