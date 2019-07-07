import { useRef, useEffect } from "react";
import { useSprings } from "react-spring";
import { useGesture } from "react-use-gesture";

import clamp from "./clamp";

function makeSpring(currentIndex, width, down, xDelta, distance) {
  return i => {
    const x = (i - currentIndex) * width + (down ? xDelta : 0);
    const sc = down ? 1 - distance / width / 2 : 1;
    return { x, sc };
  };
}

const useDrag = (width, photos, setIndex, index) => {
  const indexRef = useRef(0);
  const pictures = Object.keys(photos).map(_ => photos[_]);
  const count = pictures.length;

  const [springs, set] = useSprings(count, i => ({
    x: i * width,
    sc: 1
  }));

  useEffect(() => {
    if (index !== indexRef.current) {
      indexRef.current = index;
      set(makeSpring(indexRef.current, width, 0, 0, 0));
    }
  }, [index, set, width]);

  const bind = useGesture(dragState => {
    const {
      down,
      delta: [xDelta],
      direction: [xDir],
      distance,
      cancel,
      event
    } = dragState;
    event.preventDefault();

    if (down && distance > width / 4) {
      indexRef.current = clamp(
        indexRef.current + (xDir > 0 ? -1 : 1),
        0,
        count - 1
      );
      setTimeout(() => setIndex(indexRef.current), 0);
      cancel();
    }
    set(makeSpring(indexRef.current, width, down, xDelta, distance));
  });

  return [bind, springs];
};

export default useDrag;
