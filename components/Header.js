import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Foundation, Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
const Header = ({title, callEnabled}) => {

    const navigation =useNavigation();
    return (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:20}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={{padding:5}}
                >
                    <Ionicons name='chevron-back-outline' size={35} color="#ff5864"/>
                </TouchableOpacity>
                <Text style={{fontSize:25, fontWeight:'bold', paddingLeft:10}}>
                    {title}
                </Text>
            </View>

            {callEnabled &&(
                <TouchableOpacity style={{backgroundColor:'#ff5864', paddingHorizontal:5, marginRight:10, borderRadius:10000}}>
                    <Foundation  name='telephone' size={35} color='blue' />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;