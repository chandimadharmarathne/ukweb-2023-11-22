import { Checkbox, Stack, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/submit-button";
import { REGISTERED_NUM } from "../../constants/keys";
import { MOBILE_NUM_REGEX, PASSWORD_REGEX } from "../../constants/regex";
import { DATA_USER_TYPES } from "../../constants/user-types";
import * as authService from "../../services/auth-service";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { Credentials, ErrorHelps, InputField } from "../../utils/auth-types";
import { Errors } from "../../utils/errors";
import IconButton from "../../components/text-button";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { LOGIN_USER_MUTATION } from "../../query";
import { useMutation } from "@apollo/client";
import client from "../../applo";
import GoogleLogin from "react-google-login";
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


const LoginPage: FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    type: DATA_USER_TYPES[0].id,
  });
  const { update } = useAuthentication();
  const { code } = useLanguage();
  const { addSnack } = useSnackbar();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [loginUser, { data, error }] = useMutation(LOGIN_USER_MUTATION, {
    client: client
  })

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


      const { data } = await loginUser({
        variables: {
          email: credentials?.email,
          password: credentials?.password
        },
      });


      // Handle successful registration, e.g., show a success message or redirect


      if (data) {

        localStorage.setItem("user", JSON.stringify(data.registerUser))
        addSnack?.({
          severity: "success",
          message: "You've successfully Logged",
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

  const responseGoogle = (response: any) => {
    console.log(response);
    // Handle Google authentication response here
  };

  const customGoogleButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#DB4437', // Google red color
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Custom Sign In with Google
    </button>
  );




  return (
    <>

      <Typography variant="h1" style={{
        paddingTop: '90px'
      }}>Login</Typography>
      <Typography className="description" style={{
        fontSize: '14px',

      }}>
        Welcome back. Sign in to your account
      </Typography>

      <Stack spacing={4} className="content">
        {inputs.map((input) => {
          const hasError = credentials?.[input.name] === Errors.INPUT_ERROR;
          const Input = input.CustomComponent ?? TextField;
          return (
            <Input
              style={{
                margin: 20
              }}
              {...input.props}
              error={hasError}
              name={input.name}
              key={input.name}
              helperText={hasError ? errorHelps[input.name]?.[code] : ""}
              onChange={updateCredentials(input.name, input.validator)}
            />
          );
        })}

        <Stack direction="row" style={{
          justifyContent: 'center',

        }}>

          <Checkbox checked={checked} onChange={(e) => {

            localStorage.setItem("email", credentials?.email)
            localStorage.setItem("password", credentials?.password)
            setChecked(!checked)

          }} />
          <Typography style={{
            marginTop: 10
          }} className="link">
            Stay signed in
          </Typography>
        </Stack>

        <Stack className="bottom_section" spacing={2}>
          <SubmitButton onClick={() => {
            submit()
          }}>Login</SubmitButton>
          <IconButton startIcon={<FacebookIcon color="info" />} >
            Sign In Facebook
          </IconButton>

          <GoogleLogin
            clientId="GOOGLE_CLIENT_ID"
            buttonText="Sign In with Google"
            onSuccess={(response) => responseGoogle(response)}
            onFailure={(response) => responseGoogle(response)}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <IconButton startIcon={<GoogleIcon color="error" />} onClick={renderProps.onClick}>
                Sign In Google
              </IconButton>
            )}
          />

          {/* <IconButton startIcon={<GoogleIcon color="error" />}>
            Sign In Google
          </IconButton> */}
          <Link to="/forgot-password">
            <Typography style={{
              textAlign: 'center'
            }} className="link">Forgot Your Password?</Typography>
          </Link>
          <Stack direction="row" spacing={1}>

            <Typography color="secondary">Not Registered Yet?</Typography>
            <Link to="/register">
              <Typography className="link">Register</Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export const inputs: InputField[] = [
  /*
  {
    name: "type",
    validator: (type: UserType) => !!userTypes.find((t) => t.id === type),
    CustomComponent: ({
      error,
      onChange,
      name,
      helperText,
    }: CustomComponentProps) => (
      <FormControl error={error} variant="standard">
        <FormLabel required id="user-type">
          Employer Type
        </FormLabel>
        <RadioGroup
          aria-labelledby="user-type"
          defaultValue={userTypes[0]?.id}
          name={name}
          onChange={onChange}
        >
          <Stack direction="row">
            {userTypes.map((type) => (
              <FormControlLabel
                key={type.id}
                value={type.id}
                label={type.displayText}
                control={<Radio />}
                className="user_type_label"
              />
            ))}
          </Stack>
        </RadioGroup>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    ),
  },
  */
  {
    name: "email",
    validator: (number) => {
      return true
    },
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
];

const errorHelps: ErrorHelps = {
  type: {
    en: "Invalid Type",
    si: "",
  },
  number: {
    en: "Entered Number is Invalid",
    si: "",
  },
  password: {
    en: "Password need to be at least 8 characters long with a Number and a special character",
    si: "",
  },
};

export default LoginPage;
