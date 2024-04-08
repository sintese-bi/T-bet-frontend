import { Tittle } from ".."
import { IoArrowForwardOutline } from "react-icons/io5"
import { Truncate } from "../../utils"
import { Link } from "react-router-dom"

type Props = {
  className?: string
  url?: string
  title: string
  to: string
}

export const Card = ({
  title,
  url = "https://source.unsplash.com/random",
  className,
  to,
}: Props) => {
  return (
    <Link
      to={to}
      className={`flex flex-col w-64 border-2 border-black rounded-lg hover:border-slate-500 hover:shadow-lg ${className}`}>
      <img className="h-36 rounded-t-lg" src={url} alt="Comunity banner" />
      <div className="flex justify-between items-center p-4">
        <Tittle>{Truncate(title)}</Tittle>
        <IoArrowForwardOutline />
      </div>
    </Link>
  )
}
