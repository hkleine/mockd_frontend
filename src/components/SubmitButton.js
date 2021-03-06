import React from 'react';

const SubmitButton = (props) => {
  if (props.isValid) {
    return <button className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-10 rounded shadow" disabled={!props.isValid} onClick={props.isValid ? props.onClick : null} type="submit">{props.children}</button>;
  }
  return <button className="bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-10 rounded shadow" disabled type="submit">{props.children}</button>;
};

export default SubmitButton;
