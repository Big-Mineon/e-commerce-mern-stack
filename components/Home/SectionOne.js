import Image from "next/image";
import Link from "next/link";

import Footer from "../UI/Footer";

import Food from "../../public/food.jpg";
import Drink from "../../public/drink.jpg";
import Jewelry from "../../public/jewelry.jpg";
import Cosmetic from "../../public/cosmetic.jpg";
import Mail from "../../public/mail.svg";
import People from "../../public/people.svg";
import Recycle from "../../public/recycle.svg";
import Store from "../../public/store.svg";


function SectionOne() {
    return (
        <>
            <section className="bg-dark-green">
                <div className="w-11/12 mx-auto text-white">
                    <h5 className="text-2xl py-5">Bring your business online</h5>
                    <p className="pb-8">Create an ecommerce website backed by powerful tools that help you find customers, drive sales, and manage your day-to-day.</p>

                    <div className="text-center space-y-8 md:space-y-0 lg:space-y-0 w-full mx-auto md:grid md:grid-cols-2 md:gap-8 lg:grid lg:grid-cols-4">
                        <div>
                            <Image src={Food} priority="true" />
                            <Link href="/products" >FOOD</Link>
                        </div>
                        <div>
                            <Image src={Jewelry} priority="true" />
                            <Link href="/products" >JEWELRY</Link>
                        </div>
                        <div>
                            <Image src={Drink} priority="true" />
                            <Link href="/products" >DRINK</Link>
                        </div>
                        <div>
                            <Image src={Cosmetic} priority="true" />
                            <Link href="/products" >COSMETIC</Link>
                        </div>
                    </div>


                    <div className="py-12">
                        <h5 className="text-2xl font-bold">Take the best path forward</h5>

                        <div className="md:grid-cols-2 md:grid md:gap-8 lg:grid lg:grid-cols-4 lg:gap-6">
                            <div className="space-y-2 pt-8">
                                <Image src={Mail} width="36" height="36" priority="true" />
                                <p>Start an online business</p>
                                <p className="font-light">Create a business, whether you’ve got a fresh idea or are looking for a new way to make money.</p>
                            </div>
                            <div className="space-y-2 pt-8">
                                <Image src={Store} width="36" height="36" priority="true" />
                                <p>Move your business online</p>
                                <p className="font-light">Turn your retail store into an online store and keep serving customers without missing a beat.</p>
                            </div>
                            <div className="space-y-2 pt-8">
                                <Image src={Recycle} width="36" height="36" priority="true" />
                                <p>Switch to Shopify</p>
                                <p className="font-light">Bring your business to Shopify, no matter which ecommerce platform you’re currently using.</p>
                            </div>
                            <div className="space-y-2 pt-8">
                                <Image src={People} width="36" height="36" priority="true" />
                                <p>Hire a Shopify expert</p>
                                <p className="font-light">Get set up with the help of a trusted freelancer or agency from the Shopify Experts Marketplace.</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
}

export default SectionOne;
