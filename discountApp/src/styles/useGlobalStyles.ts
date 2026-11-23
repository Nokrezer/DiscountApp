import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { Colors } from '@/constants/theme';

export function useGlobalStyles(){
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
    const textColor = colors.text;

    return StyleSheet.create({
        screen:{
            flex:1,
            width:"100%",
            height:"100%",
        },
        textInput:{
            borderColor:Colors.dark.border,
            borderBottomWidth:1,
            color: textColor,
            paddingBottom:2
        },
        safeArea:{
            paddingHorizontal:20,
            flex:1
        },
        toastSuccess:{
            backgroundColor:"rgba(42, 168, 94, 0.51)"
        }
    });
}

export function useGetTextColor(){
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
    const textColor = colors.text;

    return textColor;
}

export const generalScales = {
    sm: 4,
    md: 8,
    lg: 16,
    bg: 24,
    xl: 32,
    full: "100%"
}

