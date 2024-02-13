import Head from "next/head";

import Signup from "../components/Signup/Signup";

function SignupPage() {
    return (
        <>
            <Head>
                <title>Sign Up</title>
                <meta name="description" content="Sign up to start your shopping journey." />
            </Head>

            <Signup />
        </>
    );
}

export default SignupPage
