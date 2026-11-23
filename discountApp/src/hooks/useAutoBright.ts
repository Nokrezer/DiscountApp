import {useEffect, useState} from "react";
import * as Brightness from 'expo-brightness';
import { useNavigation } from "expo-router";

export function useAutoBright(){
    const navigation = useNavigation();
    const [bright, setBright] = useState<number>();

    //вызывается при выходе из экрана
    navigation.addListener('blur', async () => {
        if(bright !== undefined)
            Brightness.setSystemBrightnessAsync(bright);
    });

    useEffect(() => {(async () => {
        const brightness = await Brightness.getSystemBrightnessAsync();
        if(brightness !== undefined)
            setBright(brightness);

        const { status } = await Brightness.requestPermissionsAsync();//получаем разрешение
        if (status === 'granted')
            Brightness.setSystemBrightnessAsync(1);//Изменяем яркость на 100%

    })()}, []);
}