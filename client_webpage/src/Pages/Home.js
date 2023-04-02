import React, { useState } from 'react';
import { Pane, Paragraph, Heading, majorScale, toaster, UnorderedList, ListItem } from 'evergreen-ui';
import { useNavigate } from "react-router-dom";

import '../fonts.css';
import '../App.css';
import InfoCard from '../components/InfoCard';
import BRForm from '../components/BRForm'
import BRFormMobile from '../components/BRFormMobile'

import Axios from 'axios';

function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function Home(){

  const navigate = useNavigate();
  const isMobile = /Mobile/.test(window.navigator.userAgent);
  

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

    Axios.post("/api/insert", {
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

  return (
    <div className="App" display="flex" justifyContent="center">

      {isMobile ?
        <Pane className="bannerMobile" borderRadius="1em">
        <img
          width="100%"
          src={require("../bigbee.png")}
          alt=""
        />
      </Pane>
      :
        <Pane 
        className="banner"
        borderRadius="2em"
        > 
          <img
            width="100%"
            src={require("../bee.png")}
            alt=""
          />
        </Pane>
      }


      <Pane
        flexDirection={isMobile ? 'column' : 'row'}
        alignContent="center"
        display="flex"
        justifyContent="center"
      >

        <Pane
          width={isMobile ? '100%' : '45%'}
          flexDirection="column"
        >

          {/*Heading*/}
          <Pane
            borderRadius="1em"
            align="left"
            margin={majorScale(2)}
            marginTop={isMobile ? 0 : majorScale(6)}
          >
            <Heading fontFamily="Comfortaa-Bold" size="900">Bee Rescue - Hive Reporting</Heading>
            <Heading paddingTop={majorScale(2)}>Welcome to the Bee Rescue Swarm reporting tool</Heading>
            <Paragraph
              fontFamily="Louis-George-Cafe"
              color="#000000" 
              margin={majorScale(1)} 
              size={500} 
              textAlign="left"
            >
              Bee Rescue is an application developed in partnership with the Sacramento Area Beekeepers
              Assocation (SABA) to facilitate the fast, safe, and humane removal
              of bees from occupied areas. By filling out the attached form, local beekeepers in your area will be notified
              and will contact you to make arrangements to relocate the bees to a safe area.
            </Paragraph>
          </Pane>

          {/* ---------------------------Info--------------------------------*/}
          <InfoCard 
            heading="Why do bees swarm?" 
            text="When bees are swarming they are generally docile. They will temporarily find a suitable 
            spot to gather while they send out scout bees to find a more permanent location as a new home.
            They are not too choosy about where this temporary spot will be, it can be
            anywhere that they can form a cluster to protect their queen. If the honey bees seem 
            to have made a permanent home already, such as in a tree or inside a structure (wall, roof, etc) 
            they are an established colony. Removing an established colony is a Trap Out (TO) or Cut Out (CO) situation." 
          />

          <InfoCard 
            heading="Make Observations" 
            text={
              <>
              Please have the following information ready before you submit your report. <br></br>Notes to make:<br></br>
              <UnorderedList padding='0.5em' paddingTop='0' color="#000000">
                <ListItem margin='-0.1em'>Are they honey bees or other similar insects?</ListItem>
                <ListItem margin='-0.1em'>Where are the bees?</ListItem>
                <ListItem margin='-0.1em'>How high above the ground?</ListItem>
                <ListItem margin='-0.1em'>What size is the swarm? (tennis ball, basketball, etc)</ListItem>
                <ListItem margin='-0.1em'>How long it has been in this spot?</ListItem>
                <ListItem margin='-0.1em'>Take photos to help indicate cluster size, location details, site considerations (power lines, slopes, obstructions, etc).</ListItem>
              </UnorderedList>

              Terminlogy:<br></br>
              Bees that have recently settled and clustered together are a swarm. 
              If the bees have been living there for a while, it is an established colony"
              </>
            }
          />

          <InfoCard 
            heading="Property Rights/Liabilites" 
            text="If the bees are not on your property, please send this page to the property owner
            for them to submit their own bee rescue report. Bee Rescue is a tool to facilitate quick
            communication between property owners and beekeepers, any arrangements made are between you and
            the beekeeper that agrees to do the collection. Bee Rescue does not employ, recommend, or endorse any
            beekeeper’s skill, training or expertise. Please check with individual beekeepers for their qualifications." 
          />

          <InfoCard 
            heading="Safe Distance" 
            text="Sit back, watch and wait for the beekeeper to arrive.
            Any beekeeper will tell you that there is something very magical about a swarm.
            There is an electric feeling in the air, as the bees swirl round before clustering in a ball.
            Watching a swarm being collected is an experience that you will not soon forget!" 
          />

          <InfoCard 
            heading="Tell Others or Contribute" 
            text="Share your positive experience with Bee Rescue and beekeepers with others! Bees often get negative press
            and we want to make sure that more people learn more about these amazing insects. Please consider
            donating to the Sacramento Area Beekeepers Association (SABA)" 
          />
        </Pane>

        {/* ----------Form----------*/}
        <Pane
          width={isMobile ? '100%' : '33%'}
        > 
        {isMobile ?
          <BRFormMobile
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            submitReport={submitReport}
          />
          
          :
          <BRForm
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            submitReport={submitReport}
          />
        }
        </Pane>

      </Pane>
      <div id="bottom" />
    </div>
  );
}

export default Home;
