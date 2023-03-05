import SignInForm from "@/components/forms/SignInForm"
import useTranslation from "next-translate/useTranslation"
import {GetServerSideProps} from "next"
import SignBox from "@/components/pages/auth/SignBox"
import AuthLayout from "@/layouts/AuthLayout"
import {useState} from "react"
import {jwtVerify} from "jose"

export default function Login() {
  const {t} = useTranslation("common")
  const [loading, setLoading] = useState(false)
  return (
    <div className="sign_wrapper">
      <SignBox
        title={t("signTo")}
        footerTitle={t("notMamber")}
        footerUrl={"/auth/register"}
        footerLinkText={t("signUp")}
        soicalAuth={true}
        loading={loading}
        setLoading={setLoading}
      >
        <SignInForm loading={loading} setLoading={setLoading} />
      </SignBox>
    </div>
  )
}

Login.getlayout = AuthLayout

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
            destination: "/user/dashboard",
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
