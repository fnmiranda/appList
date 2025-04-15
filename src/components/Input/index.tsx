import React, { forwardRef, Fragment } from "react";
import { View, Text, TextInput, TextInputProps, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { style } from "./styles";
import { themas } from '../../global/themes';
import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> | 
                     React.ComponentType<React.ComponentProps<typeof FontAwesome>> | 
                     React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent;
    IconRight?: IconComponent;
    iconLeftName?: string;
    iconRightName?: string;
    title?: string;
    onIconLeftPress?: () => void;
    onIconRightPress?: () => void;
    height?: number,
    labelStyle?:StyleProp<TextStyle>
};

const Input = forwardRef<TextInput, Props>(
    ({ IconLeft, IconRight, iconLeftName, iconRightName, title, onIconLeftPress, onIconRightPress, height, labelStyle, ...rest }, ref) => {

        const calculateSizeWidth = () => {
            if(IconLeft && IconRight){
                return '85%';
            }else if(IconLeft || IconRight){
                return '91%';
            }else {
                return '100%';
            }
        }

        const calculateSizePadLeft = () => {
            if(IconLeft && IconRight){
                return 10;
            }else if(IconLeft || IconRight){
                return 10;
            }else {
                return 5;
            }
        }

        return (
            <Fragment>
                {title && <Text style={[style.titleInput, labelStyle]}>{title}</Text>}
                <View style={[style.BoxInput, {paddingLeft: calculateSizePadLeft(), height: height ||40}]}>
                    {IconLeft && (
                        <TouchableOpacity onPress={onIconLeftPress}>
                            <IconLeft name={iconLeftName as any} size={20} color={themas.colors.gray} style={{width:'100%'}}/>
                        </TouchableOpacity>
                    )}
                    <TextInput 
                        ref={ref} 
                        style={[style.input, {width:calculateSizeWidth()}]} 
                        {...rest} 
                    />
                    {IconRight && (
                        <TouchableOpacity onPress={onIconRightPress}>
                            <IconRight name={iconRightName as any} size={20} color={themas.colors.gray} style={{width:'100%'}}/>
                        </TouchableOpacity>
                    )}
                </View>
            </Fragment>
        );
    }
);

export default Input;
