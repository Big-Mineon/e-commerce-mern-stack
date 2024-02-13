
function Button({ title, onClick }) {

    return (
        <button onClick={onClick} className="px-5 py-4 bg-light-green rounded-md text-white hover:bg-dark-green active:bg-dark-green">{title}</button>
    );
}

export default Button;
