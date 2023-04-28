import { Checkbox, Text } from 'evergreen-ui'
import '../fonts.css';
import '../App.css';

//component used in BR form to validate the user has checked the required check boxes

/*
controlledState/setControlledState: The hook which holds the boolean value assigned to the checkbox
error: NOT a hook controlled by setErrorState. error is an object passed in which contains
    state: the boolean value of the error hook
    message: the message displayed to the user if they try to submit without checking the box
setErrorState: updates the bool value of the error
label: label
width: width
*/

function HookCheckbox({ controlledState, setControlledState, error, setErrorState, label, width }) {
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