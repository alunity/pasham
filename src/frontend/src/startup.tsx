import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

interface iProps {
  setFirstInteraction: Function;
}

function StartUp(props: iProps) {
  const modalElement = useRef<HTMLDivElement>(null);
  const opened = useRef(false);

  useEffect(() => {
    if (modalElement.current !== null && !opened.current) {
      // @ts-ignore
      let modal = new Modal(modalElement.current, { backdrop: "static" });
      modal.show();
      opened.current = true;
    }
  }, [modalElement]);

  return (
    <div
      data-bs-theme="dark"
      className="modal"
      ref={modalElement}
      tabIndex={-1}
      data-bs-dismiss="modal"
      onClick={() => props.setFirstInteraction(true)}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">Click to begin</div>
        </div>
      </div>
    </div>
  );
}

export default StartUp;
