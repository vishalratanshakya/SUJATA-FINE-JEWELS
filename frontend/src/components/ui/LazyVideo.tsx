"use client";

import { useEffect, useRef, useState, VideoHTMLAttributes } from "react";

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

export function LazyVideo({ src, poster, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" } // Load right before it comes into view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optimize Cloudinary Video URLs
  const optimizedSrc = src?.includes("res.cloudinary.com") && src.includes("/upload/") && !src.includes("q_auto")
    ? src.replace("/upload/", "/upload/q_auto,f_auto,w_1080/") // w_1080 bounds resolution for mobile/desktop
    : src;

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload={shouldLoad ? "auto" : "none"}
      {...props}
      {...(shouldLoad ? { src: optimizedSrc } : {})}
    />
  );
}
