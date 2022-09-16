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
    FlatList
} from 'react-native';
import { FONTS, SIZES, COLORS, icons, dummyData } from "../constants"


const IconButton = ({containerStyle,icon,iconStyle,onPress}) => {
    return(
        <TouchableOpacity
            style={{
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width:30,
                    height:30,
                    tintColor:COLORS.white,
                    ...iconStyle
                }}
            />
            
        </TouchableOpacity>

    )

}

export default IconButton;
