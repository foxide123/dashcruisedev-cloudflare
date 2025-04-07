import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { IconPropsType, IconSizeEnum } from "@/types/icon_types"


export default function XIcon({
  color = "text-carrot-500",
  size = IconSizeEnum.small,
} : IconPropsType) {

  const iconSizeMap = {
    [IconSizeEnum.small]: 24,
    [IconSizeEnum.medium]: 48,
    [IconSizeEnum.big]: 72
  }

  const iconWidth = iconSizeMap[size] ?? 24;

  

  return (
    <FontAwesomeIcon icon={faX} className={`mr-5 ${color} w-[${iconWidth}px]`} />
  )
}