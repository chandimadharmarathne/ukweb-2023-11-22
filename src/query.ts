// src/queries.js
import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query {
    books {
      title
      author
    }
  }
`;

export const GET_JOBS = gql`
  query {
    jobs {
        id
        candidate_name
        job_title_description
        published_on
        industry
        company_name
        location
        job_key
        price_range
        roster
        date_range
        required_doc
        features
        main_points
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
mutation RegisterUser($email: String!, $displayname: String!, $password: String!) {
  registerUser(email: $email, displayname: $displayname, password: $password) {
    id
    email
    displayname
   
  }
}
`;
export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      
      
        email
        displayname
      
     
    }
  }
`;




export const GET_CVS = gql`
query {
    cvs {
      id
      path
      label
    }
  }
` ;