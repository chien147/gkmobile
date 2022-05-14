import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {View, Text,TouchableOpacity, Image} from "react-native";


const MatchedScreen = () => {
    const navigation =useNavigation();
    const {params} = useRoute();
    const {loggedInProfile, userSwiped} = params;
    return (
        <View style={{height:'100%',backgroundColor:'#00FF7F', paddingTop:50}} opacity={0.9}>
            <Text style={{color:'white',textAlign:'center', marginTop:40,fontSize:30, fontWeight:'bold'}}>
                {userSwiped.displayName} cũng thích ảnh của bạn
            </Text>
            <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:40}}>
                <Image
                    style={{height:80, width:80, borderRadius:50000}}
                    source={{uri:loggedInProfile.photoURL,}}
                />
                <Image
                    style={{height:80, width:80, borderRadius:200000}}
                    source={{uri:userSwiped.photoURL,}}
                />
            </View>

            <TouchableOpacity style={{backgroundColor:'white',marginTop:40,borderRadius:20000, alignSelf:'center', width:200 }}
                onPress={()=>{navigation.navigate("Chat");}}
            >
                <Text style={{fontSize:30, fontWeight:'bold',textAlign:'center'}}>
                    nhắn tin hông
                </Text>
            </TouchableOpacity>

        </View>
        
    );
};

export default MatchedScreen;