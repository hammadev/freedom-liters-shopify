import React from 'react';
import Svg, {G, Path, Defs, LinearGradient, Stop, Circle, ClipPath, Rect, Mask} from 'react-native-svg';

export function SearchFilterSvg({width, height}) {
  return (
    <Svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M28 19C29.1046 19 30 19.8954 30 21C30 22.1046 29.1046 23 28 23C26.8954 23 26 22.1046 26 21C26 19.8954 26.8954 19 28 19Z"
        fill="white"
      />
      <Path
        d="M34 26C35.1046 26 36 26.8954 36 28C36 29.1046 35.1046 30 34 30C32.8954 30 32 29.1046 32 28C32 26.8954 32.8954 26 34 26Z"
        fill="white"
      />
      <Path
        d="M22 33C23.1046 33 24 33.8954 24 35C24 36.1046 23.1046 37 22 37C20.8954 37 20 36.1046 20 35C20 33.8954 20.8954 33 22 33Z"
        fill="white"
      />

      <Path
        d="M20 21L26 21M26 21C26 22.1046 26.8954 23 28 23C29.1046 23 30 22.1046 30 21M26 21C26 19.8954 26.8954 19 28 19C29.1046 19 30 19.8954 30 21M30 21L36 21M20 28H32M32 28C32 29.1046 32.8954 30 34 30C35.1046 30 36 29.1046 36 28C36 26.8954 35.1046 26 34 26C32.8954 26 32 26.8954 32 28ZM24 35H36M24 35C24 33.8954 23.1046 33 22 33C20.8954 33 20 33.8954 20 35C20 36.1046 20.8954 37 22 37C23.1046 37 24 36.1046 24 35Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
