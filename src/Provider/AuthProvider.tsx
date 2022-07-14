import { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../firebase";
import { User as FirebaseUser } from "firebase/auth";

interface Props {
    children: React.ReactNode;
  }  

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((FirebaseUser) => {
      setUser(FirebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};