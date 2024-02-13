
function Modal({ error }) {
    return (
        <div className="border-2 bg-light-white z-50 p-4 rounded-lg text-center text-red-900 font-bold fixed top-5 left-2/4 -translate-x-2/4 w-10/12 md:w-6/12 lg:w-5/12 shadow-2xl ">
            <p>{error}</p>
        </div>
    );
}

export default Modal;
