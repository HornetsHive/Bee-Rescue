import React, { useState } from 'react';
import { Button, Pane, Paragraph, Heading, SelectField, TextInputField, majorScale, toaster } from 'evergreen-ui';
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
      propertyType: form.propertyType,
      propertyLoc: form.propertyLoc,
      duration: form.duration,
      location: form.location,
      height: form.height,
      size: form.size,
      image: form.image
    }).then(() => {
      alert('successful insert');
    });
    toaster.success("Your form has been submitted!");
  }

  const [errors, setErrors] = useState({
    address: "",
    fname: "",
    lname: "",
    city: "",
    zip: "",
    email: "",
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
        <Pane elevation={1} flexDirection="row">
          <Pane float="left" marginLeft={majorScale(4)} width="55%" flexDirection="column">

            {/*Heading*/}
            <Pane
              align="left"
              margin={majorScale(2)}
              marginTop={majorScale(6)}
            >
              <Heading size="850">Bee Rescue - Hive Reporting</Heading>
            </Pane>

            {/*Text*/}
            <Pane margin={majorScale(2)} marginTop={majorScale(6)}>
              <Paragraph margin={majorScale(1)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor id eu nisl nunc mi ipsum faucibus. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Rutrum quisque non tellus orci. In metus vulputate eu scelerisque felis imperdiet. Velit egestas dui id ornare arcu odio ut sem nulla. Euismod elementum nisi quis eleifend quam adipiscing vitae proin. Facilisi nullam vehicula ipsum a arcu cursus vitae. Nisl rhoncus mattis rhoncus urna neque viverra justo. Nibh ipsum consequat nisl vel pretium lectus quam. Nisl nunc mi ipsum faucibus vitae aliquet nec. Vel turpis nunc eget lorem dolor sed. Fusce id velit ut tortor pretium. Adipiscing vitae proin sagittis nisl. Ornare arcu odio ut sem nulla pharetra diam sit.{"\n"}{"\n"}
              </Paragraph>
              
              <Paragraph margin={majorScale(1)}>
                Velit euismod in pellentesque massa placerat duis. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Cursus vitae congue mauris rhoncus aenean vel. Nec ultrices dui sapien eget mi proin. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Est ultricies integer quis auctor elit sed. Felis bibendum ut tristique et egestas quis ipsum. A arcu cursus vitae congue mauris rhoncus aenean. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Elementum tempus egestas sed sed. Porta lorem mollis aliquam ut porttitor leo a diam. Sed elementum tempus egestas sed sed risus. Urna cursus eget nunc scelerisque viverra mauris. Tincidunt praesent semper feugiat nibh sed pulvinar. Sed id semper risus in hendrerit gravida rutrum quisque non. Sapien nec sagittis aliquam malesuada bibendum arcu. Tincidunt augue interdum velit euismod. Leo duis ut diam quam.{"\n"}{"\n"}
              </Paragraph>

              <Paragraph margin={majorScale(1)}>
                Sagittis vitae et leo duis ut diam quam nulla porttitor. Nunc id cursus metus aliquam eleifend mi in. Tempus egestas sed sed risus pretium quam. Aliquam faucibus purus in massa. Tortor dignissim convallis aenean et. At ultrices mi tempus imperdiet nulla malesuada. Turpis in eu mi bibendum neque egestas congue quisque. Vel eros donec ac odio. Sit amet consectetur adipiscing elit pellentesque habitant. Consequat semper viverra nam libero justo laoreet. Nunc id cursus metus aliquam. Praesent tristique magna sit amet purus gravida quis. At auctor urna nunc id cursus metus. Feugiat sed lectus vestibulum mattis ullamcorper velit. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Turpis cursus in hac habitasse platea dictumst quisque sagittis. Sed tempus urna et pharetra pharetra massa.{"\n"}{"\n"}
              </Paragraph>
            </Pane>
          </Pane>

          {/*Form*/}
          <Pane
            elevation={1}
            width="33%"
            margin={32}
            marginTop={majorScale(12)}
            marginRight={majorScale(16)}
            float="right"
            align="center"
            backgroundColor="white"
            flexDirection="row"
          >
            <Heading margin={majorScale(1)} size="600">Submit a new Bee Rescue report</Heading>
            <div className = "form">
              {/*------------ NAME ------------*/}
              <Pane
                name="Reporter info"
                width="85%"
                margin={majorScale(2)}
                float="center"
                backgroundColor="white"
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
                  label="email"
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
              </Pane>

                {/*------------ ADDRESS ------------*/}
              <Pane
                name="address info"
                margin={majorScale(1)}
                float="center"
                width="85%"
                backgroundColor="white"
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
                  label="zip"
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
                
                {/*------------ PROPERTY INFO ------------*/} 
              <Pane
                name="propertyInfo"
                margin={majorScale(2)}
                float="center"
                width="fit-content"
                backgroundColor="white"
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
                  <option value="small">Small (Size of apple or smaller)</option>
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
              <Button appearance="primary" margin={majorScale(1)} marginBottom={majorScale(2)} onClick={submitReport}>Submit</Button>
            </div>
          </Pane>
        </Pane>
    </div>
  );
}

export default App;
