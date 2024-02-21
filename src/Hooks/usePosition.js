import React from "react";

export default function usePosition(htmlElement, isState) {
  const [isPosition, setIsPosition] = React.useState([]);

  React.useEffect(() => {
    var rect = htmlElement.current.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    const width = rect.width;
    const height = rect.height;
    const bottom = rect.bottom;

    setIsPosition([top, left, width, height, bottom]);
  }, [htmlElement, isState]);

  return isPosition;
}
