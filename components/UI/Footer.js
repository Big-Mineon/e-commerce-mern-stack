import Twitter from "../../public/twitter.png";
import LinkedIn from "../../public/linkedin.png";
import Github from "../../public/github.png";
import Image from "next/image";

function Footer() {
    return (
        <footer className="grid w-full lg:w-11/12 md:w-11/12 lg:text-left mx-auto md:grid-cols-3 space-y-4 py-8 justify-center items-center bg-light-white">
            <p className="text-light-gray text-center lg:text-left md:text-left md:mt-4 lg:mt-4">For development only.</p>
            <a href="https://www.shopify.com/" target="_blank" rel="noreferrer" className="text-light-gray text-center">The Website</a>
            <div className="flex gap-6 items-center justify-between md:justify-end">
                <a href="https://www.linkedin.com/in/serdarrgokhann/" className="w-10 h-10" target="_blank" rel="noreferrer"><Image src={LinkedIn} alt="instagram" priority="true" /></a>
                <a href="https://twitter.com/serdarrgokhann" className="w-10 h-10" target="_blank" rel="noreferrer"><Image src={Twitter} alt="twitter" priority="true" /></a>
                <a href="https://github.com/serdargokhan" className="w-10 h-10" target="_blank" rel="noreferrer"><Image src={Github} alt="github" priority="true" /></a>
            </div>
        </footer>
    );
}

export default Footer;
