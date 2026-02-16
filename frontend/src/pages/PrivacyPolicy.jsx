const PrivacyPolicy = () => {
    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
                <p>Welcome to MathMaster. We respect your privacy and are committed to protecting it through our compliance with this policy.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2">2. Information We Collect</h2>
                <p>We do not collect personal information like names or emails for general usage. We only track anonymous quiz performance data to improve our services.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2">3. Cookies and Advertising</h2>
                <p>We use third-party vendors, such as Google, which use cookies to serve ads based on a user's prior visits to our website or other websites.</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
                    <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2">4. Contact Us</h2>
                <p>If you have any questions about this privacy policy, please contact us via our Contact page.</p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
