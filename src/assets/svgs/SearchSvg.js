import React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  ClipPath,
  Rect,
  Mask,
} from 'react-native-svg';

export function SearchFilterSvg() {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M3 6H6.5M21 6H11.5" stroke="#597766" strokeLinejoin="round" />
      <Circle cx="9" cy="6" r="2.5" stroke="#597766" strokeLinejoin="round" />
      <Path d="M21 12H19M3 12H14" stroke="#597766" strokeLinejoin="round" />
      <Circle
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="matrix(-1 0 0 1 19 9.5)"
        stroke="#597766"
        strokeLinejoin="round"
      />
      <Path d="M3 18H8M21 18H13" stroke="#597766" strokeLinejoin="round" />
      <Circle cx="10.5" cy="18" r="2.5" stroke="#597766" strokeLinejoin="round" />
    </Svg>
  );
}
