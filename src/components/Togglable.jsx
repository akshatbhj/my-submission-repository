import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const cancelButtonStyle = {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 4,
    border: "none",
    marginTop: 10,
    marginBottom: 10,
    cursor: "pointer",
    width: "25%",
    font: "bold",
    backgroundColor: "#f44336",
    color: "white",
  };

  const viewButtonStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
    cursor: "pointer",
    width: "10%",
    backgroundColor: "gray",
    color: "white",
    border: "none",
    borderRadius: 4,
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button style={viewButtonStyle} onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children} <br />
        <button style={cancelButtonStyle} onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Togglable;
