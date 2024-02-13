
function AuthLayout({ description }) {
    return (
        <div className="border-2 bg-light-white z-50 p-4 rounded-lg text-center mx-auto justify-center text-red-900 font-bold flex items-center w-10/12 md:w-6/12 lg:w-5/12 shadow-2xl ">
            <p>{description}</p>
        </div>
    );
}

export default AuthLayout;
