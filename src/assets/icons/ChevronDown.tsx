import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { COLORS } from '../../themes';
const ChevronDownIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={COLORS.tomato}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 9 6 6 6-6"
    />
  </Svg>
);
export default ChevronDownIcon;
