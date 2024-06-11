/* eslint-disable react/prop-types */
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import app from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext(null) ;
const auth = getAuth(app) ;

const AuthProvider = ({children}) => {
    const [user, setUser] = useState() ;
    const [loading, setLoading] = useState(true) ;
    const googleProvider = new GoogleAuthProvider() ;
    const axiosPublic = useAxiosPublic()
  
    

    const createUser = (email, password) => {
        setLoading(true) ;
        return createUserWithEmailAndPassword(auth, email, password) ;
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password);
    }

    const googleSignIn = ()=> {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true) ;
        return signOut(auth);
    }

    const updateUserProfile = (name, photo)=> {
        updateProfile(auth.currentUser, {
            displayName: name ,photoURL: photo 
        })
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser) ;
        
            if(currentUser){
                // console.log(currentUser);
                const userInfo = {email : currentUser.email}
                axiosPublic.post('/jwt', userInfo) 
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false) ;
                    }
                })
            } else{
                localStorage.removeItem('access-token') ;
                setLoading(false) ;
            }
        });
        return () => {
            unsubscribe() ;
        }
    }, [axiosPublic])
    
    const authInfo = {
        user, setUser, loading,logOut, createUser, signIn, updateUserProfile, googleSignIn
    } ;
    return (
       <AuthContext.Provider value={authInfo}>
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;