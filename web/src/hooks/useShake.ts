import { useEffect, useRef } from "react";

/**
 * Detect device shake gesture.
 * Calls `onShake` when a shake is detected.
 */
export function useShake(onShake: () => void, threshold = 15): void {
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });
  const callbackRef = useRef(onShake);
  callbackRef.current = onShake;

  useEffect(() => {
    function handleMotion(e: DeviceMotionEvent) {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;

      const deltaX = Math.abs(x - lastAcceleration.current.x);
      const deltaY = Math.abs(y - lastAcceleration.current.y);
      const deltaZ = Math.abs(z - lastAcceleration.current.z);

      if (deltaX + deltaY + deltaZ > threshold) {
        callbackRef.current();
      }

      lastAcceleration.current = { x, y, z };
    }

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [threshold]);
}
