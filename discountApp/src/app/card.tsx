import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { generalScales, useGlobalStyles } from "@/styles/useGlobalStyles";

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { Colors } from '@/constants/theme';
import { useColorScheme } from "@/hooks/use-color-scheme.web";

export default function Card(){
    const [name, setName] = useState<string>();
    const globalStyles = useGlobalStyles();

    const scheme = useColorScheme();
    const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
    const textColor = colors.text;

    return (
    <ThemedView style={globalStyles.screen}>
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={[styles.card, styles.resultCard]}>
                <ThemedText style={styles.resultCardText}>{name}</ThemedText>
            </View>

            <View style={styles.card}>
                <TextInput placeholderTextColor="lightgray" placeholder="Название" onChangeText={setName} style={globalStyles.textInput}/>
                <View style={styles.cardCodeView}>
                    <TextInput placeholderTextColor="lightgray" keyboardType="number-pad"
                                placeholder="Код карты" style={[globalStyles.textInput, styles.cardCodeInput]}/>
                    <TouchableOpacity>
                        <AntDesign style={styles.cardCodeIcon} name="camera" size={24} color={textColor} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <FontAwesome5 style={styles.cardCodeIcon} name="file-import" size={24} color={textColor}/>
                    </TouchableOpacity> */}
                </View>
                {/* <TouchableOpacity style={globalStyles.textInput}>
                    <ThemedText>Цвет карты</ThemedText>
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity style={styles.addButtonCard}>
                <ThemedText style={styles.addButtonText}>Добавить</ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    </ThemedView>);
}

const styles = StyleSheet.create({
    cardCodeView:{
        flexDirection:"row",
        width:"100%"
    },
    cardCodeInput:{
        flex:1
    },
    cardCodeIcon:{
        marginVertical:"auto",
        marginLeft:10
    },
    resultCard:{
        backgroundColor:"purple",
    },
    resultCardText:{
        margin:"auto",
        textTransform:"uppercase"
    },
    card:{
        borderRadius: generalScales.lg,
        borderColor: "lightgray",
        borderWidth: 0.1,
        padding:20,
        gap:20,
        marginVertical:15,
        height:200
    },
    addButtonCard:{
        width:"100%",
        backgroundColor:"#A631AA",
        marginTop:"auto",
        marginHorizontal:"auto",
        height:40,
        borderRadius:generalScales.sm,
    },
    addButtonText:{
        textAlign:"center",
        marginVertical:"auto"
    }
});