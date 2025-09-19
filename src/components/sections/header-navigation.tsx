"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, Settings } from "lucide-react";

// Inferred from footer links in the provided content
const moreMenuItems = [
    { name: "Docs", href: "https://hyperliquid.gitbook.io/hyperliquid-docs" },
    { name: "Support", href: "https://hyperliquid.gitbook.io/hyperliquid-docs/support" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy Policy", href: "/privacyPolicy" },
];

const navItems = [
    { name: "Trade", href: "/trade" },
    { name: "Vaults", href: "/vaults" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Staking", href: "/staking" },
    { name: "Referrals", href: "/referrals" },
    { name: "Leaderboard", href: "/leaderboard" },
];

const HeaderNavigation = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-20 h-[56px] bg-card text-foreground border-b border-border">
            <div className="relative flex h-full items-center justify-between px-[10px]">
                {/* Left Side */}
                <div className="flex items-center">
                    <Link href="/trade" className="flex items-center">
                        <Image
                            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/101b6ddd-a6df-46bc-ba7e-3090e288ae7d-app-hyperliquid-xyz/assets/svgs/logo-privy-1.svg"
                            alt="Hyperliquid Logo"
                            width={115}
                            height={32}
                            priority
                        />
                    </Link>
                </div>

                {/* Center Nav (Absolutely Positioned) */}
                <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-text-secondary hover:text-secondary whitespace-nowrap"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-secondary">
                                More
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {moreMenuItems.map((item) => (
                                <DropdownMenuItem key={item.name} asChild>
                                    <Link href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                                        {item.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 text-sm font-medium rounded-md whitespace-nowrap">
                        Connect
                    </Button>
                    <button className="text-muted-foreground hover:text-secondary">
                        <Globe className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-secondary">
                        <Settings className="h-5 w-5" />
                    </button>
                    {/* Placeholder for mobile menu toggle */}
                    <div className="lg:hidden">
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderNavigation;