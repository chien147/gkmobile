import React from 'react';
import { createContext, useContext } from 'react';
import * as Google from 'expo-google-app-auth';
import { 
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from '@firebase/auth';
import { useState, useEffect, useMemo } from 'react';
import { auth } from '../firebase';


const AuthContext = createContext({

});

// kết nối vs db
const config = {
    androidClientId: "757186341849-9rb61hodd49aee63abtf4f52qdtds3ml.apps.googleusercontent.com",
    iosClientId: "757186341849-gb6ov20pv0277lrfnr113vkep7qpdfl3.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
};
// end kết nối vs db

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] =useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else{
                setUser(null);
            }

            setLoadingInitial(false);
        });
        
    },[])

    const logout = () => {
        setLoading(true);

        signOut(auth)
        .catch(error => setError(error))
        .finally(()=>setLoading(false));
    }

    const signInWithGoogle = async () => {
        setLoading(true);

        await Google.logInAsync(config).then(async (logInResult) => {
            if(logInResult.type === "success"){
                const {idToken, accessToken} = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credential);
            }
            return Promise.reject();
        })
        .catch(error => setError(error))
        .finally(()=>setLoading(false));
        
    };

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider 
        value={memoedValue}
        >
            { !loadingInitial && children }
        </AuthContext.Provider>
            
    );
} ;


export default function useAuth() {
    return useContext(AuthContext);
}
