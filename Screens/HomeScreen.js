import { useNavigation } from '@react-navigation/native';
import React, {useLayoutEffect ,useRef, useState, useEffect} from 'react';
import {View, Text, Button, Image, TouchableOpacity, StyleSheet} from  'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../Hooks/useAuth';
import {Andesign, Entypo, Ionicons} from "@expo/vector-icons"
import Swiper from 'react-native-deck-swiper';
import { onSnapshot, doc, collection, setDoc, getDocs , query, where, getDoc, serverTimestamp,} from 'firebase/firestore';
import {db} from '../firebase'
import generateId from '../lib/generate';





const HomeScreen = () => {

    const navigation = useNavigation();
    const {user, logout} = useAuth();
    const swiperRef = useRef(null);
    const [profile, setprofile] = useState([]);

    //show thông tin gmail
    //console.log(user);


    // không hiện thanh header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);


    //nếu chưa làm profile chuyển sang trang profile 
    useLayoutEffect(
        () => 
            onSnapshot(doc(db, "users", user.uid), (snapshot) =>{
                if(!snapshot.exists()){
                    navigation.navigate("Modal");
                }
            }),
        []
    );
    //end nếu chưa làm profile chuyển sang trang profile

    
    useEffect(()=>{
        let unsub;
        const fetchCards = async () => {

            const passes = await getDocs(collection(db, "users", user.uid, 'passes')).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            );
            const like = await getDocs(collection(db, "users", user.uid, 'like')).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            );

            const passedUserIds = passes.length > 0 ? passes : ['test'];
            const likedUserIds = like.length > 0 ? like : ['test'];


            unsub = onSnapshot(
                query(
                    collection(db, "users"), 
                    where('id', 'not-in', [...passedUserIds,...likedUserIds])
                ), 
                (snapshot) =>{
                    setprofile(
                        snapshot.docs
                            .filter((doc)=>doc.id !== user.uid) //khong hiện cái profile của mình
                            .map((doc) =>({
                            id:doc.id,
                            ...doc.data(),
                        }))
                    )
                }
            )
        };
        fetchCards();
        return unsub;

    },[])

    const swipeLeft = (cardIndex) => {
        if(!profile[cardIndex]) return;
        const userSwiped =profile[cardIndex];
        setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id),userSwiped)
    }


    const swipeRight = async (cardIndex)=> {
        if(!profile[cardIndex]) return;
        const userSwiped =profile[cardIndex];
        
        const loggedInProfile = await (
            await getDoc(doc(db, "users", user.uid))
          ).data();


        //kiểm tra xem người dùng có lướt ko
        getDoc(doc(db, 'users', userSwiped.id, 'like', user.uid)).then(
            (documentSnapshot) => {
                if(documentSnapshot.exists()){
                    console.log('you matched width' [userSwiped.displayName]);
                    setDoc(doc(db, 'users', user.uid, 'like', userSwiped.id),userSwiped);

                    setDoc(doc(db,'matches', generateId(user.uid, userSwiped.id)),{
                        users:{
                            [user.uid]: loggedInProfile,
                            [userSwiped.id]: userSwiped,
                        },
                        usersMatched: [user.uid, userSwiped.id],
                        timestamp: serverTimestamp(),
                    });
                    navigation.navigate('Match',{
                        loggedInProfile,
                        userSwiped,
                    });

                }
                else{
                    console.log('you swiped pass on  ${userSwiped.displayName}' );
                    setDoc(doc(db, 'users', user.uid, 'like', userSwiped.id),userSwiped)
                }
            }
        )
    }


    return (
        <SafeAreaView style={{flex:1}}>
            {/* start header */}
            <View >
                <TouchableOpacity style={{width: 200,height:50 , borderRadius:20 }}
                    onPress={()=>navigation.navigate('Modal')}
                >
                    <Image 
                        source={{uri: user.photoURL}}
                        style={{width:50, height:50, borderRadius:25, marginLeft: 30, marginTop: 5}}
                        
                    >
                    </Image>
                    <Text style={{fontSize:12}}>{user.email}</Text>
                </TouchableOpacity>


                <TouchableOpacity style={{width: 80,height:50 , position:'absolute', top:0, right: 140 }}
                    
                >
                    <Text style={{paddingTop:10, textAlign:'center',fontSize:35, color:'#ff5864'}}>o2</Text>
                </TouchableOpacity>


                <TouchableOpacity 
                    style={{height:50 , position:'absolute', top:15, right: 70, }}
                    onPress={() => navigation.navigate("Chat")}
                >
                    <Ionicons name='chatbubble-sharp' size={30} color= '#ff5864'></Ionicons>
                </TouchableOpacity>


                <TouchableOpacity 
                    style={{height:50 , position:'absolute', top:15, right: 5, }}
                    onPress={logout}
                >
                    <Ionicons name='log-out' size={30} color= '#ff5864'></Ionicons>
                </TouchableOpacity>
            </View>
            {/* end header */}


            {/* hình ảnh and thông tin  */}
            <View style={{flex:1, marginTop:6}}>

                <Swiper 
                    ref={swiperRef}
                    containerStyle={{backgroundColor:'transparent'}}
                    cards={profile}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    onSwipedLeft={(cardIndex)=>{
                        console.log('passed');
                        swipeLeft(cardIndex);
                    }}
                    onSwipedRight={(cardIndex)=>{
                        console.log('Like');
                        swipeRight(cardIndex);
                    }}                    
                    overlayLabels={{
                        left: {
                            element:<Text style={{textAlign:"right",color:"red",fontSize:25,}}>
                                        Passes
                                    </Text>,
                            title: 'Passes',
                            
                        },
                        right: {
                            element:<Text style={{color:'white', fontSize:25,}}>
                                        like
                                    </Text>,
                            title: 'LIKE',
                           
                        },
                    }}
                    verticalSwipe={false}

                    renderCard ={(card) => card ?(
                        <View key={card.id} style={{position:'relative',backgroundColor:'white', height:'75%',borderRadius:10}}>
                            <Image 
                                style={{position:"absolute",top:0 , width:'100%',height:'100%'}}
                                source={{uri: card.photoURL}}
                            />
                            <View style={[styles.cards,styles.cardShow]}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                                    <Text style={{fontSize:15,fontWeight:'bold'}}>
                                        Tên :{card.displayName}
                                    </Text>
                                    <Text style={{fontSize:15,fontWeight:'bold'}}>giới tính :{card.grender}</Text>
                                    <View>
                                        <Text style={{fontSize:15,fontWeight:'bold'}}>
                                            tuổi :{card.age}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{position:'relative',backgroundColor:'white', height:'75%',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',paddingBottom:40}}>
                                không còn ai để lướt
                            </Text>
                            <Image
                                style={{width:100,height:100}}
                                source={{uri:"https://links.papareact.com/6gb"}}
                            />
                        </View>
                    )}
                />
            </View>
            {/* end hình ảnh and thông tin */}
            

            {/* tim and X  */}
            <View style={{ justifyContent:'space-evenly', flexDirection:'row'}}>
                <TouchableOpacity 
                onPress={()=>swiperRef.current.swipeLeft()}
                    style={{alignItems:'center',justifyContent:'center',width:50,height:50,borderRadius:50,backgroundColor:'#ffd0d6'}}
                >
                    <Entypo name="cross" size={30} color='red'></Entypo>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={()=>swiperRef.current.swipeRight()}
                    style={{alignItems:'center',justifyContent:'center',width:50,height:50,borderRadius:50,backgroundColor:'#90c287', marginBottom:40}}
                >
                    <Entypo name="heart" size={30} color='green'></Entypo>
                </TouchableOpacity>
            </View>
            {/* end  tim and X  */}
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    cardShow:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:1,
        },
        shadowOpacity:0.2,
        shadowRadius:1.41,
        elevation:2,
         
    },
    cards:{
        position:'absolute',
        bottom:0,
        backgroundColor:'white', 
        height:60,
        width:'100%', 
        justifyContent: 'center',
        paddingHorizontal:24,
        paddingVertical:8, 
    }
})


