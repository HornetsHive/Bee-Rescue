import React, { useState } from 'react';
import { Button, Pane, Text, Heading, Select, SelectField, TextInputField, majorScale } from 'evergreen-ui';
import './App.css';
import Axios from 'axios';

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

  const submitReport = () => {
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
  }

  return (
    <div className="App">
      <Pane
        justifyContent="center"
      >
        <Pane
          height="15%"  
        >
          <Heading size="500">Bee Rescue - Hive Reporting</Heading>
        </Pane>

        <Pane
          elevation={1}
          float="center"
          width="80%"
          align="center"
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <div className = "form">

          <Pane
              name="Reporter info"
              elevation={1}
              float="center"
              width="fit-content"
              backgroundColor="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {/*------------ NAME ------------*/}
              <TextInputField
                label="First name:"
                required 
                type="text" 
                name="fname" 
                onChange={(e)=> {
                  setForm(prevState => ({
                        ...prevState,
                        fname: e.target.value
                  }));
              }} />

              <TextInputField
                label="Last name:"
                required
                type="text" 
                name="lname" 
                onChange={(e)=> {
                  setForm(prevState => ({
                        ...prevState,
                        lname: e.target.value
                  }));
              }} />
              
              <TextInputField 
              label="email"
              required
              type="text"
              name="email"
              onChange={(e)=> {
                setForm(prevState => ({
                  ...prevState,
                  email: e.target.value
              }));
              }} />
            </Pane>

            <Pane
              name="address info"
              elevation={1}
              float="center"
              width="fit-content"
              backgroundColor="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {/*------------ ADDRESS ------------*/}
              <TextInputField 
                label="Address:"
                required
                type="text" 
                name="address"
                onChange={(e)=> {
                  setForm(prevState => ({
                        ...prevState,
                        address: e.target.value
                  }));
              }} />

              <TextInputField
                label="City:"
                required 
                type="text" 
                name="city" 
                onChange={(e)=> {
                  setForm(prevState => ({
                        ...prevState,
                        city: e.target.value
                  }));
              }} />

              <TextInputField
                label="zip"
                required 
                type="text" 
                name="zip" 
                onChange={(e)=> {
                  setForm(prevState => ({
                        ...prevState,
                        zip: e.target.value
                  }));
              }} />
            </Pane>
            
            <Pane
              name="propertyInfo"
              elevation={1}
              float="center"
              width="fit-content"
              backgroundColor="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {/*------------ PROPERTY INFO ------------*/}    
              <SelectField
                required
                label="Type of Property"
                defaultValue=""
                value={form.propertyType} 
                onChange={ (e)=> {
                  setForm(prevState => ({
                    ...prevState,
                    propertyType: e.target.value
                  }));
              }}>
                <option disabled={true} value="">Select a property type</option>
                <option value="res_detached">Residential detached home</option>
                <option value="res_apartment">Residential apartment</option>
                <option value="commercial">Commercial</option>
                <option value="rural">Rural</option>
              </SelectField>

              <SelectField
                label="Where is the hive located on the property?"
                required
                defaultValue=""
                value={form.propertyLoc} 
                onChange={ (e)=> {
                  setForm(prevState => ({
                    ...prevState,
                    propertyLoc: e.target.value
                  }));
              }}>
                <option disabled={true} value="">Select a location</option>
                <option value="indoors">Indoors</option>
                <option value="infested">Inside of a wall/Other inaccessible area</option>
                <option value="ext_wall">Exterior structure</option>
                <option value="ext_tree">Exterior tree/plant/fixture</option>
                <option value="chimney">Chimney</option>
                <option value="ground">Ground</option>
                <option value="other">Other</option>

                
              </SelectField> 

              <SelectField
                label="How high up is the hive?"
                required
                defaultValue="" 
                value={form.height} 
                onChange={ (e)=> {
                  setForm(prevState => ({
                    ...prevState,
                    height: e.target.value
                  }));
              }}>
                <option disabled={true} value="">Select a height</option>
                <option value="low">Less than 10'</option>
                <option value="med">10' to 20'</option>
                <option value="high">Greater than 20'</option>
              </SelectField>

              <SelectField
                label="How large is the hive?"
                defaultValue=""
                value={form.size} 
                onChange={ (e)=> {
                  setForm(prevState => ({
                    ...prevState,
                    size: e.target.value
                  }));
              }}>
                <option disabled={true} value="">Select a size</option>
                <option value="small">Small (Size of apple or smaller)</option>
                <option value="med">Medium (Size of basketball or smaller)</option>
                <option value="large">Large (Larger than a basketball)</option>
              </SelectField>

              <TextInputField
                label="Approximately how many days has the hive been present?"
                type="text" 
                name="duration" 
                onChange={(e)=> {
                  setForm(prevState => ({
                        ...prevState,
                        duration: e.target.value
                  }));
              }} />


              <input
              label="image" 
              type="file"
              name="image"
              onChange={(e)=> {
                setForm(prevState => ({
                  ...prevState,
                  image: e.target.value
              }));
              }} />
            </Pane>

            <Button onClick={submitReport}>Submit</Button>
          </div>
        </Pane>
      </Pane>
    </div>
  );
}

export default App;
