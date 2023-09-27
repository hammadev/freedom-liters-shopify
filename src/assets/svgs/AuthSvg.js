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

export function ChevronSvg({ color = 'white', height }) {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.5 16.5999L7.0667 11.1666C6.42503 10.5249 6.42503 9.4749 7.0667 8.83324L12.5 3.3999"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function UsernameSvg({ color, height }) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM6.084 19.536C6.6 18.456 9.744 17.4 12 17.4C14.256 17.4 17.412 18.456 17.916 19.536C16.284 20.832 14.232 21.6 12 21.6C9.768 21.6 7.716 20.832 6.084 19.536ZM19.632 17.796C17.916 15.708 13.752 15 12 15C10.248 15 6.084 15.708 4.368 17.796C3.144 16.188 2.4 14.184 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 14.184 20.856 16.188 19.632 17.796ZM12 4.8C9.672 4.8 7.8 6.672 7.8 9C7.8 11.328 9.672 13.2 12 13.2C14.328 13.2 16.2 11.328 16.2 9C16.2 6.672 14.328 4.8 12 4.8ZM12 10.8C11.004 10.8 10.2 9.996 10.2 9C10.2 8.004 11.004 7.2 12 7.2C12.996 7.2 13.8 8.004 13.8 9C13.8 9.996 12.996 10.8 12 10.8Z"
        fill="white"
      />
    </Svg>
  );
}
export function LockSvg({ color, height }) {
  return (
    <Svg
      width="19"
      height="24"
      viewBox="0 0 19 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M16 8H14.8571V5.71429C14.8571 2.56 12.2971 0 9.14286 0C5.98857 0 3.42857 2.56 3.42857 5.71429V8H2.28571C1.02857 8 0 9.02857 0 10.2857V21.7143C0 22.9714 1.02857 24 2.28571 24H16C17.2571 24 18.2857 22.9714 18.2857 21.7143V10.2857C18.2857 9.02857 17.2571 8 16 8ZM5.71429 5.71429C5.71429 3.81714 7.24571 2.28571 9.14286 2.28571C11.04 2.28571 12.5714 3.81714 12.5714 5.71429V8H5.71429V5.71429ZM14.8571 21.7143H3.42857C2.8 21.7143 2.28571 21.2 2.28571 20.5714V11.4286C2.28571 10.8 2.8 10.2857 3.42857 10.2857H14.8571C15.4857 10.2857 16 10.8 16 11.4286V20.5714C16 21.2 15.4857 21.7143 14.8571 21.7143ZM9.14286 18.2857C10.4 18.2857 11.4286 17.2571 11.4286 16C11.4286 14.7429 10.4 13.7143 9.14286 13.7143C7.88571 13.7143 6.85714 14.7429 6.85714 16C6.85714 17.2571 7.88571 18.2857 9.14286 18.2857Z"
        fill="white"
      />
    </Svg>
  );
}

export function EmailSvg({ color, height }) {
  return (
    <Svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M21.6 0.399902H2.4C1.08 0.399902 0.012 1.4799 0.012 2.7999L0 17.1999C0 18.5199 1.08 19.5999 2.4 19.5999H21.6C22.92 19.5999 24 18.5199 24 17.1999V2.7999C24 1.4799 22.92 0.399902 21.6 0.399902ZM20.4 17.1999H3.6C2.94 17.1999 2.4 16.6599 2.4 15.9999V5.1999L10.728 10.4079C11.508 10.8999 12.492 10.8999 13.272 10.4079L21.6 5.1999V15.9999C21.6 16.6599 21.06 17.1999 20.4 17.1999ZM12 8.7999L2.4 2.7999H21.6L12 8.7999Z"
        fill="white"
      />
    </Svg>
  );
}

export function EyeSLashSvg({ color, height }) {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.1083 7.8916L7.8916 12.1083C7.34994 11.5666 7.0166 10.8249 7.0166 9.99993C7.0166 8.34993 8.34993 7.0166 9.99993 7.0166C10.8249 7.0166 11.5666 7.34994 12.1083 7.8916Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.8499 4.8084C13.3915 3.7084 11.7249 3.1084 9.99987 3.1084C7.0582 3.1084 4.31654 4.84173 2.4082 7.84173C1.6582 9.01673 1.6582 10.9917 2.4082 12.1667C3.06654 13.2001 3.8332 14.0917 4.66654 14.8084"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.0166 16.2751C7.9666 16.6751 8.97493 16.8917 9.99993 16.8917C12.9416 16.8917 15.6833 15.1584 17.5916 12.1584C18.3416 10.9834 18.3416 9.0084 17.5916 7.8334C17.3166 7.40006 17.0166 6.99173 16.7083 6.6084"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.9252 10.5835C12.7085 11.7585 11.7502 12.7168 10.5752 12.9335"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.8915 12.1084L1.6665 18.3334"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3334 1.6665L12.1084 7.8915"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
