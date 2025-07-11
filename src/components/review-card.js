"use client"

import { useState } from "react"
import Ratings from "./ratings"
import { Check, Reply, Play } from "lucide-react"

export default function ReviewCard({
  name,
  rating,
  isVerified = false,
  reviewText,
  mediaSrc,
  mediaType,
  reply,
}) {
  const [showFullText, setShowFullText] = useState(false)

  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-secondary p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">{name}</span>
          {isVerified && (
            <button aria-label="Verified Purchase">
              <div className="w-fit rounded-full border border-blue bg-blue/10 p-0.5">
                <Check className="size-3 text-blue" />
              </div>
            </button>
          )}
        </div>
        <Ratings rating={rating} size={20} />
        <div className="flex flex-col">
          <div className={`relative ${showFullText ? "" : "line-clamp-3"}`}>
            <p className="text-muted-foreground">{reviewText}</p>
          </div>
          {!showFullText &&
            reviewText.length > 150 && ( // Simple heuristic for "See more"
              <button type="button" className="mt-1 text-left underline" onClick={() => setShowFullText(true)}>
                See more
              </button>
            )}
        </div>
        {mediaSrc && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg"
              aria-label={`View ${mediaType} from review`}
            >
              {mediaType === "video" ? (
                <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg">
                  <video
                    src={mediaSrc}
                    className="absolute inset-0 h-full w-full object-cover"
                    preload="metadata"
                    playsInline
                  ></video>
                  <div className="z-10 rounded-full bg-black/60 p-4">
                    <Play className="size-8 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  className="w-full rounded-lg"
                  alt={`Review ${mediaType}`}
                  aria-hidden="true"
                  src={mediaSrc || "/placeholder.svg"}
                />
              )}
            </button>
          </div>
        )}
        {reply && (
          <div className="flex flex-col gap-2 rounded-md p-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black">
                <img
                  alt={reply.author}
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  src={reply.logoSrc || "/placeholder.svg"}
                  style={{ color: "transparent" }}
                />
              </div>
              <span className="text-lg font-medium">{reply.author}</span>
              <Reply className="ml-auto size-5" />
            </div>
            <div className="relative overflow-hidden transition-all duration-300 max-h-[90px]">
              <p
                className="overflow-hidden text-ellipsis text-muted-foreground"
                style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
              >
                {reply.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
