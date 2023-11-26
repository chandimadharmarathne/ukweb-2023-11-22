import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/submit-button";
import { REGISTERED_NUM } from "../../constants/keys";
import {
  FULL_NAME_REGEX,
  MOBILE_NUM_REGEX,
  PASSWORD_REGEX,
} from "../../constants/regex";
import { DATA_USER_TYPES, UserType } from "../../constants/user-types";
import * as authService from "../../services/auth-service";
import * as cvService from "../../services/cv-service";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { TemplateData } from "../../templates/template.hook";
import {
  Credentials,
  CustomComponentProps,
  ErrorHelps,
  InputField,
} from "../../utils/auth-types";
import { Errors } from "../../utils/errors";
import { Optional } from "../../utils/utils.types";
import IconButton from "../../components/text-button";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../../query";
import client from "../../applo";
type RegisterProps = {
  /** This is used if user registered via CV generation page */
  viaCV?: boolean;
  defaults?: Optional<Credentials>;
  /** data stored for CV  */
  details?: TemplateData & { pic?: File };
};

const RegisterPage: FC<RegisterProps> = ({ viaCV, defaults, details }) => {
  const [credentials, setCredentials] = useState<Credentials>({
    type: DATA_USER_TYPES[0].id,
    ...defaults,
  });
  const [registerUser,{data,error}] = useMutation(REGISTER_USER_MUTATION,{
    client:client
  })
  const { addSnack } = useSnackbar();
  // const { code } = useLanguage();
  const navigate = useNavigate();
  // const { logout } = useAuthentication();
  
  const updateCredentials =
    (name: string, validate: InputField["validator"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setCredentials((prev) => ({
        ...prev,
        [name]: validate?.(value) ? value : Errors.INPUT_ERROR,
      }));
    };
    
  const submit = async () => {
   
    try {
     
   
      const { data } = await registerUser({
        variables: {
          email:credentials?.email,
          displayname:credentials?.full_name,
          password:credentials?.password
        },
      });


      // Handle successful registration, e.g., show a success message or redirect
    

      if (data) {
      
        localStorage.setItem("user",JSON.stringify(data.registerUser))
        addSnack?.({
          severity: "success",
          message: "You've successfully registered",
        });
      }

      // sessionStorage.setItem(REGISTERED_NUM, credentials.number);
      navigate(`/`);
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };
  return (
    <>
      <Typography variant="h1">Register</Typography>

      <Stack spacing={4} className="content">
      {getInputs(credentials).map((input) => {
          const hasError = credentials?.[input.name] === Errors.INPUT_ERROR;
          const Input = input.CustomComponent ?? TextField;
          return (
            <Input
            style={{
              margin:20
            }}
              {...input.props}
              error={hasError}
              name={input.name}
              key={input.name}
              helperText={hasError ? errorHelps[input.name]?.['en'] : ""}
              onChange={updateCredentials(input.name, input.validator)}
              defaultValue={defaults?.[input.name]}
              autoComplete={"on"}
            />
          );
        })}

        <Stack className="bottom_section" spacing={2}>
          <SubmitButton onClick={() =>{
            submit()
          }}>Register</SubmitButton>
          <IconButton startIcon={<FacebookIcon color="info"/>} >
             Sign Up Facebook
          </IconButton>
          <IconButton startIcon={<GoogleIcon color="error"/>}>
             Sign Up Google
          </IconButton>

         
            <Stack direction="row" spacing={1}>
              <Typography color="secondary">Already Registered?</Typography>
              <Link to="/login">
                <Typography className="link">Login</Typography>
              </Link>
            </Stack>
          
        </Stack>
      </Stack>
    </>
  );
};

export const getInputs = (state: Credentials | null) => {
  const inputs: InputField[] = [
    {
      name: "full_name",
      validator: (name) => FULL_NAME_REGEX.test(name),
      props: {
        placeholder: "Enter your Display Name",
        label: "Display Name",
        required: true,
      },
    },
    {
      name: "email",
      validator: (number) => true,
      props: {
        placeholder: "Enter your Email",
        label: "Email",
        required: true,
      },
    },
    {
      name: "password",
      validator: (password) => PASSWORD_REGEX.test(password),
      props: {
        placeholder: "Enter your password",
        type: "password",
        required: true,
        label: "Password",
      },
    },
    {
      name: "confirm_password",
      validator: (typedPassword) => state?.password === typedPassword,
      props: {
        placeholder: "Enter your password again",
        type: "password",
        required: true,
        label: "Confirm Password",
      },
    },
  ];

  return inputs;
};

const errorHelps: ErrorHelps = {
  full_name: {
    en: "Only Letters are allowed and need to be at least 4 characters long",
  },
  type: {
    en: "Invalid Type",
  },
  number: {
    en: "Entered Number is Invalid",
  },
  password: {
    en: "Password need to be at least 8 characters long with a Number and a special character",
  },
  confirm_password: {
    en: "Both Passwords didn't match",
  },
};

export default RegisterPage;
