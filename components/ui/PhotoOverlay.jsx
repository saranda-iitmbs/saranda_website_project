import { RxCross2 } from "react-icons/rx";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { twJoin } from "tailwind-merge";
import Image from "next/image";


export default function PhotoOverlay({
  pictures,
  selectedIndex,
  setSelectedIndex,
  className = "",
  children,
  ...props
}) {
  if (!pictures || pictures.length == 0)
    return null;

  const nextImage = (n=1) => {
    const s = (selectedIndex+n) % pictures.length
    setSelectedIndex(s >= 0 ? s : pictures.length + s)
  };

  const safeIndex = () => selectedIndex === -1 ? 0 : selectedIndex;
  const pictureAttr = () => {
    const {
      src,
      overlay_src = null,
      width = 800,
      height = 800,
      ...attr
    } = pictures[safeIndex()];

    return {
      src: overlay_src || src,
      width: width,
      height: height,
      ...attr
    }
  }

  return (
    <div
      onClick={() => setSelectedIndex(-1)}
      className={twJoin(
        `fixed inset-0 bg-black/80 flex items-center justify-center z-50
        text-neutral-light gap-[1rem] px-[1rem] flex-col select-none`,
        className,
        (selectedIndex == -1) && "hidden",
      )}
      {...props}
    >
      <div className="max-h-[80vh] max-w-[90vw]">
        <Image
          {...pictureAttr()}
          alt="enlarged photo"
          sizes="100vw"
          className="rounded-lg shadow-xl object-contain w-auto h-full"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {children}
      {
        pictures.length > 1 &&
        <div className="flex gap-[1rem] absolute bottom-4">
          <FaChevronCircleLeft
            onClick={e => {nextImage(-1); e.stopPropagation()}}
            className="
              cursor-pointer hover:text-secondary active:text-secondary
            "
            size={48}
          />
          <FaChevronCircleRight
            onClick={e => {nextImage(1); e.stopPropagation()}}
            className="
              cursor-pointer hover:text-secondary active:text-secondary
            "
            size={48}
          />
        </div>
      }
      <RxCross2
        onClick={() => setSelectedIndex(-1)}
        className="
          absolute top-4 right-4 cursor-pointer hover:text-secondary
          active:text-secondary
        "
        size={48}
      />
    </div>
  )
}