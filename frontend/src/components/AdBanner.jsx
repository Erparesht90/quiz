import { useEffect } from 'react';

const AdBanner = ({ slotId, format = 'auto', responsive = true }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    return (
        <div className="my-8 text-center">
            {/* Replace client ID with real one in production */}
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXX"
                data-ad-slot={slotId || "1234567890"}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}></ins>
            <div className="text-xs text-gray-400 mt-1">Advertisement</div>
        </div>
    );
};

export default AdBanner;
