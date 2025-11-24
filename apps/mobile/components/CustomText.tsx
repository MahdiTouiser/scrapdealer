import React from 'react';

import {
    Text as RNText,
    TextProps,
} from 'react-native';

interface Props extends TextProps {
    children: React.ReactNode;
}

export const Text: React.FC<Props> = ({ style, ...props }) => {
    return <RNText {...props} style={[{ fontFamily: 'Vazirmatn' }, style]} />;
};
