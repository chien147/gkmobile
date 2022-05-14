import React, {useLayoutEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {SafeAreaView, Text} from "react-native";
import Header from '../components/Header';
import Chatlist from '../components/Chatlist';

const ChatScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <SafeAreaView >
            <Header title="Chat" />
            <Chatlist />
        </SafeAreaView>
    );
};

export default ChatScreen;