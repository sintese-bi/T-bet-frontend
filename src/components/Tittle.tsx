import { Text, TextProps } from "@mantine/core"

type Props = TextProps & {
  className?: string
  children: React.ReactNode
}

export const Tittle = ({ className, children, ...rest }: Props) => {
  return (
    <Text className={`${className}`} {...rest}>
      {children}
    </Text>
  )
}
