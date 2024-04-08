import { useViewportSize } from "@mantine/hooks"
import { BREAKPOINTS } from "../constants"

type BreakpointResult =
  | typeof BREAKPOINTS.MOBILE
  | typeof BREAKPOINTS.TABLET
  | typeof BREAKPOINTS.LAPTOP

export const useBreakpoint = (): BreakpointResult => {
  const { width } = useViewportSize()

  if (width < BREAKPOINTS.MOBILE) {
    return BREAKPOINTS.MOBILE
  }

  if (width < BREAKPOINTS.TABLET) {
    return BREAKPOINTS.TABLET
  }

  return BREAKPOINTS.LAPTOP
}
