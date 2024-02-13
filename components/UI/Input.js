import { useAuth } from "../context/AuthContext";

function Input({ type, id, placeholder, value }) {

    const { setInputText, inputText, setCreateProductText, createProductText } = useAuth();

    function inputChangeHandler(e) {
        setInputText({
            ...inputText,
            [e.target.id]: e.target.value
        });

        setCreateProductText({
            ...createProductText,
            [e.target.id]: e.target.value
        })
    }

    return (
        <input onChange={inputChangeHandler} value={value} className="px-5 py-3 rounded-md border border-black focus:ring-2 focus:outline-none focus:border-dark-green focus:ring-dark-green" type={type} id={id} placeholder={placeholder} />
    );
}

export default Input;
