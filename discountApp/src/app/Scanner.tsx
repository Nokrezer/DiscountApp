import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {router} from "expo-router";

import { useGetTextColor } from "@/styles/useGlobalStyles";

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useGetCameraPermission } from '@/hooks/useGetCameraPermission';
import { Toast } from 'toastify-react-native';
import { errorMessages } from '@/constants/errors';

const backPage = (codeData:BarcodeScanningResult) => router.dismissTo({pathname:"/NewCard", 
                                        params:{codeData:JSON.stringify(codeData)}});

export default function Scanner(){
    const [flashState, setFlashState] = useState<boolean>(false);
    
    const textColor = useGetTextColor();
    const cameraPermissionLoading = useGetCameraPermission();

    if(cameraPermissionLoading)
        return <View/>;
    
    const onChoosePictureCallback = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            });

        if (pickerResult.canceled)
            return;
        
        try{
            const imageUri = pickerResult.assets[0].uri;
            const result = await Camera.scanFromURLAsync(imageUri, ['ean13', 'ean8', 'qr', 'code128', 'code39', 'upc_a', 'upc_e']);
            
            if(result.length === 0){
                Toast.error(errorMessages.barcodeNotFound);
                return;
            }

            backPage(result[0]);
        }catch(error){
            Toast.error(errorMessages.errorWhenScaning);
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={{flex:1}}>
                <CameraView style={styles.screen} facing={"back"} enableTorch={flashState} onBarcodeScanned={(data) => backPage(data)}/>
                <View style={styles.buttonBar}> 
                    <TouchableOpacity onPress={onChoosePictureCallback}>
                        <AntDesign name="picture" size={45} color={textColor} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.flashButton]} onPress={() => setFlashState(!flashState)}>
                        {flashState ?
                            <Ionicons name="flash" size={45} color={textColor}/> :
                            <Ionicons name="flash-off" size={45} color={textColor}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    buttonBar:{
        flexDirection:"row",
        bottom:0,
        width:"100%",
        paddingHorizontal:"10%",
        paddingBottom:20,
        backgroundColor:"transparent",
        position:"absolute"
    },
    flashButton:{
        marginLeft:"auto"
    }
});