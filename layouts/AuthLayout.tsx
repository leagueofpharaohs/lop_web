import {jwtVerify} from "jose"
import {GetServerSideProps} from "next"
import React from "react"
import {ReactNode} from "react"

export default function AuthLayout(child: ReactNode) {
  return <React.Fragment>{child}</React.Fragment>
}
