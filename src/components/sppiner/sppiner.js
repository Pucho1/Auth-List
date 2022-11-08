import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

export const InnerSpinner = (props) => {

  const { promiseInProgress } = usePromiseTracker();
    return (
      (promiseInProgress === true) ?
      <div className="spinner">
          <h3>hey I'm hear !!!!</h3>
      </div>
      :
      null
    )
};

// export const Spinner = promiseTrackerHoc(InnerSpinner);