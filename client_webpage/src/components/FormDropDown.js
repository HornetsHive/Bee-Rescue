import React from 'react';
import { SelectField, majorScale } from 'evergreen-ui';

function FormDropDown ({ form, setForm, errors, setErrors, label, name, defaultText, options, required}) {
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
    <SelectField
        required={required ? required : null}
        isInvalid={Boolean(isInvalid)}
        validationMessage={validationMessage}
        label={label}
        margin={majorScale(1)}
        width="65%"
        defaultValue=""
        value={form[name] || ''} 
        onChange={handleChange}
    >
        <option disabled={true} value="">{defaultText}</option>
        {options.map(([val, text]) => (
            <option value={val}>{text}</option>
        ))}
        
    </SelectField> 
  );
}

export default FormDropDown;