import React from "react";

const Modal = ({ btnClass, item, label, message, onClick, disabled }) => {
  const buttonClass = "btn btn-block m-1 " + btnClass;
  const modalId = item._id + label;
  return (
    <div>
      <button
        type="button"
        className={buttonClass}
        disabled={disabled ? disabled.disable : false}
        data-toggle="modal"
        data-target={`#${modalId}`}
      >
        {label}
      </button>

      <div
        className="modal fade"
        id={`${modalId}`}
        // id="aaa"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Attention!!!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body container-fluid">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className={"btn " + btnClass}
                onClick={() => onClick()}
                data-dismiss="modal"
              >
                {label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
