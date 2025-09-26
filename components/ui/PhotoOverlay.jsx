import { RxCross2 } from "react-icons/rx";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

export default function PhotoOverlay({
  pictures,
  selectedIndex,
  setSelectedIndex,
}) {
  const nextImage = (n=1) => {
    const s = (selectedIndex+n) % pictures.length
    setSelectedIndex(s >= 0 ? s : pictures.length + s)
  }

  return <>
    {
      selectedIndex >= 0 &&
      <div
        onClick={() => setSelectedIndex(-1)}
        className="
          fixed inset-0 bg-black/80 flex items-center justify-center z-50
          text-neutral-light gap-[1rem] px-[1rem] flex-col select-none
        "
      >
        <img
          src={pictures[selectedIndex]}
          alt="enlarged photo"
          className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
        />
        {
          pictures.length > 1 &&
          <div className="flex gap-[1rem] absolute bottom-4">
            <FaChevronCircleLeft
              onClick={e => {nextImage(-1); e.stopPropagation()}}
              className="cursor-pointer hover:text-secondary"
              size={48}
            />
            <FaChevronCircleRight
              onClick={e => {nextImage(1); e.stopPropagation()}}
              className="cursor-pointer hover:text-secondary"
              size={48}
            />
          </div>
        }
        <RxCross2
          onClick={() => setSelectedIndex(-1)}
          className="
            absolute top-4 right-4 cursor-pointer hover:text-secondary
          "
          size={48}
        />
      </div>
    }
  </>
}