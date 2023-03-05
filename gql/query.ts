import {gql} from "@apollo/client"

export const GET_USER_BY_ID = gql`
  query {
    getUserById {
      id
      birthDate
      email
      fullName
      isEmailVerified
      password
      avatar
      role
      usedName
      createdAt
      updatedAt
      account {
        id
        provider
        type
        providerId
        refreshTokenHash
      }
      balance {
        id
        totalLocked
        totalUnlocked
        buy {
          id
          totalToken
          buyToken {
            currencyUsed
            currencyprice
            amount
            tokenUnits
            tokenPrice
            buyPhase
            status
            createdAt
          }
        }
        withdrawal {
          id
          totalWithdrawal
        }
      }
    }
  }
`
