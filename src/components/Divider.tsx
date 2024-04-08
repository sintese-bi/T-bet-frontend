type Props = {
  className?: string
}

export const Divider = ({ className }: Props) => {
  return <div className={`border-b-2 border-slate-200 ${className}`} />
}
