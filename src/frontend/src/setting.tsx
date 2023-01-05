import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

interface Iprops {
  open: boolean;
  setOpen: Function;
  languages: object;
  language: string;
  setLanguage: Function;
  isAlwaysListeningAllowed: boolean;
  setIsAlwaysListeningAllowed: Function;
}

function Settings(props: Iprops) {
  let [modal, setModal] = useState(null);
  let modalElement = useRef();

  useEffect(() => {
    if (modalElement.current !== null) {
      // @ts-ignore
      setModal(new Modal(modalElement.current, { backdrop: "static" }));
    }
  }, [modalElement]);

  useEffect(() => {
    if (modal !== undefined && props.open) {
      // @ts-ignore
      modal.show();
    }
  }, [props.open]);

  let options = Object.values(props.languages).map((x) => {
    if (x.name.includes("-")) {
      return (
        <option key={x.lang} value={x.lang}>
          {x.name.split("-")[1]}
        </option>
      );
    } else if (x.name.includes("Google")) {
      return (
        <option key={x.lang} value={x.lang}>
          {x.name.replace("Google", "")}
        </option>
      );
    }
  });

  let languageLocal = true;

  // @ts-ignore
  if (props.languages[props.language] !== undefined) {
    // @ts-ignore
    languageLocal = props.languages[props.language].localService;
  }

  return (
    <>
      <div
        data-bs-theme="dark"
        className="modal"
        ref={modalElement}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Settings</h5>
            </div>
            <div className="modal-body">
              <p>
                <span className="float-left">Language:</span>
                <select
                  className="float-right"
                  value={props.language}
                  onChange={(e) => props.setLanguage(e.target.value)}
                >
                  {options}
                </select>
              </p>
              <br></br>
              {!languageLocal && (
                <p className="text-danger">
                  Warning: You do not have a local text-to-speech engine for
                  this language meaning you will have to use a cloud text to
                  speech engine. This will lead to a degraded experiences,
                  pasham can stop speaking mid-message. For a better experience
                  please install the appropriate text-to-speech engine for this
                  language.
                </p>
              )}
              <br></br>
              <p>
                <span className="float-left">
                  Activate Pasham by saying "hey pasham"
                </span>
                <input
                  className="float-right"
                  checked={props.isAlwaysListeningAllowed}
                  onChange={() =>
                    props.setIsAlwaysListeningAllowed(
                      !props.isAlwaysListeningAllowed
                    )
                  }
                  type={"checkbox"}
                ></input>
              </p>
              <br></br>
              <br></br>
              <p>
                <span className="float-left">Reset name and language:</span>
                <button
                  className="btn btn-danger float-right"
                  onClick={() => {
                    localStorage.clear();
                    location.reload();
                  }}
                >
                  Reset
                </button>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => props.setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
