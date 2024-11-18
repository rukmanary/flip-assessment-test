import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { COLORS } from '../../themes';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SearchIcon = (props: SvgProps) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" {...props}>
    <Path
      fill={COLORS.darkGrey}
      fillRule="evenodd"
      d="M13.46 24.45c-6.29 0-11.389-5.01-11.389-11.2 0-6.19 5.099-11.21 11.389-11.21 6.29 0 11.39 5.02 11.39 11.21 0 6.19-5.1 11.2-11.39 11.2Zm18.228 5.8-8.259-8.13c2.162-2.35 3.491-5.45 3.491-8.87C26.92 5.93 20.894 0 13.46 0 6.026 0 0 5.93 0 13.25c0 7.31 6.026 13.24 13.46 13.24a13.52 13.52 0 0 0 8.472-2.96l8.292 8.16c.405.4 1.06.4 1.464 0 .405-.39.405-1.04 0-1.44Z"
    />
  </Svg>
);
export default SearchIcon;
