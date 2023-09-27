import React from 'react';
import IconFM from 'react-native-vector-icons/dist/FontAwesome';
import IconFN from 'react-native-vector-icons/dist/Fontisto';
import IconFD from 'react-native-vector-icons/dist/Foundation';
import IconN from 'react-native-vector-icons/dist/Ionicons';
import IconMC from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/dist/MaterialIcons';
import IconOc from 'react-native-vector-icons/dist/Octicons';
import IconZc from 'react-native-vector-icons/dist/Zocial';
import IconEn from 'react-native-vector-icons/dist/Entypo';
import IconAn from 'react-native-vector-icons/dist/AntDesign';
import IconFE from 'react-native-vector-icons/dist/Feather';
import IconSI from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconFM5 from 'react-native-vector-icons/dist/FontAwesome5';
import IconFMB from 'react-native-vector-icons/dist/FontAwesome5Pro';

// creating a daynamic VectorIcon component for Icons

const Icon = ({ name, iconFamily, size, color, style }) => {
    switch (iconFamily) {
        case 'Fontisto':
            return <IconFN name={name} size={size} color={color} style={style} />;
        case 'Foundation':
            return <IconFD name={name} size={size} color={color} style={style} />;
        case 'Ionicons':
            return <IconN name={name} size={size} color={color} style={style} />;
        case 'MaterialCommunityIcons':
            return <IconMC name={name} size={size} color={color} style={style} />;
        case 'MaterialIcons':
            return <IconMI name={name} size={size} color={color} style={style} />;
        case 'Octicons':
            return <IconOc name={name} size={size} color={color} style={style} />;
        case 'Zocial':
            return <IconZc name={name} size={size} color={color} style={style} />;
        case 'Entypo':
            return <IconEn name={name} size={size} color={color} style={style} />;
        case 'AntDesign':
            return <IconAn name={name} size={size} color={color} style={style} />;
        case 'Feather':
            return <IconFE name={name} size={size} color={color} style={style} />;
        case 'SimpleLineIcons':
            return <IconSI name={name} size={size} color={color} style={style} />;
        case 'FontAwesome5':
            return <IconFM5 name={name} size={size} color={color} style={style} />;
        case 'FontAwesome5Brands':
            return <IconFMB name={name} size={size} color={color} style={style} />;

        default:
            return <IconFM name={name} size={size} color={color} style={style} />;
    }
};

export default Icon;