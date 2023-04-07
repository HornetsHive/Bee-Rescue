import React from 'react';
import { Pane, Heading, majorScale, Button, Paragraph} from 'evergreen-ui'
import '../fonts.css';
import '../App.css';
import FormTextEntry from './FormTextEntry';
import FormDropDown from './FormDropDown';

export default function BRForm({ form, setForm, errors, setErrors, submitReport}) {

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
        <Heading margin={majorScale(1)} size="600"><br></br>Submit a new Bee Rescue report</Heading>
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
      <Pane className="reporterInfo" elevation='2' margin='2em' padding='0.5em' borderRadius='1em'>
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