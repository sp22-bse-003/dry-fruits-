"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Fallback image if loading fails
  const fallbackSrc = "/placeholder.jpg"

  if (error) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={className}
        unoptimized
      />
    )
  }

  return (
    <Image
      src={src || fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={`
        duration-700 ease-in-out
        ${isLoading ? "scale-110 blur-sm grayscale" : "scale-100 blur-0 grayscale-0"}
        ${className}
      `}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        setIsLoading(false)
        setError(true)
      }}
      loading={priority ? "eager" : "lazy"}
      quality={85}
      unoptimized
    />
  )
}
