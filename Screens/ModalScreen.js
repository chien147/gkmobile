import { useNavigation } from '@react-navigation/native';
import { serverTimestamp } from 'firebase/firestore';
import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import useAuth from '../Hooks/useAuth';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../firebase'



const ModalScreen = () => {
    const navigation = useNavigation();

    const {user} = useAuth();
    const [image , setImage] = useState(null);
    const [grender , setGrender] = useState(null);
    const [age , setAge] = useState(null);
    // const incompleteForm = !image || !grender || !age ;


    const updateUserprofile = () =>{
        setDoc(doc(db, "users", user.uid),{
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            grender: grender,
            age: age,
            timestamp: serverTimestamp(),
        })
            .then(()=>{
            navigation.navigate("Home");    
            })
            .catch((error) =>{
            alert(error.message);
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
           

        });
    }, []);

    return (
        <View style={{flex:1,paddingTop:40}}>
            <Text style={{height:40,width:'100%',textAlign:'center',fontSize:25}}>o2</Text>

            <Text style={{fontWeight:'bold',fontSize:15,textAlign:'center'}}>
                chào mừng bạn {user.displayName} đến với nhóm o2
            </Text>

            <Text style={{paddingHorizontal:20,paddingVertical:20, fontWeight:'bold', textAlign:'center', fontSize:20}}>
                đăng ảnh
            </Text>

            <TextInput 
                value={image}
                onChangeText={setImage}
                placeholder='lên ảnh nào'
                style={{textAlign:'center',fontSize:20,paddingBottom:15}}
            />
            <Text style={{paddingHorizontal:20,paddingVertical:20, fontWeight:'bold', textAlign:'center', fontSize:20}}>
                giới tính của bạn
            </Text>

            <TextInput 
                value={grender}
                onChangeText={setGrender}
                placeholder='nhập giới tính'
                style={{textAlign:'center',fontSize:20,paddingBottom:15}}
            />
            <Text style={{paddingHorizontal:20,paddingVertical:20, fontWeight:'bold', textAlign:'center', fontSize:20}}>
                tuổi của bạn
            </Text>

            <TextInput 
                value={age}
                onChangeText={setAge}
                placeholder='nhập tuổi của bạn là '
                style={{textAlign:'center',fontSize:20,paddingBottom:15}}
                keyboardType='numeric'
                maxLength={2}
            />
            <TouchableOpacity 
                style={
                    {paddingVertical:10,width:180,alignSelf:'center',borderRadius:20,backgroundColor:'red', marginTop:50}}
                    // incompleteForm ? style={{backgroundColor:'gray'}} : style{{backgroundColor:'red'}};
                onPress={updateUserprofile}
                // disabled={incompleteForm}
            >
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>update profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModalScreen;


