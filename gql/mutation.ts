import {gql} from "@apollo/client"

export const IS_USER_EXIST = gql`
  mutation isUserExists($input: String!) {
    isUserExists(email: $input)
  }
`
export const SEND_CONFIREMATION_CODE = gql`
  mutation SendConfiremationEmail($input: SendCodeInput!) {
    sendConfiremationEmail(sendCodeInput: $input) {
      sendDate
      codeLength
    }
  }
`

export const CONFIRM_CODE = gql`
  mutation ConfirmEmail($input: ConfirmEmailInput!) {
    confirmEmail(confirmEmailInput: $input) {
      message
      isValide
    }
  }
`

export const REGISTER = gql`
  mutation SignUp($input: SignupInput!) {
    signUp(signupInput: $input) {
      message
    }
  }
`

export const LOGIN = gql`
  mutation Signin($input: SigninInput!) {
    signIn(signinInput: $input) {
      message
    }
  }
`

export const LOGIN_WITH_GOOGLE = gql`
  mutation signInWithGoogle($input: String!) {
    signInWithGoogle(credential: $input) {
      message
    }
  }
`

export const SEND_FORGOT_PASSWORD_EMAIL = gql`
  mutation SendForgetPassword($input: String!) {
    sendResetPasswordEmail(email: $input) {
      message
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(resetPassword: $input) {
      message
    }
  }
`
export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      message
    }
  }
`

export const LOGOUT = gql`
  mutation SignOut {
    signOut {
      message
    }
  }
`

export const BUY_TOKEN = gql`
  mutation BuyNewToken($input: UpdateBalanceInput!) {
    buyToken(buyInput: $input) {
      id
      totalLocked
      totalUnlocked
      totalToken
      buyToken {
        id
        currencyUsed
        currencyprice
        amount
        tokenUnits
        tokenPrice
        status
        createdAt
        updatedAt
      }
    }
  }
`
