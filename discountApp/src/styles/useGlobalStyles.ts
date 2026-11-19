import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { Colors } from '@/constants/theme';

export function useGlobalStyles(){
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
    const textColor = colors.text;

    return StyleSheet.create({
        screen:{
            paddingHorizontal:5,
            flex:1,
            width:"100%",
            height:"100%",
        },
        textInput:{
            borderColor:"gray",
            borderBottomWidth:1,
            color: textColor,
            // padding:0,
            paddingBottom:2
        }
    });
}

export const generalScales = {
    sm: 4,
    md: 8,
    lg: 16,
    full: "100%"
}