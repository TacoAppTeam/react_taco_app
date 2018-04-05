import React from 'react';

export const dateFormat = function(props) {
  const value = props && (props.value || props);
  if (value) {
    return <div>{new Date(value).toLocaleDateString()}</div>;
  }
  return <div />;
};
