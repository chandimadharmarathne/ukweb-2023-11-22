import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  LocalPhone,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import Social from "../../components/social-link";
import Header from "../../components/static-pages/header";
import SubmitButton from "../../components/submit-button";
import { FULL_NAME_REGEX, MOBILE_NUM_REGEX } from "../../constants/regex";
import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
} from "../../constants/social-links";
import { useErrors } from "../../hooks/error.hook";
import * as chatService from "../../services/chat-service";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { Credentials, ErrorHelps, InputField } from "../../utils/auth-types";

interface ContactPageProps {}
const jobTypes = [{ value: "cleaner", label: "Cleaner" },
{ value: "careAssistant", label: "Care Assistant" },
{ value: "driver", label: "Driver" },
{ value: "factoryWorker", label: "Factory Worker" },
{ value: "farmWorker", label: "Farm Worker" },
{ value: "remoteWorking", label: "Remote Working" },
{ value: "retail", label: "Retail" }];
const ContactPage: FC<ContactPageProps> = () => {
  const [details, setDetails] = useState<Credentials>({});
  const { code } = useLanguage();
  const { addSnack } = useSnackbar();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint
 
  const isTablet = useMediaQuery<Theme>((theme) =>
  theme.breakpoints.between("sm", "md")
);
  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );
  const { checkErrors, updateError, hasErrors, addError } = useErrors(inputs);

  const updateCredentials =
    (name: string, validate: InputField["validator"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      updateError(name, validate?.(value));
      setDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

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
  const submit = async () => {
    
  };
  return (
    <div  
     style={{
      display:'flex',
      marginTop:20,
      width : isMobile ? '100%' : '93%',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:isMobile ? 0 : "4%",
     }}
    >
     
    <Grid container spacing={2} >
       
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
            <Typography variant="h2" style={{
              marginTop:50,
              marginLeft:"1%"
            }} >
              Leave a Massege
            </Typography>
       
      <Stack direction={isMobile ? "column":'row'} spacing={2}>
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

      <Stack  direction={isMobile ? "column":'row'} spacing={2}>
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
        </Stack>
     <Stack  direction={isMobile ? "column":'row'}spacing={2}>

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
        {jobTypes.map((type:any) => (
          <MenuItem key={type} value={type.value}>
            {type.label}
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
      </Stack>
     <Stack  direction={isMobile ? "column":'row'}>
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
      <Button startIcon={<Send/>} type="submit" variant="contained" style={{
          backgroundColor:'green',
          height:50,
        }}>
        Send
      </Button>
      </Stack>
        
          </Grid>

          {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
              <img  
              style={{
                width:'100%',
                height:'100%',
                objectFit:'cover'
              }}
              src ="/assets/help.jpeg"
              alt="help"
              />
            </Grid> */}
        
     </Grid>
    </div>
  );
};

const inputs: InputField[] = [
  {
    name: "full_name",
    validator: (name) => FULL_NAME_REGEX.test(name),
    props: {
      placeholder: "Enter your Full Name",
      label: "Full Name",
      required: true,
    },
  },
  {
    name: "email",
    validator: (email) => /.+@.+\..+/i.test(email),
    props: {
      placeholder: "Enter your email",
      label: "Email",
      required: true,
    },
  },
  {
    name: "contact_number",
    validator: (number) => MOBILE_NUM_REGEX.test(number),
    props: {
      placeholder: "Enter your mobile number",
      label: "Mobile Number",
      required: true,
    },
  },
  {
    name: "message",
    validator: (message) => /.*/m.test(message),
    props: {
      multiline: true,
      placeholder: "Write your message",
      label: "Message",
      rows: 10,
      required: true,
    },
  },
];

const errorHelps: ErrorHelps = {
  full_name: {
    en: "Only Letters are allowed",
    si: "",
    tm: "",
  },
  contact_number: {
    en: "Entered Number is Invalid",
  },
  message: {
    en: "need to be filled",
  },
};
export default ContactPage;
