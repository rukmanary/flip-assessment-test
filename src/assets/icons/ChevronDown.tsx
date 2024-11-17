import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ChevronDownIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 9 6 6 6-6"
    />
  </Svg>
);
export default ChevronDownIcon;
