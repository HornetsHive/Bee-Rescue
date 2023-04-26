import React, { useState } from 'react';
import { Pane, Text, Heading, majorScale, Button, toaster, Paragraph} from 'evergreen-ui'
import { useNavigate, Link } from "react-router-dom";
import Axios from 'axios';

import '../fonts.css';
import '../App.css';
import FormTextEntry from './FormTextEntry';
import FormDropDown from './FormDropDown';
import HookCheckbox from './HookCheckbox';



export default function BRForm() {
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

  const [owner, setOwner] = useState(false);
  const [honeyBees, setHoneyBees] = useState(false);
  const [terms, setTerms] = useState(false);
  const [ownerError, setOwnerError] = useState(false);
  const [honeyBeesError, setHoneyBeesError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const submitReport = e => {
    e.preventDefault();

    //validate form
    const err = validate();
    if(err) {
      toaster.danger('Please input all required fields and accept the terms & conditions');
      return;
    }else{
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
    }).then(() =>{
      toaster.success("Your form has been submitted!");
      navigate('/confirm');
    }).catch(error => {
      toaster.danger("Something went wrong submitting your report");
      console.error(error);
    });
    }

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
    image: "",
  });
  

  const validate = () => {

    //form validation
    const newErrors = {...errors};
    if(!form.address){
      newErrors.address = "This field is required"
    }
    if(!form.fname){
      newErrors.fname = "This field is required"
    }
    /*
    if(!form.lname){
      newErrors.lname = "This field is required"
    }
    */
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
    if(form.phone_no.length < 14){
      newErrors.phone_no = "Please enter a valid phone number"
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
    if(!form.size){
      newErrors.size = "This field is required"
    }
    if(isNaN(form.duration)){
      newErrors.duration = "Please enter a numeric value"
    }

    //checkbox validation
    if(!owner){
      setOwnerError(true);
    } else {
      setOwnerError(false);
    }

    if(!honeyBees){
      setHoneyBeesError(true);
    } else {
      setHoneyBeesError(false);
    }

    if (!terms) {
      setTermsError(true);
    } else {
      setTermsError(false);
    }

    setErrors(newErrors)
    if(!Object.values(newErrors).every(error => error === '') || !owner || !honeyBees || !terms){
      return true;
    }
  };

  return(
    <Pane
      className="form"
      elevation={1}
      borderRadius='1em'
      height="fit-content"
      margin={32}
      align="center"
      flexDirection="row"
    >
      <Pane>
        <Heading margin={majorScale(1)} size={600}><br></br>Submit a new Bee Rescue report</Heading>
        <Paragraph
              fontFamily="Louis-George-Cafe"
              color="#000000" 
              margin={majorScale(4)} 
              size={400}
              textAlign="left"
            >
              Fill out this form to submit a new report.
              After confirming your report through your email, the network of beekeepers in your area will be notified
              about your swarm. You will be contacted shortly to arrange for pickup.
            </Paragraph>
      </Pane>
      
      {/*------------ REPORTER INFO ------------*/}
      <Pane className="reporterInfo" elevation={2} margin='2em' padding='0.5em' borderRadius='1em'>
        {/*------------ NAME ------------*/}
        <Pane
          width="60%"
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

          {/*
          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="Last Name:"
            name="lname"
          />
          */}

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
            phone={true}
          />
        </Pane>

        {/*------------ ADDRESS ------------*/}
        <Pane
          margin={majorScale(1)}
          float="center"
          width="60%"
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
            label="Street Address:"
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
      <Pane className="propertyInfo" elevation={2} margin='2em' padding='0.5em' borderRadius='1em'>
        <Pane
          width="60%"
          margin={majorScale(2)}
          float="center"
          display="flex"
          justifyContent="normal"
          alignItems="normal"
          flexDirection="column"
        >

          <FormDropDown
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            width="100%"
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
            width="100%"
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
            width="100%"
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
            width="100%"
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
            width="100%"
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

      <Pane
        margin={majorScale(1)}
        align="left"
        width="80%"
      >
        <HookCheckbox
          controlledState={owner}
          setControlledState={setOwner}
          label={<>I am the owner/manager of the property where the swarm is located</>}
          error={{state: ownerError, message: "You must be the owner/manager of the property where the swarm is located to submit a report."}}
          setErrorState={setOwnerError}
        />

        <HookCheckbox
          controlledState={honeyBees}
          setControlledState={setHoneyBees}
          label={<>I am certain that the swarm is honey bees and not another type of stinging insect (e.g. wasps, hornets, bumble bees, etc.) <a href="https://sacbeekeepers.org/wp-content/uploads/2020/12/2-1024x683.jpg">Not sure?</a></>}
          error={{state: honeyBeesError, message: "Bee Rescue only handles honey bees. If you are not sure what type of insect you have, please contact a pest control company."}}
          setErrorState={setHoneyBeesError}
        />
        
        <HookCheckbox 
          controlledState={terms}
          setControlledState={setTerms}
          label={<>I have read and agree to the <Link to="/legal">terms and conditions</Link></>}
          errorMessage={"You must agree to the terms and conditions to submit a report."}
          error={{state: termsError, message: "Please accept the terms & conditions before submitting"}}
          setErrorState={setTermsError}
        />
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
  )
}