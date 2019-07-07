import React, { useState, useEffect } from "react";
import classname from "classnames";
import { animated } from "react-spring";
import { useTransition } from "react-spring";

import clamp from "./clamp";

const PREVIEW_LENGTH = 5;

const Preview = props => {
  const { photos, index, setIndex } = props;
  const [start, setStart] = useState(0);
  const photoIds = Object.keys(photos);

  const selected = photoIds[index];
  const photosRange = photoIds.slice(start, start + PREVIEW_LENGTH);
  const maxIndex = photoIds.length - PREVIEW_LENGTH;

  useEffect(() => {
    const legalStart = number => clamp(number, 0, maxIndex);
    const setIfDifferent = val => {
      const newStart = legalStart(val);
      start !== newStart && setStart(newStart);
    };
    if (index === start) {
      setIfDifferent(index - 1);
    }
    if (index === start + 4) {
      setIfDifferent(index - 3);
    }
  }, [index, maxIndex, start, setStart]);

  const setOnclick = id => () => setIndex(photoIds.indexOf(id));

  const transitions = useTransition(photosRange, _ => _, {
    from: { opacity: 0, width: 0 },
    enter: { opacity: 1, width: 100 },
    leave: { opacity: 0, width: 0 }
  });

  const renderTransition = transition => {
    const { item, props, key } = transition;
    const photoClass = classname("display--inline", {
      selected: item === selected
    });
    const style = {
      backgroundImage: `url(${photos[item]})`
    };

    return (
      <animated.div
        key={key}
        className={photoClass}
        style={props}
        onClick={setOnclick(item)}
      >
        <div style={style} />
      </animated.div>
    );
  };

  return <div className="preview">{transitions.map(renderTransition)}</div>;
};

export default Preview;
