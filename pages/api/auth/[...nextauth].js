import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { db } from "../../../firebase";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { FirebaseAdapter } from "@next-auth/firebase-adapter";
// import { db } from "../../../firebase";

// import firebase from "firebase/app";
// import "firebase/firestore";

// const firestore = (
//   firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
// ).firestore();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(db),
});
