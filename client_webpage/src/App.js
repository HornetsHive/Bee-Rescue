import React, { useState } from 'react';
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
      city: form.city,
      email: form.email,
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
      <h1>Bee Rescue - Hive Reporting</h1>

      <div className = "form">

        {/*------------ ADDRESS ------------*/}
        <label>Address:</label>
        <input 
          type="text" 
          name="address" 
          onChange={(e)=> {
            setForm(prevState => ({
                  ...prevState,
                  address: e.target.value
            }));
        }} />

        <label>City:</label>
        <input 
          type="text" 
          name="city" 
          onChange={(e)=> {
            setForm(prevState => ({
                  ...prevState,
                  city: e.target.value
            }));
        }} />

        <label>zip:</label>
        <input 
          type="text" 
          name="zip" 
          onChange={(e)=> {
            setForm(prevState => ({
                  ...prevState,
                  zip: e.target.value
            }));
        }} />

        {/*------------ NAME ------------*/}
        <label>First name:</label>
        <input 
          type="text" 
          name="fname" 
          onChange={(e)=> {
            setForm(prevState => ({
                  ...prevState,
                  fname: e.target.value
            }));
        }} />

        <label>Last name:</label>
        <input 
          type="text" 
          name="lname" 
          onChange={(e)=> {
            setForm(prevState => ({
                  ...prevState,
                  lname: e.target.value
            }));
        }} />
        
        <label>email:</label>
        <input 
        type="text"
        name="email"
        onChange={(e)=> {
          setForm(prevState => ({
            ...prevState,
            email: e.target.value
        }));
        }} />

        {/*------------ PROPERTY INFO ------------*/}    
        <label>Type of property</label>
        <select
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
        </select>

        <label>Where is the hive located on the property?</label>
        <select
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

          
        </select> 

        <label>How high up is the hive?</label>
        <select
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
        </select>

        <label>How large is the hive?</label>
        <select
          defaultValue=""
          value={form.size} 
          onChange={ (e)=> {
            setForm(prevState => ({
              ...prevState,
              size: e.target.value
            }));
        }}>
          <option disabled={true} value="">Select a Size</option>
          <option value="small">Small (Size of apple or smaller)</option>
          <option value="med">Medium (Size of basketball or smaller)</option>
          <option value="large">Large (Larger than a basketball)</option>
        </select>

        <label>image:</label>
        <input 
        type="file"
        name="image"
        onChange={(e)=> {
          setForm(prevState => ({
            ...prevState,
            image: e.target.value
        }));
        }} />

        <button onClick={submitReport}>Submit</button>
      </div>
    </div>
  );
}

export default App;
