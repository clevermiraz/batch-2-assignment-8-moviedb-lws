"use client";

import { useEffect, useState } from "react";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";

export default function SocialShare() {
    const [currentUrl, setCurrentUrl] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    return (
        <>
            <div className="flex flex-wrap gap-4">
                <FacebookShareButton url={currentUrl}>
                    <FacebookIcon size={36} round />
                </FacebookShareButton>
                <TwitterShareButton url={currentUrl}>
                    <TwitterIcon size={36} round />
                </TwitterShareButton>
                <LinkedinShareButton url={currentUrl}>
                    <LinkedinIcon size={36} round />
                </LinkedinShareButton>
            </div>
        </>
    );
}
