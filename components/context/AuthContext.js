import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [validate, setValidate] = useState();
    const [idToken, setIdToken] = useState();
    const [userName, setUserName] = useState();
    const [cartArray, setCartArray] = useState([]);
    const [uniqueArray, setUniqueArray] = useState([]);
    const [allProducts, setAllProducts] = useState({});
    const [userData, setUserData] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const [eraseItem, setEraseItem] = useState({});

    const [inputText, setInputText] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [createProductText, setCreateProductText] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productImage: "",
        category: ""
    });

    useEffect(() => {
        setValidate({
            name: inputText.name.length >= 1,
            email: inputText.email.includes("@") && inputText.email.length > 5,
            password: inputText.password.length >= 6,
        });
    }, [inputText]);

    const values = { cartArray, setCartArray, setInputText, inputText, validate, setIdToken, idToken, setUserName, userName, setCreateProductText, createProductText, allProducts, setAllProducts, userData, setUserData, openModal, setOpenModal, closeModal, setCloseModal, eraseItem, setEraseItem, uniqueArray, setUniqueArray }

    return (
        <AuthContext.Provider value={values} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within a Provider");
    }

    return context;
}