import { gql } from '@apollo/client';

export const QUERY_DRUG = gql`
  query getDrug($dinNumber: String) {
    drugs(dinNumber: $dinNumber) {
      _id
      drugName
      inventory
      dinNumber
      description
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      drEmail
      drFirstName
      drLastName
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      drEmail
      drFirstName
      drLastName
      friendCount
    }
  }
`;


export const QUERY_DOCTOR = gql`
query Doctor($id: ID!) {
  doctor(_id: $id) {
    _id
    drEmail
    drFirstName
    drLastName
    patients {
      _id
      patientFirstName
      patientLastName
      patientEmail
      drId
      drNotes
    }
  }
}
`;


export const QUERY_PATIENT = gql`
    {
    patients {
      _id
      patientFirstName
      patientLastName
      drId
      drNotes
    }
  }
`;

export const QUERY_DRUGS = gql`
    {
    drugs {
        _id
        drugName
        inventory
        dinNumber
        description
    }
  }
`;

export const QUERY_SINGLE_PATIENT = gql`
    query Patient($id: ID!){
    patient (_id: $id) {
      _id
      patientFirstName
      patientLastName
      drId
      drNotes
    }
  }
`;