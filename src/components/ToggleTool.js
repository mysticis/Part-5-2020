import React, { useState } from "react"
const ToggleTool = props => {
  const [visible, setVisible] = useState(false)
  const hideLoginForm = { display: visible ? "none" : "" }
  const showLoginForm = { display: visible ? "" : "none" }
  const toggleVisiblity = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideLoginForm}>
        <button onClick={toggleVisiblity}>{props.buttonLabel}</button>
      </div>
      <div style={showLoginForm}>
        {props.children}
        <br />
        <button onClick={toggleVisiblity}>Cancel</button>
      </div>
    </div>
  )
}
export default ToggleTool
