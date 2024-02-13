import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";

import Input from "../UI/Input";
import Button from "../UI/Button";

import MainImage from "../../public/main.png";

function Homepage() {

    const { idToken } = useAuth();

    const router = useRouter();

    function gotoSignupHandler() {
        router.replace("/signup");
    }

    function gotoProductHandler() {
        router.push("/products");
    }

    return (
        <main className="md:flex md:items-center md:gap-10 space-y-5 w-11/12 mx-auto mt-5">
            <div className="flex-col space-y-5 w-full mx-auto mt-5 md:w-full">
                <h1 className="text-dark-green text-3xl font-bold">The platform commerce is built on</h1>
                <h4 className="text-light-gray text-lg">Millions of the world's most successful brands trust Shopify to sell, ship and process payments anywhere.</h4>

                {!idToken &&
                    <>
                        <div className="grid gap-3">
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter your mail address"
                            />
                            <Button
                                title="Start free trial"
                                onClick={gotoSignupHandler}
                            />
                        </div>
                        <p className="text-light-gray pb-5">Try Shopify free for 14 days, no credit card required. By entering your email, you agree to receive marketing emails from Shopify.</p>
                    </>}

                {idToken &&
                    <div className="md:py-8 lg:py-8">
                        <h3 className="text-dark-green text-2xl font-semibold">With you wherever you’re going</h3>
                        <p className="text-light-gray text-lg md:pb-8 lg:pb-8 py-6">One platform with all the ecommerce and point of sale features you need to start, run, and grow your business.</p>
                        <Button
                            title="Go to Products page"
                            onClick={gotoProductHandler}
                        />
                    </div>
                }
            </div>

            <div className="w-full mx-auto">
                <Image src={MainImage} priority="true" />
            </div>

        </main>
    );
}

export default Homepage;
