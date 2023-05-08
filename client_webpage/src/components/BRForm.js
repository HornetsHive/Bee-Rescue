import React, { useState, useRef } from 'react';
import { Pane, Heading, majorScale, Button, toaster, Paragraph} from 'evergreen-ui'
import { useNavigate, Link } from "react-router-dom";
import Axios from 'axios';

import '../fonts.css';
import '../App.css';
import FormTextEntry from './FormTextEntry';
import FormDropDown from './FormDropDown';
import HookCheckbox from './HookCheckbox';
import usePlacesAutocomplete from './usePlacesAutocomplete';

//mobile: boolean, have form render in mobile friendly format
export default function BRForm({mobile}) {
  const navigate = useNavigate();
  const addressInputRef = useRef(null);
  const gmapsAPIKey = process.env.REACT_APP_GMAPS_API_KEY;

  function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function isValidZipCode(zipCode) {
  // Regular expression pattern for a valid US zip code
  var pattern = /^\d{3,5}(?:[-\s]\d{4})?$/;
  
  // Test the pattern against the input zip code
  return pattern.test(zipCode);
  }

  //hook for tracking form values
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    address: "",
    addressln2: "",
    city: "",
    state: "",
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

  //hooks to track if the checkboxes on the bottom of the form are checked
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
      Axios.post("https://beerescue.net:3001/insert", {
      fname: form.fname,
      lname: form.lname,
      address: form.address,
      addressln2: form.addressln2,
      city: form.city,
      state: form.state,
      zip: form.zip,
      email: form.email,
      phone_no: form.phone_no,
      propertyType: form.propertyType,
      propertyLoc: form.propertyLoc,
      duration: form.duration,
      location: form.location,
      height: form.height,
      size: form.size,
      image: form.image,
      key: process.env.REACT_APP_KEY
    }).then(() =>{
      toaster.success("Your form has been submitted!");
      navigate('/confirm');
    }).catch(error => {
      toaster.danger("Something went wrong submitting your report, try checking your connection and refreshing the page");
      console.error(error);
    });
    }

  }

  //hook for tracking input validation
  const [errors, setErrors] = useState({
    address: "",
    fname: "",
    lname: "",
    city: "",
    state: "",
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
    if(!form.lname){
      newErrors.lname = "This field is required"
    }
    if(!form.city){
      newErrors.city = "This field is required"
    }
    if(!form.state){
      newErrors.state = "This field is required"
    }
    if(!form.zip){
      newErrors.zip = "This field is required"
    }
    if(!isValidZipCode(form.zip)){
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
    //If any field in newErrors is not empty or a box isn't checked return true (has error)
    if(!Object.values(newErrors).every(error => error === '') || !owner || !honeyBees || !terms){
      return true;
    }
  };

  //callback function for usePlacesAutocomplete
  //The API returns a place object with a bunch of properties which we can use to populate our form
  const onPlaceSelected = (place) => {
    let address1 = "";
    let postcode = "";
  
    //loop through the address components returned by the API
    for (const component of place.address_components) {
      const componentType = component.types[0];
  
      switch (componentType) {
        case "street_number": {
          address1 = `${component.long_name} ${address1}`;
          break;
        }
  
        case "route": {
          address1 += component.short_name;
          break;
        }
  
        case "postal_code": {
          postcode = `${component.long_name}${postcode}`;
          break;
        }
  
        case "postal_code_suffix": {
          postcode = `${postcode}-${component.long_name}`;
          break;
        }
        case "locality":
          setForm((prev) => ({ ...prev, city: component.long_name }));
          break;
        case "administrative_area_level_1": {
          setForm((prev) => ({ ...prev, state: component.short_name }));
          break;
        }
      }
    }
  
    setForm((prev) => ({ ...prev, address: address1, zip: postcode }));
  };  

  //initialize the google maps places autocomplete with our API key,
  //a reference to the address field, and a callback function to update the
  //form with the new selected values
  usePlacesAutocomplete(gmapsAPIKey, addressInputRef, onPlaceSelected);

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
          width={mobile ? "90%" : "60%"}
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
            phone={true}
          />
        </Pane>

        {/*------------ ADDRESS ------------*/}
        <Pane
          margin={majorScale(1)}
          float="center"
          width={mobile ? "90%" : "60%"}
          marginTop={mobile ? 60 : 40}
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
            inputRef={addressInputRef}
          />

          <FormTextEntry
            required={true}
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            label="Address Line 2:"
            name="addressln2"
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
            label="State:"
            name="state"
            state={true}
            placeholder={"State (ex: CA)"}
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
          width={mobile ? "fit-content" : "60%"}
          margin={mobile ? majorScale(1) : majorScale(2)}
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
            width={mobile ? "90%" : "100%"}
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
            width={mobile ? "90%" : "100%"}
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
            width={mobile ? "90%" : "100%"}
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
            width={mobile ? "90%" : "100%"}
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
            width={mobile ? "90%" : "100%"}
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