import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Image,
    TextInput,
    FlatList,
    StyleSheet
} from 'react-native';

import { FONTS, SIZES, COLORS, icons, dummyData } from "../constants"

const TextIconButton = ({ containerStyle, label, labelStyle, icon, iconStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    ...FONTS.body3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            <Image
                source={icon}
                style={{
                    marginLeft:5,
                    width:20,
                    height:20,
                    tintColor:COLORS.black,
                    ...iconStyle
                }}
            />

        </TouchableOpacity>

    )
}

export default TextIconButton;
