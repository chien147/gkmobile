import { useNavigation } from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'
import useAuth from '../Hooks/useAuth';

const LoginScreen = () => {

    const { signInWithGoogle, loading} = useAuth();
    const navigation = useNavigation();
    const image = { uri: "https://nhathauxaydung24h.com/wp-content/uploads/2021/11/hinh-nen-dien-thoai-cute-mau-den.jpg" };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>

            </ImageBackground>

            <TouchableOpacity 
                style={{width: 120, height: 40, position: 'absolute', bottom: 200, right:120, backgroundColor: 'rgba(152, 32, 52, 0.8)',  textAlign: 'center', fontSize: 100, margin: 10}}
                onPress={signInWithGoogle}
            >
                <Text style={{textAlign: 'center',fontWeight: 'bold', fontSize: 25,}} >login</Text>
            </TouchableOpacity>
        </View>
            
        
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 42,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000a0',
    },
    
   
  });

export default LoginScreen;