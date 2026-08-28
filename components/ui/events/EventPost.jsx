"use client";

import { useState, useRef, useEffect } from "react";

import PhotoOverlay from "@/components/ui/PhotoOverlay";

import Image from "next/image";

import Button from "@/components/ui/Button";

import { PortableText } from "next-sanity";

import { twJoin } from "tailwind-merge";

function ExpandIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}


export default function EventPost({
  event,
  className = "",
  children,
  ...props
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descRef = useRef(null);

  const COLLAPSED_HEIGHT = 264; // roughly 9-10 lines at this line-height

  useEffect(() => {
    if (descRef.current) {
      setIsTruncated(descRef.current.scrollHeight > COLLAPSED_HEIGHT + 4);
    }
  }, [event.description]);

  return (
    <>
      <div
        className={twJoin(
          `
          group
          relative

          w-[92%]
          max-w-[120ch]
          mx-auto

          mb-8
          p-3
          sm:p-4
          md:p-5

          grid
          grid-cols-1
          md:grid-cols-[18rem_1fr]

          gap-5
          md:gap-7

          green-glass-container

          rounded-2xl

          border
          border-white/10

          overflow-hidden

          transition-all
          duration-300
          ease-out

          hover:border-yellow-400/40
          hover:shadow-xl
          hover:shadow-black/25
          hover:-translate-y-0.5
          `,
          className
        )}
        {...props}
      >
        {/* Image */}
        <button
          type="button"
          onClick={() => setSelectedIndex(0)}
          aria-label={`View photo for ${event.eventname}`}
          className="
            relative
            block
            w-full

            aspect-[16/10]
            md:aspect-auto
            md:h-full
            md:min-h-[14rem]

            overflow-hidden
            rounded-xl

            ring-1
            ring-white/10

            cursor-pointer

            transition-shadow
            duration-300

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-yellow-400
            focus-visible:ring-offset-2
            focus-visible:ring-offset-black/40
          "
        >
          {/* Blurred backdrop fill — same image, zoomed + blurred, so
              odd aspect ratios never leave empty letterbox space */}
          <Image
            alt=""
            aria-hidden="true"
            {...event.img.uncropped}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="
              absolute
              inset-0

              w-full
              h-full

              object-cover

              scale-110

              blur-2xl
              opacity-60

              brightness-[0.55]
              saturate-150
            "
          />

          {/* Full, uncropped poster — nothing ever gets cut off */}
          <Image
            alt=""
            {...event.img.uncropped}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="
              relative

              w-full
              h-full

              object-contain

              drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]

              transition-transform
              duration-500
              ease-out

              motion-safe:group-hover:scale-[1.03]
            "
          />

          {/* Hover scrim, kept light so it doesn't fight the poster */}
          <div
            className="
              pointer-events-none
              absolute inset-0

              bg-black/0

              transition-colors
              duration-300

              group-hover:bg-black/10
            "
          />

          {/* Corner expand badge — out of the way of poster content */}
          <span
            className="
              absolute
              bottom-2
              right-2

              flex items-center justify-center
              gap-1

              px-2
              py-1

              rounded-full

              bg-black/60
              backdrop-blur-sm

              ring-1
              ring-white/20

              text-[11px]
              font-medium
              text-white/90

              opacity-0
              translate-y-1

              transition-all
              duration-200

              group-hover:opacity-100
              group-hover:translate-y-0
            "
          >
            <ExpandIcon className="h-3 w-3" />
            View
          </span>
        </button>

        {/* Content */}
        <div className="flex min-w-0 flex-col justify-center">
          {/* Event title */}
          <h3
            className="
              mb-3

              text-lg
              sm:text-2xl

              font-semibold
              leading-snug
              tracking-tight

              text-white

              transition-colors
              duration-300

              group-hover:text-yellow-300
            "
          >
            {event.eventname}
          </h3>

          {/* Yellow accent */}
          <div
            className="
              mb-4

              h-[2px]
              w-8

              rounded-full
              bg-yellow-400

              transition-all
              duration-300
              ease-out

              group-hover:w-14
            "
          />

          {/* Description */}
          <div
            ref={descRef}
            style={{
              maxHeight: isExpanded ? "100rem" : `${COLLAPSED_HEIGHT}px`,
            }}
            className="
              mb-2

              max-w-[65ch]

              overflow-hidden

              text-sm
              sm:text-base

              leading-relaxed
              text-white/70

              transition-[max-height]
              duration-500
              ease-in-out

              [&_p]:mb-2
              [&_p:last-child]:mb-0

              [&_strong]:text-white
              [&_strong]:font-medium

              [&_a]:text-yellow-300
              [&_a]:underline
              [&_a]:decoration-yellow-300/40
              [&_a]:underline-offset-2

              [&_a:hover]:text-yellow-200
              [&_a:hover]:decoration-yellow-200/60
            "
          >
            <PortableText value={event.description} />
          </div>

          {isTruncated && (
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="
                mb-4

                self-start

                inline-flex
                items-center

                px-3
                py-1

                rounded-full

                bg-white/5

                ring-1
                ring-white/15

                text-xs
                font-semibold

                text-yellow-300

                transition-colors
                duration-200

                hover:bg-white/10
                hover:text-yellow-200

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-yellow-400
              "
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}

          {/* Buttons */}
          {event.links && (
            <div className="flex flex-wrap items-center gap-2.5">
              {event.links.map((l) => (
                <div key={l._key} className="w-fit">
                  <Button
                    href={l.url}
                    target="blank"
                    className="
                      group/btn

                      !m-0
                      !w-auto
                      !min-w-0
                      !inline-flex

                      items-center
                      gap-1.5

                      px-3.5
                      py-1.5

                      text-sm
                      font-medium

                      rounded-lg

                      transition-all
                      duration-200

                      hover:-translate-y-0.5
                      hover:shadow-md
                      hover:shadow-yellow-400/10

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-yellow-400
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-black/40
                    "
                  >
                    {l.text}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Children */}
          {children}
        </div>

        {/* Bottom yellow accent */}
        <div
          className="
            absolute
            bottom-0
            left-1/2

            h-[2px]
            w-0

            -translate-x-1/2

            bg-gradient-to-r
            from-transparent
            via-yellow-400
            to-transparent

            transition-all
            duration-500
            ease-out

            group-hover:w-1/2
          "
        />
      </div>

      {/* Photo Overlay */}
      <PhotoOverlay
        pictures={[event.img]}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </>
  );
}