import { useEffect } from "react";

export function useIOSScrollFix(isFocused: boolean) {
  useEffect(() => {
    let initialScrollY = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (isFocused) {
        if (!initialScrollY) initialScrollY = currentY;
        if (currentY > initialScrollY) window.scrollTo(0, initialScrollY);
      } else {
        initialScrollY = 0;
        window.scrollTo(0, 0);
      }
    };

    const handleViewportResize = () => {
      if (!isFocused || !window.visualViewport) return;
      const { height } = window.visualViewport;
      if (height < window.innerHeight * 0.8) {
        setTimeout(() => {
          (document.activeElement as HTMLElement | null)?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.visualViewport?.addEventListener("resize", handleViewportResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.visualViewport?.removeEventListener(
        "resize",
        handleViewportResize
      );
    };
  }, [isFocused]);
}
