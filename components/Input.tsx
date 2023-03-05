import {useState} from "react"
import {FieldValues, UseFormRegister} from "react-hook-form"
import {GiEyeOfHorus} from "react-icons/gi"

interface InputProps {
  type: string
  name: string
  label: string
  register: UseFormRegister<FieldValues>
  required?: boolean
  pattern?: RegExp
  minLength?: number
  maxLength?: number
  validate?: (value: string) => string | boolean
}

export default function Input({
  type,
  name,
  label,
  register,
  required,
  pattern,
  minLength,
  maxLength,
  validate,
}: InputProps) {
  const [changeType, setChangetype] = useState(false)

  const changeTypeFunction = () => {
    setChangetype(!changeType)
  }
  return (
    <div className={`relative w-full`}>
      <input
        type={changeType ? "text" : type}
        {...register(name, {
          required: required ? required : false,
          pattern: pattern ? pattern : undefined,
          minLength: minLength ? minLength : undefined,
          maxLength: maxLength ? maxLength : undefined,
          validate: validate ? validate : undefined,
        })}
        id={name}
        placeholder=" "
        className={`peer w-full p-2 rounded bg-transparent outline-none border-2 border-slate-300 dark:border-slate-500 focus:border-primary-100 dark:focus:border-primary-100 `}
        autoComplete="off"
        required={required ? required : false}
      />
      <label
        htmlFor="one"
        className={`w-max absolute tracking-widest px-2 -top-2 ltr:left-3 rtl:right-3 text-yellow-light text-xs bg-layout-200 dark:bg-layout-800  transition-all duration-300  capitalize pointer-events-none peer-focus:text-primary-100 peer-focus:bg-layout-200 dark:peer-focus:bg-layout-800 peer-focus:text-xs ltr:peer-focus:left-3
        rtl:peer-focus:left-3 peer-focus:-top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-[0.65rem] peer-placeholder-shown:left-2
        peer-placeholder-shown:text-slate-500 peer-placeholder-shown:bg-transparent`}
      >
        {label}
      </label>
      {type === "password" && (
        <GiEyeOfHorus
          className={`${
            changeType ? "text-yellow-600" : "text-slate-400"
          } absolute inset-y-0 text-3xl h-full cursor-pointer flex ltr:right-2 rtl:left-2`}
          onClick={changeTypeFunction}
        />
      )}
    </div>
  )
}
