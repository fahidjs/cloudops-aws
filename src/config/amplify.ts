import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-southeast-2_15pFNcqEM",
      userPoolClientId: "7e480835uugvqssgfccbvfsj0b",
      loginWith: {
        email: true,
      },
    },
  },
});