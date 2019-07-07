import React, { useState } from "react";

import Previews from "./Previews";
import Carousel from "./Carousel";

const Gallery = props => {
  const { photos } = props;
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Carousel photos={photos} index={index} setIndex={setIndex} />
      <Previews photos={photos} index={index} setIndex={setIndex} />
    </div>
  );
};

export default Gallery;
