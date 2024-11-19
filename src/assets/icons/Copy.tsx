import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../themes';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const CopyIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 36 36"
    transform="scale(-1, 1)" // Flip horizontally
    {...props}>
    <Path
      d="M29.5 7h-19A1.5 1.5 0 0 0 9 8.5v24a1.5 1.5 0 0 0 1.5 1.5h19a1.5 1.5 0 0 0 1.5-1.5v-24A1.5 1.5 0 0 0 29.5 7ZM29 32H11V9h18Z"
      fill={COLORS.tomato}
    />
    <Path
      d="M26 3.5A1.5 1.5 0 0 0 24.5 2h-19A1.5 1.5 0 0 0 4 3.5v24A1.5 1.5 0 0 0 5.5 29H6V4h20Z"
      fill={COLORS.tomato}
    />
    <Path fill="none" d="M0 0h36v36H0z" />
  </Svg>
);
export default CopyIcon;
