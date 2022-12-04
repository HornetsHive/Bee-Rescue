import React, { useState } from 'react';
import { Button, Pane, Text, Paragraph, Heading, Select, SelectField, TextInputField, majorScale } from 'evergreen-ui';
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
                  required 
                  type="text" 
                  name="fname" 
                  onChange={(e)=> {
                    setForm(prevState => ({
                          ...prevState,
                          fname: e.target.value
                    }));
                  }} 
                />

                {/*last name*/}
                <TextInputField
                  label="Last name:"
                  margin={majorScale(1)}
                  required
                  type="text" 
                  name="lname" 
                  onChange={(e)=> {
                    setForm(prevState => ({
                          ...prevState,
                          lname: e.target.value
                    }));
                  }} 
                />

                {/*email*/}
                <TextInputField 
                  label="email"
                  margin={majorScale(1)}
                  required
                  type="text"
                  name="email"
                  onChange={(e)=> {
                    setForm(prevState => ({
                      ...prevState,
                      email: e.target.value
                  }));
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
                  type="text" 
                  name="address"
                  onChange={(e)=> {
                    setForm(prevState => ({
                          ...prevState,
                          address: e.target.value
                    }));
                  }} 
                />

                {/*city*/}
                <TextInputField
                  label="City:"
                  margin={majorScale(1)}
                  required 
                  type="text" 
                  name="city" 
                  onChange={(e)=> {
                    setForm(prevState => ({
                          ...prevState,
                          city: e.target.value
                    }));
                  }} 
                />

                {/*zip*/}
                <TextInputField
                  label="zip"
                  margin={majorScale(1)}
                  required 
                  type="text" 
                  name="zip" 
                  onChange={(e)=> {
                    setForm(prevState => ({
                          ...prevState,
                          zip: e.target.value
                    }));
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
                  defaultValue=""
                  value={form.propertyLoc} 
                  onChange={ (e)=> {
                    setForm(prevState => ({
                      ...prevState,
                      propertyLoc: e.target.value
                    }));
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
                  defaultValue="" 
                  value={form.height} 
                  onChange={ (e)=> {
                    setForm(prevState => ({
                      ...prevState,
                      height: e.target.value
                    }));
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
                  type="text" 
                  name="duration" 
                  onChange={(e)=> {
                    setForm(prevState => ({
                          ...prevState,
                          duration: e.target.value
                    }));
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
