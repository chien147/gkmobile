import React from 'react';
import { View, Text , Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ReceiverMessage = ({message}) => {
    const navigation =useNavigation();

    //console.log(message);
    return (
        <View
            style={{alignSelf:'flex-start', justifyContent:'flex-start', borderRadius:5, backgroundColor:'#008B8B', marginLeft:50, marginTop:0, marginBottom:5 }}
        >   
            {/* <TouchableOpacity
                onPress={() => 
                    navigation.navigate('Profile')
                }
            > */}
                <Image
                    style={{height:40, width:40, borderRadius:10000, position:'absolute', top:-5, left:-50}}
                    source={{uri: message.photoURL}}
                />
            <Text style={{color:'white' , fontSize:25, marginLeft:5,}}>{message.message}</Text>
            {/* </TouchableOpacity> */}
        </View>
    );
};

export default ReceiverMessage;