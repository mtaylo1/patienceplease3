import { gql } from '@apollo/client';

export const LOGIN_DOCTOR = gql`
  mutation login($drEmail: String!, $drPassword: String!) {
    login(drEmail: $drEmail, drPassword: $drPassword) {
      token
      doctor {
      _id
      drEmail
      drPassword
    }
  }
}
`;



export const ADD_DOCTOR = gql`
  mutation addDoctor(
    $drFirstName: String!
    $drLastName: String!
    $drEmail: String!
    $drPassword: String!
  ) {
    addDoctor(
      drFirstName: $drFirstName
      drLastName: $drLastName
      drEmail: $drEmail
      drPassword: $drPassword
    ) {
      token
      doctor {
        _id
        drEmail
      }
    }
  }
`;




// export const ADD_ORDER = gql`
//   mutation addOrder($drugs: [ID]!) {
//     addOrder(drugs: $drugs) {
//       purchaseDate
//       drugs {
//         _id
//         drugName
//         inventory
//         dinNumber 
//         description
//       }
//     }
//   }
// `;

export const ADD_PATIENT = gql`
mutation addPatient($patientFirstName: String!, $patientLastName: String!, $patientEmail: String!, $drNotes: String, $appointmentNotes: String) {
  addPatient(patientFirstName: $patientFirstName, patientLastName: $patientLastName, patientEmail: $patientEmail, drNotes: $drNotes, appointmentNotes: $appointmentNotes) {
    _id
    appointmentNotes
    drNotes
    patientEmail
    patientFirstName
    patientLastName
    appointments {
      _id
      appointmentDate
      createdAt
      location
      updatedAt
    }
  }
}
`;
export const UPDATE_PATIENT =gql`
mutation updatePatient($patientFirstName: String!, $patientLastName: String!, $patientEmail: String!, $drNotes: String, $appointmentNotes: String) {
  updatePatient(patientFirstName: $patientFirstName, patientLastName: $patientLastName, patientEmail: $patientEmail, drNotes: $drNotes, appointmentNotes: $appointmentNotes) {
    _id
    appointmentNotes
    drNotes
    patientEmail
    patientFirstName
    patientLastName
    appointments {
      _id
      appointmentDate
      createdAt
      location
      updatedAt
    }
  }
}
`

export const UPDATE_NOTES =gql`
mutation updateNotes($id: ID!) {
  updateNotes(patientFirstName: $patientFirstName, patientLastName: $patientLastName, patientEmail: $patientEmail, drNotes: $drNotes, appointmentNotes: $appointmentNotes) {
    _id
    drNotes
  }
}
`

export const UPDATE_DRUGS =gql`
mutation updateDrugs($drugName: String!, $inventory: Int!, $dinNumber: String!, $description: String) {
  updateDrugs(drugName: $drugName, inventory: $inventory, dinNumber: $dinNumber, description: $description) {
    _id
    drugName
    inventory
    dinNumber
    description
  }
}
`