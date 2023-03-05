import {useState} from "react"

const useUser = () => {
  const [user, setUser] = useState({})

  const login = (userData: any) => {
    setUser(userData)
  }

  const logout = () => {
    setUser({})
  }

  return {
    user,
    login,
    logout,
  }
}

export default useUser
