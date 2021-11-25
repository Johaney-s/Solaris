import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA04mYkFg3-fRXuT6s68BNZg-c4XDV2k-s',
	authDomain: 'solaris-pv247.firebaseapp.com',
	projectId: 'solaris-pv247',
	storageBucket: 'solaris-pv247.appspot.com',
	messagingSenderId: '928105868091',
	appId: '1:928105868091:web:58a11205bebd365ee5e51e'
};

initializeApp(firebaseConfig);

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

const db = getFirestore();

export type UserTokens = {
	user: string;
	tokens: number;
};

export const userTokensCollection = collection(
	db,
	'users'
) as CollectionReference<UserTokens>;
