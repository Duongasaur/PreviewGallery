import React from "react";
import { animated } from "react-spring";
import useDrag from "./useDrag";

const WIDTH = window.innerWidth / 2;

const Carousel = props => {
  const { photos, index, setIndex } = props;
  const [bind, springs] = useDrag(WIDTH, photos, setIndex, index);
  const pictures = Object.keys(photos).map(_ => photos[_]);

  return (
    <div className="carousel">
      {springs.map(({ x, sc }, i) => (
        <animated.div
          key={i}
          style={{
            transform: x.interpolate(x => `translate3d(${x}px,0,0)`)
          }}
          {...bind()}
        >
          <animated.div
            style={{
              transform: sc.interpolate(s => `scale(${s})`),
              backgroundImage: `url(${pictures[i]})`
            }}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default Carousel;
