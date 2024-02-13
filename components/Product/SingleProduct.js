import Footer from "../UI/Footer";

function SingleProduct({ data }) {

    return (
        <>
            <div className="w-11/12 mx-auto py-5 rounded-lg md:grid md:gap-20 md:grid-cols-2 md:min-h-screen lg:grid lg:grid-cols-2 lg:min-h-screen">
                <div>
                    <p className="text-2xl font-bold ml-2 mb-6">{data[1].productName}</p>
                    <img className="max-w-full rounded-lg max-h-96 mx-auto" src={data[1].productImage} alt="a" />
                </div>

                <div>
                    <div className="flex mt-6 mb-6 items-center">
                        <p>Price:</p>
                        <p className="font-semibold italic text-xl ml-2">{data[1].productPrice}$</p>
                    </div>

                    <p className="mt-6 font-semibold text-lg underline underline-offset-8">Product Description</p>
                    <p className="text-md mb-6 mt-4 tracking-wide">{data[1].productDescription}</p>
                    <div className="flex items-center">
                        <p>Category:</p>
                        <p className="ml-2 font-semibold italic">{data[1].category.toUpperCase()}</p>
                    </div>
                    <div className="flex items-center mt-4 mb-8">
                        <p>Seller:</p>
                        <p className="ml-2 font-semibold italic">{data[1].username.toUpperCase()}</p>
                    </div>
                </div>
            </div>

            <div className="border-t-2">
                <Footer />
            </div>
        </>
    );
}

export default SingleProduct;
