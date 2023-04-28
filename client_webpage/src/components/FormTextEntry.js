import React from 'react';
import { TextInputField, majorScale } from 'evergreen-ui';

function FormTextEntry({ form, setForm, errors, setErrors, label, name, required, width, placeholder, phone=false, inputRef }) {
  const error = errors[name];
  const isInvalid = Boolean(error);
  const validationMessage = error ? error : null;

  const handleChange = (e) => {
    var value = e.target.value;
    if(phone){
      value = formatPhoneNumber(value)
    }
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



  return (
    <TextInputField
      label={label}
      required = {required ? required : null}
      margin={majorScale(1)}
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


