import { ThemedText } from '@/components/themed-text';
import { StyleSheet, View } from "react-native";

import { generalScales, useGlobalStyles } from '@/styles/useGlobalStyles';

export function Card({name, color, style, textStyle}:
    {name:string|null|undefined, color:string|null|undefined,
        style?:Record<string, any>|undefined, textStyle?:Record<string, any>|undefined}){
    const globalStyles = useGlobalStyles();

    return (
        <View style={[styles.card, style, {backgroundColor:color || "purple"}]}>
            <ThemedText style={[styles.cardText, textStyle]}>{name}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    cardText:{
        margin:"auto",
        textTransform:"uppercase",
        fontSize:25
    },
    card:{
        borderRadius: generalScales.lg,
        borderColor: "lightgray",
        borderWidth: 0.1,
        padding:20,
        gap:20,
        marginBottom:10,
        marginTop:5,
        width:"100%",
        aspectRatio:1.6
    },
});