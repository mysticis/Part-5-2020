import React from "react"

const Notification = ({ message, messageSuccess }) => {
  if (message === null) {
    return null
  }

  return <div className={messageSuccess ? "success" : "error"}>{message}</div>
}

export default Notification
