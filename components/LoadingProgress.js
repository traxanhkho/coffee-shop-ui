"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const LoadingProgress = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#FCB42D"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default LoadingProgress;
