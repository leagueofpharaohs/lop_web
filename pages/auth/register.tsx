import SignupForm from "@/components/forms/SignupForm"
import SignBox from "@/components/pages/auth/SignBox"
import AuthLayout from "@/layouts/AuthLayout"
import {jwtVerify} from "jose"
import {GetServerSideProps} from "next"

import useTranslation from "next-translate/useTranslation"

export default function Register() {
  const {t} = useTranslation("common")
  return (
    <div className="sign_wrapper">
      <SignBox
        title={t("join")}
        footerTitle={t("alreadyMember")}
        footerUrl={"/auth/login"}
        footerLinkText={t("signIn")}
        soicalAuth={true}
      >
        <SignupForm />
      </SignBox>
    </div>
  )
}

Register.getlayout = AuthLayout

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {req, res} = context

  const accessToken = req.cookies["_at"]

  if (accessToken) {
    try {
      const {payload} = await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.AT_SECRET)
      )
      if (payload) {
        return {
          redirect: {
            destination: "/user/buy-token",
            permanent: false,
          },
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    props: {},
  }
}
