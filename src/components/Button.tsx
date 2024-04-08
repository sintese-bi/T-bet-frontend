import { ButtonProps, Button as MantineButton } from "@mantine/core"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    className?: string
    inverted?: boolean
  }

export const Button = ({ children, inverted, className, ...rest }: Props) => {
  return inverted ? (
    <MantineButton
      {...rest}
      className={`text-white bg-black font-normal rounded-md hover:bg-gray-800 ${className}`}>
      {children}
    </MantineButton>
  ) : (
    <MantineButton
      {...rest}
      className={`text-black font-normal border-1 border-black rounded-md hover:bg-gray-100 hover:text-black ${className}`}>
      {children}
    </MantineButton>
  )
}
