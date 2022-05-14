import React, {useState, useEffect}from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../Hooks/useAuth';
import getMatchedUserInfo from '../lib/getMachedUserInfo';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';


const Chatrow = ({matchDetails}) => {

    const navigation =useNavigation();
    const {user} = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(()=>{
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    },[matchDetails, user]);


    useEffect(
        ()=>
            onSnapshot(
                query(
                    collection(db, 'matches', matchDetails.id, 'messages'),
                    orderBy('timestamp', 'desc')
                ), (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
            ),[matchDetails, db]
    )
    useEffect(
        ()=>
            onSnapshot(
                query(
                    collection(db, 'matches', matchDetails.id, 'messages'),
                    orderBy('timestamp', 'desc')
                ), (snapshot) => setLastName(snapshot.docs[0]?.data()?.displayName)
            ),[matchDetails, db]
    )
            //console.log(lastName);
    return (

        <TouchableOpacity
            style={[styles.cardShadow]}
            onPress={() => 
                navigation.navigate('Message', {
                    matchDetails,
                })
            }
        >
            <Image
                style={{height:60,width:60, borderRadius:10000}}
                source={{uri: matchedUserInfo?.photoURL }}
            />
            <View>
                <Text style={{paddingLeft:20, fontSize:20,fontWeight:'bold',}}>{matchedUserInfo?.displayName}</Text>
                <Text style={{paddingLeft:20,}}>{lastName}: {lastMessage || 'hi'}</Text>
            </View>
        </TouchableOpacity>
            
    );
};

export default Chatrow;
const styles = StyleSheet.create({
    cardShadow:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:1,
        },
        shadowOpacity:0.2,
        shadowRadius:1.41,
        elevation:2,
        flexDirection:'row', 
        alignItems:'center',
        backgroundColor:'white',
        paddingHorizontal:10,
        paddingVertical:10,
        marginHorizontal:10,
        marginHorizontal:10,
        borderRadius:10
    }, 
    
})

