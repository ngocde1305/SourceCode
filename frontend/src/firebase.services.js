import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, fetchSignInMethodsForEmail ,signInWithRedirect, getRedirectResult} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "./firebase.config";
export const analytics = getAnalytics();
export const db = getFirestore();
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

auth.useDeviceLanguage()

export function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            return result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw new Error(`${errorCode}: ${errorMessage}`)
        });
}

export function signInWithFacebook() {
    return signInWithPopup(auth, facebookProvider)
        .then((result) => {
            return result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw new Error(`${errorCode}: ${errorMessage}`)
        });
}
const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider()
  };
export async function handleAuthError(error){
      await signInWithRedirect(auth, facebookProvider);
      const result = await getRedirectResult(auth);
    //    if (result) {
         // This is the signed-in user
         const user = result.user;
         return user;
    //   return signInWithRedirect(facebookProvider).then((result) => {
    //     return result.user;
    // })
    // }
    
  };
 
export function signOut() {
    return auth.signOut();
}