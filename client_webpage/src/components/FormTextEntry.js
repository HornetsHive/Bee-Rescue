import React from 'react';
import { TextInputField, majorScale } from 'evergreen-ui';

function FormTextEntry({ form, setForm, errors, setErrors, label, name, required, width, placeholder }) {
  const error = errors[name];
  const isInvalid = Boolean(error);
  const validationMessage = error ? error : null;

  const handleChange = (e) => {
    const value = e.target.value;
    const newForm = { ...form, [name]: value };
    const newErrors = { ...errors, [name]: '' };
    setForm(newForm);
    setErrors(newErrors);
  };

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
      onChange={handleChange}
    />
  );
}

export default FormTextEntry;


