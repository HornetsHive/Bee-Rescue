import { SelectField, majorScale } from 'evergreen-ui';

//drop down component used in BRForm

/*
Form/setForm: hook in BRForm for tracking input
Error/setError: hook in BRForm for tracking input validation
label: label
name: important, used to set the correct field in the form
defaultText: Text prompting user to make a selection
options: An array containing the different options displayed with the DB insert value and a description (both strings)
  [["field1", "text describing field 1"], ["field2", "text"]]
required: just shows the "required" star next to the label, actual error handling is handled in the hook
width: width
*/
function FormDropDown ({ form, setForm, errors, setErrors, label, name, defaultText, options, required, width}) {
  const error = errors[name];
  const isInvalid = Boolean(error);
  const validationMessage = error ? error : null;

  const handleChange = (e) => {
    const value = e.target.value;
    //on change set new form value and reset errors
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
        width={width || "65%"}
        value={form[name] || ''} 
        onChange={handleChange}
    >
        <option disabled={true} value="">{defaultText}</option>
        {options.map(([val, text], key) => (
            <option key={key} value={val}>{text}</option>
        ))}
        
    </SelectField> 
  );
}

export default FormDropDown;