import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const jobTypes = ['Engineer', 'Doctor', 'Teacher', 'Other'];

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    address: '',
    mobile: '',
    email: '',
    jobType: '',
    companyName: '',
    comment: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{
        //display:'flex',
       // flexDirection:'column',
        //justifyContent:'space-around',
        width:'100%'
    
    }}>
      <TextField
        style={{
            padding:10,
            width:'40%'
        }}
        select
        name="title"
        label="Title"
        //fullWidth
        value={formData.title}
        onChange={handleChange}
      >
        <MenuItem value="Mr">Mr</MenuItem>
        <MenuItem value="Mrs">Mrs</MenuItem>
      </TextField>
      <Stack direction={'row'} spacing={2}>
      <TextField
        style={{
            padding:10,
        }}
        name="firstName"
        label="First Name"
        fullWidth
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        style={{
            padding:10,
        }}
        name="lastName"
        label="Last Name"
        fullWidth
        value={formData.lastName}
        onChange={handleChange}
      />
      </Stack>
      <TextField
        style={{
            padding:10,
        }}
        name="address"
        label="Address"
        fullWidth
        multiline
        rows={4}
        value={formData.address}
        onChange={handleChange}
      />
      <TextField
        style={{
            padding:10,
        }}
        name="mobile"
        label="Mobile"
        fullWidth
        value={formData.mobile}
        onChange={handleChange}
      />
      <TextField
        style={{
            padding:10,
        }}
        name="email"
        label="Email"
        fullWidth
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        style={{
            padding:10,
        }}
        select
        name="jobType"
        label="Job Type"
        fullWidth
        value={formData.jobType}
        onChange={handleChange}
      >
        {jobTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        style={{
            padding:10,
        }}
        name="companyName"
        label="Company Name"
        fullWidth
        value={formData.companyName}
        onChange={handleChange}
      />
      <TextField
        style={{
            padding:10,
        }}
        name="comment"
        label="Comment or Questions"
        fullWidth
        multiline
        rows={4}
        value={formData.comment}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
