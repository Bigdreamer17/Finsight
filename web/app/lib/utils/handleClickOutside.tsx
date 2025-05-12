import { RefObject } from "react";

export const handleClickOutside = (
  event: MouseEvent,
  ref: RefObject<HTMLDivElement | null>,
  clickOutside: () => void,
) => {
  if (ref.current && !ref.current.contains(event.target as Node)) {
    clickOutside();
  }
};
