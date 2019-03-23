import React from "react"
import { OAS3ComponentWrapFactory } from "../helpers"

export default OAS3ComponentWrapFactory((props) => {
  const { Ori } = props

  return <span>
    <Ori {...props} />
    <small style={{ backgroundColor: "#f7f7f7" }}>
      <pre className="version">OAS3</pre>
    </small>
  </span>
})
