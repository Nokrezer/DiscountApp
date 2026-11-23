import * as Brightness from 'expo-brightness';
import { useNavigation, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback, useRef } from "react";
import { AppState } from "react-native";

export function useAutoBright(){
    const userBrightness = useRef<number | undefined>(undefined);

    useFocusEffect(useCallback(() => {
        (async () => {
            userBrightness.current = await Brightness.getBrightnessAsync();
            await Brightness.setBrightnessAsync(1);//Изменяем яркость на 100%
        })();
    return () => {
        if(userBrightness.current) Brightness.setBrightnessAsync(userBrightness.current);
    }}, []));
}