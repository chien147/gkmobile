import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, FlatList} from 'react-native'
import { useNavigation, useRoute, } from '@react-navigation/native';
import Header from '../components/Header';
import getMatchedUserInfo from '../lib/getMachedUserInfo';
import useAuth from '../Hooks/useAuth';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const MessageScreen = () => {
    const navigation = useNavigation();
    const {user} = useAuth();
    const {params} = useRoute();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const {matchDetails} = params;

    useEffect(()=> onSnapshot(
        query(
            collection(db, 'matches', matchDetails.id, 'messages'),
            orderBy('timestamp', 'desc')
        ), 
        (snapshot) => 
            setMessages(
                snapshot.docs.map(doc =>({
                    id: doc.id,
                    ...doc.data()
                }))
            )
    ),[matchDetails, db])
    const sendMessage = () => {

        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp:serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].photoURL,
            grender: matchDetails.users[user.uid].grender,
            age: matchDetails.users[user.uid].age,
            message: input,
        })
        setInput('');
    };
    //console.log(matchDetails);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <SafeAreaView style={{flex:1}}>
            <Header title={getMatchedUserInfo(matchDetails.users, user.uid).displayName} callEnabled/>

            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{flex:1,}}
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                   <FlatList
                        data={messages}
                        inverted={-1}
                        style={{paddingLeft:10,}}
                        keyExtractor={(item) => item.id}
                        renderItem={({item:message})=>
                        message.userId === user.uid ? (
                            <SenderMessage  key={message.id} message={message} />
                        ) : (
                            <ReceiverMessage key={message.id} message={message} />

                        )
                    }
                   />

                </TouchableWithoutFeedback>

                <View
                    style={{flexDirection:'row',backgroundColor:'white' ,justifyContent:'space-between',alignContent:'center' , paddingHorizontal:20, }}
                    >   
                    <TextInput
                        style={{height:50,fontSize:20}}
                        placeholder='send message...........'
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                        />
                    <Button 
                        onPress={sendMessage} 
                        title='send'
                        color='#ff5864'
                        />
                </View>
            </KeyboardAvoidingView>

            
            
        </SafeAreaView>
    );
};

export default MessageScreen;