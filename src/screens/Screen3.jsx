import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";
import { Alert, Button, Text, View, StyleSheet, Image } from "react-native";

export const Screen3 = () => {
    const [pickedImage, setPickedImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    "Permisos insuficientes",
                    "Necesitas dar permisos para acceder a la cámara",
                    [{ text: "OK" }]
                );
                return;
            }

            const { status: statusCamera } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (statusCamera !== 'granted') {
                Alert.alert(
                    "Permisos insuficientes",
                    "Necesitas dar permisos para acceder a la cámara",
                    [{ text: "OK" }]
                );
            }
        })();
    }, []);

    const takeImageHandler = async () => {
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        if (image && !image.canceled && image.assets.length > 0) {
            setPickedImage(image.assets[0].uri);
        } else {
            Alert.alert('Error', 'Se debe seleccionar una imagen');
        }
    };

    const pickImageHandler = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        if (image && !image.canceled && image.assets.length > 0) {
            setPickedImage(image.assets[0].uri);
        } else {
            Alert.alert('Error', 'Se debe seleccionar una imagen');
        }
    };

    let imagePreview = (<Text>No se ha seleccionado una imagen</Text>);

    if (pickedImage) {
        imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
    }

    return (
        <View style={styles.container}>
            {imagePreview}
            <View style={styles.buttonContainer}>
                <Button title="Tomar foto" onPress={takeImageHandler} />
                <Button title="Seleccionar foto" onPress={pickImageHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'space-around',
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    }
});

