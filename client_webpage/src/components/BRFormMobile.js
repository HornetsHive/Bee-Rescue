import React, { useState } from 'react';
import { Pane, Heading, majorScale, Button, toaster, Paragraph} from 'evergreen-ui'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

import '../fonts.css';
import '../App.css';
import FormTextEntry from './FormTextEntry';
import FormDropDown from './FormDropDown';

export default function BRFormMobile() {

  const navigate = useNavigate();

  function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  const [form, setForm] = useState({
    address: "",
    fname: "",
    lname: "",
    city: "",
    zip: "",
    email: "",
    phone_no: "",
    propertyType: "",
    propertyLoc: "",
    duration: "",
    height: "",
    size: "",
    image: ""
  });

  const submitReport = e => {
    e.preventDefault();

    //validate form
    const err = validate();
    if(err) {
      toaster.danger('Please input all required fields');
      return;
    }

    Axios.post("http://45.33.38.54:3001/insert", {
      address: form.address,
      fname: form.fname,
      lname: form.lname,
      city: form.city,
      zip: form.zip,
      email: form.email,
      phone_no: form.phone_no,
      propertyType: form.propertyType,
      propertyLoc: form.propertyLoc,
      duration: form.duration,
      location: form.location,
      height: form.height,
      size: form.size,
      image: form.image
    }).then(response => {
      toaster.success("Your form has been submitted!");
      navigate('/confirm');
    }).catch(error => {
      toaster.danger("Something went wrong submitting your report");
      console.error(error);
    });
  }

  const [errors, setErrors] = useState({
    address: "",
    fname: "",
    lname: "",
    city: "",
    zip: "",
    email: "",
    phone_no: "",
    propertyType: "",
    propertyLoc: "",
    duration: "",
    height: "",
    size: "",
    image: ""
  });

  const validate = () => {
    const newErrors = {...errors};
    if(!form.address){
      newErrors.address = "This field is required"
    }
    if(!form.fname){
      newErrors.fname = "This field is required"
    }
    if(!form.lname){
      newErrors.lname = "This field is required"
    }
    if(!form.city){
      newErrors.city = "This field is required"
    }
    if(!form.zip){
      newErrors.zip = "This field is required"
    }
    if(isNaN(form.zip) || form.zip.length < 3 || form.zip.length > 5){
      newErrors.zip = "Please enter a valid zip"
    }
    if(!isValidEmail(form.email)){
      newErrors.email = "Please enter a valid email"
    }
    if(!form.email){
      newErrors.email = "This field is required"
    }
    if(!form.phone_no){
      newErrors.phone_no = "This field is required"
    }
    if(!form.propertyType){
      newErrors.propertyType = "This field is required"
    }
    if(!form.propertyLoc){
      newErrors.propertyLoc = "This field is required"
    }
    if(!form.height){
      newErrors.height = "This field is required"
    }
    if(isNaN(form.duration)){
      newErrors.duration = "Please enter a numeric value"
    }
    
    setErrors(newErrors)
    return !Object.values(newErrors).every(error => error === '');
  };

  return(
    <section id="form">
    <Pane
      className="form"
      elevation={1}
      borderRadius='1em'
      height="fit-content"
      margin={32}
      align="center"
      flexDirection="row"
    >
      <Pane><Heading margin={majorScale(1)} size="600"><br></br>Submit a new Bee Rescue report</Heading></Pane>
      
      {/*------------ REPORTER INFO ------------*/}
      <Pane className="reporterInfo" elevation='2' margin='2em' padding='0.5em' borderRadius='1em'>
        {/*------------ NAME ------------*/}
        <Pane
          width="90%"
          margin={majorScale(2)}
          float="center"
          display="flex"
          justifyContent="normal"
          alignItems="normal"
          flexDirection="column"
        >

          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="First Name:"
            name="fname"
          />

          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="Last Name:"
            name="lname"
          />

          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="Email:"
            name="email"
          />

          {/*phone*/}
          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="Phone:"
            name="phone_no"
          />
        </Pane>

        {/*------------ ADDRESS ------------*/}
        <Pane
          margin={majorScale(1)}
          float="center"
          width="90%"
          marginTop={60}
          display="flex"
          justifyContent="normal"
          alignItems="normal"
          flexDirection="column"
        >

          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="Address:"
            name="address"
          />

          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="City:"
            name="city"
          />

          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="Zip Code:"
            name="zip"
          />
        </Pane>
      </Pane>

      {/*------------ PROPERTY INFO ------------*/}
      <Pane className="propertyInfo" elevation='2' margin='2em' padding='0.5em' borderRadius='1em'>
        <Pane
          margin={majorScale(1)}
          float="center"
          width="fit-content"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >

          <FormDropDown
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            width="90%"
            label="Type of Property"
            name="propertyType"
            defaultText="Select a property type"
            options={[
              ["res_detached", "Residential detached home"],
              ["res_apartment", "Residential apartment"],
              ["commercial", "Commercial"],
              ["rural", "Rural"]
            ]}
          />

          <FormDropDown
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            width="90%"
            label="Where is the hive located on the property?"
            name="propertyLoc"
            defaultText="Select a location"
            options={[
              ["indoors", "Indoors"],
              ["ext_wall", "Exterior structure"],
              ["ext_tree", "Exterior tree/plant/fixture"],
              ["chimney", "Chimney"],
              ["infested", "Inside of a wall/Other inaccessible area"],
              ["ground", "Ground"],
              ["other", "Other"]
            ]}
          />

          <FormDropDown
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            width="90%"
            label="How high up is the hive"
            name="height"
            defaultText="Select a height"
            options={[
              ["low", "Less than 10'"],
              ["med", "10' to 20'"],
              ["high", "Greater than 20'"]
            ]}
          />

          <FormDropDown
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            width="90%"
            label="How large is the hive?"
            name="size"
            defaultText="Select a size"
            options={[
              ["small", "Small (Size of grapefruit or smaller)"],
              ["med", "Medium (Size of basketball or smaller)"],
              ["large", "Large (Larger than a basketball)"]
            ]}
          />

          <FormTextEntry
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            width="90%"
            placeholder={"Numeric only, ie. '4'"}
            label="Approximately how many days has the hive been present?:"
            name="duration"
          />

          {/*
          <input
            label="image"
            margin={majorScale(1)}
            type="file"
            name="image"
            onChange={(e) => {
              setForm(prevState => ({
                ...prevState,
                image: e.target.value
              }));
            }}
          />
          */}
        </Pane>
      </Pane>
      <Button
        className="submitbutton"
        width="25%"
        margin={majorScale(1)}
        marginBottom={majorScale(2)}
        onClick={submitReport}
      >
        Submit
      </Button>
    </Pane>
    </section>
  )
}