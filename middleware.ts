import {jwtVerify} from "jose"
import {NextResponse} from "next/server"

export async function middleware(req: any, res: any) {
  const {pathname} = req.nextUrl
  const accessToken = req.cookies.get("_at")?.value
  const refreshToken = req.cookies.get("_rt")?.value

  if (!accessToken)
    return NextResponse.redirect(new URL("/auth/login", req.url))

  try {
    const {payload} = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.AT_SECRET)
    )
  } catch (error: any) {
    console.log(error.name)
    if (error.name == "JWTExpired") {
      const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          cookie: `_rt=${refreshToken}`,
        },
        body: JSON.stringify({
          query: `mutation RefreshToken {refreshToken{accessToken, refreshToken}}`,
        }),
      })

      const {data, errors} = await res.json()

      if (data.refreshToken) {
        const {accessToken, refreshToken} = data.refreshToken

        const response = NextResponse.redirect(new URL(req.url, req.url))

        response.cookies.set("_at", accessToken)
        response.cookies.set("_rt", refreshToken)

        return response
      }

      if (errors) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
      }
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/user/dashboard",
    "/user/buy-token",
    "/user/buy-token",
    "/user/balance",
    "/user/airdrop",
    "/user/wallets",
  ],
}
