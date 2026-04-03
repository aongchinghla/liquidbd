import { useEffect } from "react";
import gsap from "gsap";

export function useGsapAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
      gsap.fromTo(
        ".card-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.15 }
      );
    });

    return () => ctx.revert();
  }, []);
}
