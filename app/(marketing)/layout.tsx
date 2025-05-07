"use client";

import Navbar from "@/components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default MarketingLayout;
