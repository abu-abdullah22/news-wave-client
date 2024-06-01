/* eslint-disable react/prop-types */
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import app from "../Firebase/firebase.config";




export const AuthContext = createContext(null) ;
const auth = getAuth(app) ;

const AuthProvider = ({children}) => {
    const [user, setUser] = useState() ;
    const [loading, setLoading] = useState(true) ;
    const googleProvider = new GoogleAuthProvider() ;
  
    

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
            setLoading(false) ;
        });
        return () => {
            unsubscribe() ;
        }
    }, [])
    
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