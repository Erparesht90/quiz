import React, { useEffect } from 'react';

const AdComponent = ({ format = 'auto', className = '' }) => {
    useEffect(() => {
        try {
            if (window.adsbygoogle) {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    return (
        <div className={`my-4 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden ${className}`}>
            {/* Replace with your actual Client ID and Slot ID */}
            {/* For development/demo, we render a placeholder */}
            <div className="w-full text-center p-4 border-2 border-dashed border-gray-300 text-gray-400">
                <span className="block text-sm font-semibold">Advertisement</span>
                <span className="text-xs">Google AdSense Placeholder</span>
            </div>
            
            {/* 
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format={format}
                 data-full-width-responsive="true"></ins>
            */}
        </div>
    );
};

export default AdComponent;
