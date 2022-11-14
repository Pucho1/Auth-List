import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { DotLoader } from  'react-spinners'
export const InnerSpinner = (props) => {

  const { promiseInProgress } = usePromiseTracker();
    return (
      (promiseInProgress === true) ?
      <div className="spinner">
        <DotLoader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
      :
      null
    )
};

// export const Spinner = promiseTrackerHoc(InnerSpinner);