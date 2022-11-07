import React from 'react';
import { promiseTrackerHoc } from 'react-promise-tracker';
import { Audio } from 'react-loader-spinner';
// import './spinner.css';

const InnerSpinner = (props) => (

  props.trackedPromiseInProgress &&
  <div className="spinner">
  {console.log(props, 'estoy ene le spiner')}
    <Audio
       height="80"
       width="80"
       radius="9"
       color="green"
       ariaLabel="loading"
       wrapperStyle
       wrapperClass
    />
  </div>
);

export const Spinner = promiseTrackerHoc(InnerSpinner);