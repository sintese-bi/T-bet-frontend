import { toast } from "react-toastify"

type NotifyType = "success" | "error" | "warn" | "info"
type NotifyProps = {
  message: string
  type: NotifyType
}

export function Notify({ message, type }: NotifyProps) {
  return toast[type](message)
}
