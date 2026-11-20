import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { useGlobalStyles } from "@/styles/useGlobalStyles";


export default function Scanner(){
    const globalStyles = useGlobalStyles();
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission)//ждем загрузку разрешения
        return <View/>;

    return (
        <ThemedView style={globalStyles.screen}>
            <SafeAreaView style={globalStyles.safeArea}>

            </SafeAreaView>
        </ThemedView>
    );
}