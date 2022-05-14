import React from 'react';
import { View, Text , Image} from 'react-native';


const SenderMessage = ({message}) => {
    return (
        <View
            style={{alignSelf:'flex-end',justifyContent:'flex-start',  borderRadius:5, backgroundColor:'#008B8B',marginRight:10 , marginBottom:5}}
        >
            
            <Text style={{color:'white' ,fontSize:25}}>{message.message}</Text>
        </View>
    );
};

export default SenderMessage;