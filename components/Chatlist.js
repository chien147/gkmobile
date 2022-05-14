import { collection, onSnapshot, query , where } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { db } from '../firebase';
import useAuth from '../Hooks/useAuth'
import Chatrow from './Chatrow';


const Chatlist = () => {

    const [matches, setMatches] = useState([]);
    const {user} =useAuth();

    useEffect(
        ()=>
            onSnapshot(
                query(
                    collection(db, 'matches'),
                    where('usersMatched', 'array-contains', user.uid)
                ),
                (snapshot) => 
                    setMatches(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
            )
        ,[user]
    )
    
    return (
        matches.length > 0 ? (
            <FlatList
                style={{height:1000}}
                data={matches}
                keyExtractor={item => item.users}
                renderItem={({item})=> <Chatrow matchDetails={item}/>}
            />
            
        ):(
            <View style={{padding:5}}>
                <Text style={{textAlign:'center',fontSize:25}}>
                    không thấy ai để bắt đầu trò truyện 
                </Text>
            </View>
        )
    );
};

export default Chatlist;