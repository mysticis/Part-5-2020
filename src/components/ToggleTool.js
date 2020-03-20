import React, { useState } from "react"
const ToggleTool = props => {
  const [visible, setVisible] = useState(false)
  const hideComponent = { display: visible ? "none" : "" }
  const showComponent = { display: visible ? "" : "none" }
  const toggleVisiblity = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideComponent}>
        <button onClick={toggleVisiblity}>{props.buttonLabel}</button>
      </div>
      <div style={showComponent}>
        {props.children}
        <br />
        <button onClick={toggleVisiblity}>Cancel</button>
      </div>
    </div>
  )
}
export default ToggleTool