import React from "react";

const Header = ({ header, userName }) => {
  return (
    <div className="container  m-2">
      <div className="row justify-content-between">
        <div className="col-4 align-self-end">
          <h1 className="display-4 ">{header}</h1>
        </div>
        {userName && (
          <div className="col-4  align-self-end">
            <h6 className="display-6">{userName}</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
