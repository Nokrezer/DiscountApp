import {View, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalStyles, generalScales } from "@/styles/useGlobalStyles";

export default function Card(){
    const globalStyles = useGlobalStyles();
    return (
    <SafeAreaView style={globalStyles.screen}>
        <View style={styles.card}>
            <TextInput placeholderTextColor="lightgray" placeholder="Название" style={globalStyles.textInput}/>
            <TextInput placeholderTextColor="lightgray" placeholder="Код карты" style={globalStyles.textInput}/>
        </View>
        {/* <TouchableOpacity></TouchableOpacity> */}
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    card:{
        borderRadius: generalScales.lg,
        borderColor: "lightgray",
        borderWidth: 0.1,
        padding:20,
        gap:40
    },
});