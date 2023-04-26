import React, { useState, useRef } from 'react';
import { Checkbox, Text } from 'evergreen-ui'
import '../fonts.css';
import '../App.css';

//controlledState must be a boolean
function HookCheckbox({ controlledState, setControlledState, label, width, error, setErrorState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Checkbox
        width={width}
        label={label}
        checked={controlledState}
        onChange={e => {
          setControlledState(e.target.checked)
          setErrorState(!e.target.checked)
        }}
        style={{ wordBreak: "break-word", textAlign: "left" }}
      />
      {error.state && <Text style={{ color: "red", fontSize: "12px", marginTop: "-12px", PaddingTop:"0px", marginLeft: "5%" }}>{error.message}</Text>}
    </div>
  )
}
export default HookCheckbox;