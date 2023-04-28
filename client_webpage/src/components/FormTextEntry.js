import React from 'react';
import { TextInputField, majorScale } from 'evergreen-ui';

//Component used for text entry in BRForm

/*
Form/setForm: hook in BRForm for tracking input
Error/setError: hook in BRForm for tracking input validation
label: label
name: important, used to set the correct field in the form
required: just shows the "required" star next to the label, actual error handling is handled in the hook
width: width
placeholder: placeholder text
phone: whether to do auto-formatting for phone numbers
state: whether to do auto-formatting for the state.
*/
function FormTextEntry({ form, setForm, errors, setErrors, label, name, required, width, placeholder, phone=false, state=false, inputRef }) {
  //values from the error hook to determine whether to render the error message
  const error = errors[name];
  const isInvalid = Boolean(error);
  const validationMessage = error ? error : null;

  const handleChange = (e) => {
    var value = e.target.value;
    if(phone){
      value = formatPhoneNumber(value);
    }
    if(state){
      value = formatState(value);
    }
    //set the new form value and reset the errors array so error clears on update
    const newForm = { ...form, [name]: value };
    const newErrors = { ...errors, [name]: '' };
    setForm(newForm);
    setErrors(newErrors);
  };

  //set the format for the phone number text entry
  function formatPhoneNumber(value) {
    if (!value) return value;

    // clean and format phone number input
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    //less than 4, do nothing 000
    if (phoneNumberLength < 4) return phoneNumber;

    //less than 7, (000) 000
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    //full format (000) 000-0000
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  function formatState(value) {
    if (!value) return value;
  
    // clean and format state input
    const state = value.replace(/[^\w]/g, "").toUpperCase();
  
    //only allow two chars
    return state.slice(0, 2);
  }

  return (
    <TextInputField
      label={label}
      required = {required ? required : null}
      margin={majorScale(1)}
      marginY="2px"
      width={width}
      placeholder={placeholder}
      isInvalid={isInvalid}
      validationMessage={validationMessage}
      type="text"
      name={name}
      value={form[name] || ''}
      ref={inputRef}
      onChange={handleChange}
    />
  );
}

export default FormTextEntry;


