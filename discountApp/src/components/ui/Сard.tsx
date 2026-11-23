import {useEffect, useState} from "react";
import { ThemedText } from '@/components/themed-text';
import { StyleSheet, View } from "react-native";
import {Image} from "expo-image";

import { generalScales, useGlobalStyles } from '@/styles/useGlobalStyles';

function useWaitDomainInput({value, delay}:{value:string, delay:number}){
    const [domain, setDomain] = useState<string>();
    
    useEffect(() => {
        const id = setTimeout(() => {
            setDomain(value);
        }, delay);

        return () => clearTimeout(id);
    }, [value, delay]);

    return domain;
}

export function Card({name, color, logoDomain, style, textStyle, fastImage=false}:
    {name:string|null|undefined, color:string|null|undefined, logoDomain:string,
        style?:Record<string, any>|undefined, textStyle?:Record<string, any>|undefined, fastImage?:boolean}){
    
    const waitDomainSrc = useWaitDomainInput({value:logoDomain, delay:500});
    const src = fastImage || waitDomainSrc ? "https://logo.debounce.com/" + logoDomain : "";
    
    return (
        <View style={[styles.card, style, {backgroundColor:color || "purple"}]}>
            <Image
                style={styles.logoImage}
                source={src}
                contentFit="cover"
                cachePolicy={"memory-disk"}
                transition={300}/>
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
    logoImage:{
        width:"16%",
        aspectRatio:1,
        position:"absolute",
        left:"7%",
        top:"12%",
        borderRadius:generalScales.md,
    }
});