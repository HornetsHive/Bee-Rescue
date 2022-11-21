import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App(){

  const [form, setForm] = useState({
    address: "",
    email: "",
    duration: "NULL",
    location: "NULL",
    height: "NULL",
    size: "NULL",
    image: "NULL"
  });

  const submitReport = () => {
    Axios.post("http://localhost:3001/api/insert", {
      address: form.address,
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

        <label>How high up is the hive?</label>
        <select 
          value={"height"} 
          onChange={ (e)=> {
            setForm(prevState => ({
              ...prevState,
              height: e.target.value
            }));
          }}>
          <option value="low">Less than 10'</option>
          <option value="med">10' to 20'</option>
          <option value="high">Greater than 20'</option>
        </select>


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

        <label>To your best knowledge, How long as the swarm been present?</label>
        <input 
        type="text"
        name="duration"
        onChange={(e)=> {
          setForm(prevState => ({
            ...prevState,
            duration: e.target.value
        }));
        }} />

        <label>Type of property</label>
        <input 
        type="text"
        name="location"
        onChange={(e)=> {
          setForm(prevState => ({
            ...prevState,
            location: e.target.value
        }));
        }} />

        <label>How high is the hive?</label>
        <input 
        type="text"
        name="height"
        onChange={(e)=> {
          setForm(prevState => ({
                ...prevState,
                height: e.target.value
            }));
        }} />

        <label>How large is the hive?</label>
        <input 
        type="text"
        name="size"
        onChange={(e)=> {
          setForm(prevState => ({
            ...prevState,
            size: e.target.value
        }));
        }} />

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

        <button onClick={submitReport}> Submit</button>
      </div>
    </div>
  );
}

export default App;
