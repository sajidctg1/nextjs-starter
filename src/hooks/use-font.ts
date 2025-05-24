"use client";

import { useEffect, useState } from "react";

import { parseCookie } from "~/lib/helpers";

export const FONT_COOKIE_NAME = "font";
const FONT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function useFont() {
  const [font, setFont] = useState(() => {
    if (typeof document === "undefined") return "";
    const cookies = parseCookie(document.cookie);
    return cookies[FONT_COOKIE_NAME];
  });

  useEffect(() => {
    if (!font) return;
    document.cookie = `${FONT_COOKIE_NAME}=${font}; path=/; max-age=${FONT_COOKIE_MAX_AGE}`;

    const classList = document.body.classList;
    if (classList.contains(font)) return;

    classList.forEach((c) => {
      if (c.startsWith("font-")) {
        classList.remove(c);
      }
    });

    classList.add(font);
  }, [font]);

  return { font, setFont };
}
