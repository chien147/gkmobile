import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React  from 'react';
import useAuth from './Hooks/useAuth';
import ChatScreen from './Screens/ChatScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ModalScreen from './Screens/ModalScreen';
import MatchedScreen from './Screens/MatchedScreen';
import MessageScreen from './Screens/MessageScreen';
//import Profile from './Screens/Profile';


const Stack = createNativeStackNavigator();

const StackNatigator = () => {


    const {user} = useAuth();


    return (
        <Stack.Navigator
            ScreenOptions={{
                headerShown: false,
            }}
        >
            {
                user ?  (
                    <>
                        <Stack.Group>
                            <Stack.Screen name="Home"  component={HomeScreen} />
                            <Stack.Screen name="Chat"  component={ChatScreen} />
                            <Stack.Screen name="Message"  component={MessageScreen} />
                            {/* <Stack.Screen name="Profile"  component={Profile} /> */}
                        </Stack.Group>
                        <Stack.Group screenOptions={{stackpresentation: 'Modal'}}>
                            <Stack.Screen name='Modal' component={ModalScreen} />
                        </Stack.Group>
                        <Stack.Group screenOptions={{stackpresentation: 'transparentModal'}}>
                            <Stack.Screen name='Match' component={MatchedScreen} options={{headerShown: false}}/>
                        </Stack.Group>
                    </>
                ):
                (
                    <Stack.Screen name="Login"  component={LoginScreen} options={{headerShown: false}} />
                )
            }

        </Stack.Navigator>
    );
};

export default StackNatigator;