import React, { useState } from 'react';
import { Button, Pane, Text, Paragraph, Heading, SelectField, TextInputField, majorScale, toaster, UnorderedList, ListItem } from 'evergreen-ui';
import './fonts.css';
import './App.css';
import Axios from 'axios';

function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function App(){

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

    Axios.post("http://localhost:3001/api/insert", {
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
    }).then(() => {
      alert('successful insert');
      toaster.success("Your form has been submitted!");
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
    <div className="App">
      
      {/*Header*/}
      <Pane className="header" borderRadius='1em'>
        <img src="path/to/logo.png" alt="Bee Rescue logo" />
        <nav>
          <ul>
            <li><a href="#">Report a Swarm</a></li>
            <li><a href="#">Sacramento Area Beekeepers Association</a></li>
            <li><a href="#">About us</a></li>
          </ul>
        </nav>
      </Pane>

        <Pane flexDirection="row" alignContent="center" display="flex" justifyContent="center">
          <Pane width="45%" flexDirection="column">

            {/*Heading*/}
            <Pane
              align="left"
              margin={majorScale(2)}
              marginTop={majorScale(6)}
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
            <Pane 
              elevation='1'
              borderRadius='1em'
              backgroundColor="#D3D96F" 
              margin={majorScale(2)} 
              marginTop={majorScale(3)}
              padding={majorScale(2)} 
            >
              <Heading fontFamily="Comfortaa-Bold">Why do bees swarm?</Heading>

              <Paragraph 
                fontFamily="Louis-George-Cafe"
                color="#000000" 
                margin={majorScale(1)} 
                size={500} 
                textAlign="left"
              >
              When bees are swarming they are generally docile. They will temporarily find a suitable 
              spot to gather while they send out scout bees to find a more permanent location as a new home.
              They are not too choosy about where this temporary spot will be, it can be
              anywhere that they can form a cluster to protect their queen. If the honey bees seem 
              to have made a permanent home already, such as in a tree or inside a structure (wall, roof, etc) 
              they are an established colony. Removing an established colony is a Trap Out (TO) or Cut Out (CO) situation.
              </Paragraph>

            </Pane>

            <Pane 
              elevation='1'
              borderRadius='1em'
              backgroundColor="#D3D96F" 
              margin={majorScale(2)} 
              marginTop={majorScale(3)} 
              padding={majorScale(2)} 
            >
              <Heading fontFamily="Comfortaa-Bold">Make Observations</Heading>

              <Paragraph 
                fontFamily="Louis-George-Cafe"
                color="#000000" 
                margin={majorScale(1)} 
                size={500} 
                textAlign="left"
              >
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
                If the bees have been living there for a while, it is an established colony
              </Paragraph>
            </Pane>

            <Pane 
              elevation='1'
              borderRadius='1em'
              backgroundColor="#D3D96F" 
              margin={majorScale(2)} 
              marginTop={majorScale(3)}
              padding={majorScale(2)} 
            >
              <Heading fontFamily="Comfortaa-Bold">Property Rights/Liabilites</Heading>

              <Paragraph 
                fontFamily="Louis-George-Cafe" 
                color="#000000"
                margin={majorScale(1)} 
                size={500} 
                textAlign="left"
              >
              If the bees are not on your property, please send this page to the property owner
              for them to submit their own bee rescue report. Bee Rescue is a tool to facilitate quick
              communication between property owners and beekeepers, any arrangements made are between you and
              the beekeeper that agrees to do the collection. Bee Rescue does not employ, recommend, or endorse any
              beekeeper’s skill, training or expertise. Please check with individual beekeepers for their qualifications.
              </Paragraph>
            </Pane>

            <Pane 
              elevation='1'
              borderRadius='1em'
              backgroundColor="#D3D96F" 
              margin={majorScale(2)} 
              marginTop={majorScale(3)}
              padding={majorScale(2)} 
            >
              <Heading fontFamily="Comfortaa-Bold">Safe Distance</Heading>

              <Paragraph 
                fontFamily="Louis-George-Cafe"
                color="#000000" 
                margin={majorScale(1)} 
                size={500} 
                textAlign="left"
              >
              Sit back, watch and wait for the beekeeper to arrive.
              Any beekeeper will tell you that there is something very magical about a swarm.
              There is an electric feeling in the air, as the bees swirl round before clustering in a ball.
              Watching a swarm being collected is an experience that you will not soon forget!
              </Paragraph>
            </Pane>

            <Pane 
              elevation='1'
              borderRadius='1em'
              backgroundColor="#D3D96F" 
              margin={majorScale(2)} 
              marginTop={majorScale(3)}
              padding={majorScale(2)} 
            >
              <Heading fontFamily="Comfortaa-Bold">Tell Others or Contribute</Heading>

              <Paragraph 
                fontFamily="Louis-George-Cafe"
                color="#000000" 
                margin={majorScale(1)} 
                size={500} 
                textAlign="left"
              >
              Share your positive experience with Bee Rescue and beekeepers with others! Bees often get negative press
              and we want to make sure that more people learn more about these amazing insects. Please consider
              donating to the Sacramento Area Beekeepers Association (SABA)
              </Paragraph>
            </Pane>
          </Pane>

          {/* ---------------------------Form--------------------------------*/}
          <Pane
            className="form"
            elevation={1}
            borderRadius='1em'
            width="33%"
            height="fit-content"
            margin={32}
            marginTop={majorScale(12)}
            align="center"
            flexDirection="row"
          >
            <Heading margin={majorScale(1)} size="600">Submit a new Bee Rescue report</Heading>
              {/*------------ REPORTER INFO ------------*/}
              <Pane className="reporterInfo" elevation='2' margin='2em' padding='0.5em' borderRadius='1em'>
                {/*------------ NAME ------------*/}
                <Pane
                  width="85%"
                  margin={majorScale(2)}
                  float="center"
                  display="flex"
                  justifyContent="normal"
                  alignItems="center"
                  flexDirection="row"
                >
                  {/*first name*/}
                  <TextInputField
                    label="First name:"
                    margin={majorScale(1)}
                    isInvalid={Boolean(errors.fname)}
                    validationMessage={errors.fname ? errors.fname : null}
                    required 
                    type="text" 
                    name="fname" 
                    onChange={(e)=> {
                      setForm(prevState => ({
                            ...prevState,
                            fname: e.target.value
                      }));
                      setErrors({...errors, fname: ''});
                    }}
                    error="test" 
                  />

                  {/*last name*/}
                  <TextInputField
                    label="Last name:"
                    margin={majorScale(1)}
                    isInvalid={Boolean(errors.lname)}
                    validationMessage={errors.lname ? errors.lname : null}
                    required
                    type="text" 
                    name="lname" 
                    onChange={(e)=> {
                      setForm(prevState => ({
                            ...prevState,
                            lname: e.target.value
                      }));
                      setErrors({...errors, lname: ''});
                    }} 
                  />

                  {/*email*/}
                  <TextInputField 
                    label="Email:"
                    margin={majorScale(1)}
                    required
                    isInvalid={Boolean(errors.email)}
                    validationMessage={errors.email ? errors.email : null}
                    type="text"
                    name="email"
                    onChange={(e)=> {
                      setForm(prevState => ({
                        ...prevState,
                        email: e.target.value
                      }));
                      setErrors({...errors, email: ''});
                    }} 
                  />

                  {/*phone*/}
                  <TextInputField 
                    label="Phone:"
                    margin={majorScale(1)}
                    required
                    isInvalid={Boolean(errors.phone_no)}
                    validationMessage={errors.phone_no ? errors.phone_no : null}
                    type="text"
                    name="phone_no"
                    onChange={(e)=> {
                      setForm(prevState => ({
                        ...prevState,
                        phone_no: e.target.value
                      }));
                      setErrors({...errors, phone_no: ''});
                    }} 
                  />
                </Pane>

                  {/*------------ ADDRESS ------------*/}
                <Pane
                  margin={majorScale(1)}
                  float="center"
                  width="85%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                >
                  {/*address*/}
                  <TextInputField 
                    label="Address:"
                    margin={majorScale(1)}
                    required
                    isInvalid={Boolean(errors.address)}
                    validationMessage={errors.address ? errors.address : null}
                    type="text" 
                    name="address"
                    onChange={(e)=> {
                      setForm(prevState => ({
                            ...prevState,
                            address: e.target.value
                      }));
                      setErrors({...errors, address: ''});
                    }} 
                  />

                  {/*city*/}
                  <TextInputField
                    label="City:"
                    margin={majorScale(1)}
                    required
                    isInvalid={Boolean(errors.city)}
                    validationMessage={errors.city ? errors.city : null}
                    type="text" 
                    name="city" 
                    onChange={(e)=> {
                      setForm(prevState => ({
                            ...prevState,
                            city: e.target.value
                      }));
                      setErrors({...errors, city: ''});
                    }} 
                  />

                  {/*zip*/}
                  <TextInputField
                    label="Zip Code:"
                    margin={majorScale(1)}
                    required
                    isInvalid={Boolean(errors.zip)}
                    validationMessage={errors.zip ? errors.zip : null}
                    type="text" 
                    name="zip" 
                    onChange={(e)=> {
                      setForm(prevState => ({
                            ...prevState,
                            zip: e.target.value
                      }));
                      setErrors({...errors, zip: ''});
                    }} 
                  />
                </Pane>
              </Pane>
              
              {/*------------ PROPERTY INFO ------------*/} 
              <Pane className="propertyInfo" elevation='2' margin='2em' padding='0.5em' borderRadius='1em'>  
                <Pane
                  margin={majorScale(2)}
                  float="center"
                  width="fit-content"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                > 
                  {/*type of property*/}  
                  <SelectField
                    required
                    isInvalid={Boolean(errors.propertyType)}
                    validationMessage={errors.propertyType ? errors.propertyType : null}
                    label="Type of Property"
                    margin={majorScale(1)}
                    width="65%"
                    defaultValue=""
                    value={form.propertyType} 
                    onChange={ (e)=> {
                      setForm(prevState => ({
                        ...prevState,
                        propertyType: e.target.value
                      }));
                      setErrors({...errors, propertyType: ''});
                    }}
                  >
                    <option disabled={true} value="">Select a property type</option>
                    <option value="res_detached">Residential detached home</option>
                    <option value="res_apartment">Residential apartment</option>
                    <option value="commercial">Commercial</option>
                    <option value="rural">Rural</option>
                  </SelectField>
                  
                  {/*Location on property*/}
                  <SelectField
                    label="Where is the hive located on the property?"
                    margin={majorScale(1)}
                    width="65%"
                    required
                    isInvalid={Boolean(errors.propertyLoc)}
                    validationMessage={errors.propertyLoc ? errors.propertyLoc : null}
                    defaultValue=""
                    value={form.propertyLoc} 
                    onChange={ (e)=> {
                      setForm(prevState => ({
                        ...prevState,
                        propertyLoc: e.target.value
                      }));
                      setErrors({...errors, propertyLoc: ''});
                    }}
                  >
                    <option disabled={true} value="">Select a location</option>
                    <option value="indoors">Indoors</option>
                    <option value="ext_wall">Exterior structure</option>
                    <option value="ext_tree">Exterior tree/plant/fixture</option>
                    <option value="chimney">Chimney</option>
                    <option value="infested">Inside of a wall/Other inaccessible area</option>
                    <option value="ground">Ground</option>
                    <option value="other">Other</option>

                    
                  </SelectField> 

                  {/*height*/}
                  <SelectField
                    label="How high up is the hive?"
                    margin={majorScale(1)}
                    width="65%"
                    required
                    isInvalid={Boolean(errors.height)}
                    validationMessage={errors.height ? errors.height : null}
                    defaultValue="" 
                    value={form.height} 
                    onChange={ (e)=> {
                      setForm(prevState => ({
                        ...prevState,
                        height: e.target.value
                      }));
                      setErrors({...errors, height: ''});
                    }}
                  >
                    <option disabled={true} value="">Select a height</option>
                    <option value="low">Less than 10'</option>
                    <option value="med">10' to 20'</option>
                    <option value="high">Greater than 20'</option>
                  </SelectField>

                  {/*size*/}
                  <SelectField
                    label="How large is the hive?"
                    margin={majorScale(1)}
                    width="65%"
                    defaultValue=""
                    value={form.size} 
                    onChange={ (e)=> {
                      setForm(prevState => ({
                        ...prevState,
                        size: e.target.value
                      }));
                    }}
                  >
                    <option disabled={true} value="">Select a size</option>
                    <option value="small">Small (Size of grapefruit or smaller)</option>
                    <option value="med">Medium (Size of basketball or smaller)</option>
                    <option value="large">Large (Larger than a basketball)</option>
                  </SelectField>

                  {/*time present*/}
                  <TextInputField
                    label="Approximately how many days has the hive been present?"
                    placeholder="Numeric only, ie. '4'"
                    margin={majorScale(2)}
                    width="65%"
                    isInvalid={Boolean(errors.duration)}
                    validationMessage={errors.duration ? errors.duration : null}
                    type="text" 
                    name="duration" 
                    onChange={(e)=> {
                      setForm(prevState => ({
                            ...prevState,
                            duration: e.target.value
                      }));
                      setErrors({...errors, duration: ''});
                    }} 
                  />


                  <input
                    label="image"
                    margin={majorScale(1)} 
                    type="file"
                    name="image"
                    onChange={(e)=> {
                      setForm(prevState => ({
                        ...prevState,
                        image: e.target.value
                    }));
                    }} 
                  />
                </Pane>
              </Pane>
              <Button 
                width="25%"
                margin={majorScale(1)}
                marginBottom={majorScale(2)}
                onClick={submitReport}
              >
                Submit
              </Button>
          </Pane>
        </Pane>
    </div>
  );
}

export default App;
