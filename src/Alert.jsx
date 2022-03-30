import React, { useEffect } from "react";

const Alert = ({ alert, closeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      closeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  });

  return <div className="text-center">{alert.msg}</div>;
};

export default Alert;
