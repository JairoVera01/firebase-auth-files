// import { useState } from 'react'
// import { auth, googleProvider } from "../config/firebase-config" 
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider , signOut } from "firebase/auth"
// import "../index.css"

// export default function Autenticacion() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   console.log(auth?.currentUser?.providerData)

//   const singIn = async() =>{
//     try{
//       await createUserWithEmailAndPassword(auth, email, password)
//     } catch(error){
//       console.error(error)
//     }
//   };
//   const singInWithGoogle = async() =>{
//     try{
//       await signInWithPopup(auth, googleProvider)
//     } catch(error){
//       console.error(error)
//     }
//   };
//   const logOut = async() =>{
//     try{
//       await signOut(auth)
//     } catch(error){
//       console.error(error)
//     }
//   };

//   return (
//     <div className='auth'>
//       <input type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
//       <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}
//       />
//       <button onClick={singIn}>Sign In</button>
//       <button onClick={singInWithGoogle}>
//         Sing In With GoogLE
//       </button>
//       <button onClick={logOut}>Logut</button>
//     </div>  
//   )
// }


import { useState } from 'react'
import { auth, googleProvider } from "../config/firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import "../index.css"

type AutenticacionProps = {
  setUserName: (userName: string) => void;
}

export default function Autenticacion({ setUserName }: AutenticacionProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUserName(email); // Establece el nombre de usuario o correo electrónico
    } catch (error) {
      console.error(error)
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userName = result.user?.displayName || '';
      setUserName(userName); // Establece el nombre de usuario
    } catch (error) {
      console.error(error)
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUserName(''); // Establece el nombre de usuario como vacío al cerrar sesión
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className='auth'>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>
        Sing In With Google
      </button>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

