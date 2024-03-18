import { gql } from "@apollo/client";

export const CreateUserMutation = gql`
  mutation($firstName: String!, $address: String!, $email: String!, $phoneNo: String!, $password: String!, $confirmPassword: String!) 
  {
  registration(firstName: $firstName, address: $address, email: $email, phoneNo: $phoneNo, password: $password, confirmPassword: $confirmPassword)
}
`;