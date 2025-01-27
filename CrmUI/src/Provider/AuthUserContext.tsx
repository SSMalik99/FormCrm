import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface AuthUserContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthUserContext = createContext<AuthUserContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

interface AuthUserProviderProps {
  children: React.ReactNode;
}

const AuthUserProvider: React.FC<AuthUserProviderProps> = ({ children }) => {


    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    async function getUser() {
        axios.get("/api/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            
            setUser(res.data.data);

        }).catch((err) => {
            console.error(err);

        });
    }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AuthUserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}


export default AuthUserProvider;