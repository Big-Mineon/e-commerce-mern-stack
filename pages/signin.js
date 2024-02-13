import Head from "next/head";

import SignIn from "../components/SignIn/SignIn";

function LoginPage({ userData }) {
    return (
        <>
            <Head>
                <title>Sign In</title>
                <meta name="description" content="Sign in to start your shopping journey." />
            </Head>

            <SignIn data={userData} />
        </>
    );
}

export default LoginPage;

export async function getStaticProps() {

    const response = await fetch("https://e-commerce-ad64f-default-rtdb.europe-west1.firebasedatabase.app/users.json");
    const data = await response.json();

    return {
        props: {
            userData: data
        }
    }
}