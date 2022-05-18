import { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }: any) => {

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userDetails, setUserDetails ] = useState({});
    const [token, setToken] = useState<string>('')

    const login = ({token, data}: any) => {
        setLoggedIn(true);
        setUserDetails(data);
        setToken(token);
    }

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem('TOKEN', JSON.stringify({}))
            localStorage.setItem('DATA', JSON.stringify(""))
            localStorage.setItem('ISLOGIN', JSON.stringify(false))
        }
    }

    const contextValue = {
        status: {
            loggedIn,
            login,
            logout
        },
        user: {
            userDetails,
            setUserDetails,
            token, 
            setToken
        }
    };

    return (
        <AuthContext.Provider value={ contextValue }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;
