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
} from 'react-native-svg';

export function FilterSvg({ color, height }) {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G opacity="0.15">
                <Path d="M12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3Z" fill="white" />
                <Path d="M18 10C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10Z" fill="white" />
                <Path d="M6 17C7.10457 17 8 17.8954 8 19C8 20.1046 7.10457 21 6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17Z" fill="white" />
            </G>
            <Path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </Svg>
    )
}
export function FilterSearchSvg({ color, height }) {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9.54667 12.7133C9.54667 13.12 9.27998 13.6533 8.93998 13.86L8 14.4666C7.12667 15.0066 5.91333 14.4 5.91333 13.32V9.7533C5.91333 9.27996 5.64667 8.6733 5.37333 8.33997L2.81331 5.64663C2.47331 5.30663 2.20667 4.70663 2.20667 4.29997V2.7533C2.20667 1.94663 2.81334 1.33997 3.55334 1.33997H12.4467C13.1867 1.33997 13.7933 1.94663 13.7933 2.68663V4.16663C13.7933 4.70663 13.4533 5.37996 13.12 5.7133" stroke="#080E1E" strokeOpacity="0.6" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M10.7134 11.0134C11.8916 11.0134 12.8467 10.0583 12.8467 8.88005C12.8467 7.70184 11.8916 6.7467 10.7134 6.7467C9.53515 6.7467 8.58002 7.70184 8.58002 8.88005C8.58002 10.0583 9.53515 11.0134 10.7134 11.0134Z" stroke="#080E1E" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M13.2467 11.4134L12.58 10.7467" stroke="#080E1E" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )
}


