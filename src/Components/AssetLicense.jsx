import { useState } from 'react';

export default function AssetLicense({ asset }) {
    const [showFull, setShowFull] = useState(false);
    const license = asset.license || '';

    const isLong = license.length > 20;
    // const displayedLicense = showFull || !isLong ? license : license.slice(0, 20) + '...';

    return (
        <div className="text-sm text-gray-400 mt-[10px]">
            <p>
                License: {showFull ? (license) : (!isLong ? license : '')}
                {isLong && (
                    <button
                        className="ml-2 text-blue-400 hover:underline cursor-pointer relative"
                        onClick={() => showFull != false ? setShowFull(false) : setShowFull(true)}
                    >
                        See License
                        <span className="material-symbols-rounded absolute top-[-1.4px]">
                            chevron_forward
                        </span>
                    </button>
                )}
                 
            </p>
        </div>
    );
}


