import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

function Layout({ children }) {

    const [deleteClick, setDeleteClick] = useState(false);

    const { setCloseModal, setOpenModal, eraseItem } = useAuth();

    const router = useRouter();

    function closeModalHandler() {
        setCloseModal(true);
        setOpenModal(false);
    }

    function confirmDeleteHandler() {
        setDeleteClick(true);
    }

    useEffect(() => {

        async function deleteRequest() {
            try {
                await fetch(`https://e-commerce-ad64f-default-rtdb.europe-west1.firebasedatabase.app/products/${eraseItem}.json`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }
            catch (err) {
                console.error(err);
            }
        }

        if (deleteClick && eraseItem) {
            deleteRequest();
            router.push("/create-product");
            setCloseModal(true);
            setOpenModal(false);
        }

    }, [deleteClick, eraseItem]);

    return (
        <div>
            <div className=" bg-slate-800 w-10/12 md:w-1/2 py-8 px-6 mx-auto rounded-lg justify-center top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 items-center fixed z-50">
                <p className="text-white text-center mb-6">Are you sure?</p>
                <div className="space-x-5 text-center">
                    <button onClick={closeModalHandler} className="px-5 py-2 bg-light-green rounded-md text-white hover:bg-dark-green active:bg-dark-green" >Cancel</button>
                    <button onClick={confirmDeleteHandler} className="px-5 py-2 bg-red-500 rounded-md text-white hover:bg-red-700 active:bg-red-700" >Confirm</button>
                </div>
            </div>

            <div onClick={closeModalHandler}>
                {children}
            </div>

        </div>
    );
}

function BackgroundModal({ children }) {
    return (
        <Layout>
            <div className="opacity-30 z-20 min-h-screen">
                {children}
            </div>
        </Layout>
    );
}

export default BackgroundModal;
