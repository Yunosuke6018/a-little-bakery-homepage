"use client";

import { useState } from "react";

type NavigationItem = {
    label: string;
    href: string;
};

type HeaderProps = {
    brand: string;
    items: NavigationItem[];
};

export function Header({ brand, items }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed left-0 top-0 z-50 w-full px-5 py-5">
            <div className="mx-auto flex max-w-6xl items-start justify-between">
                <a href="#top" className="text-sm tracking-wide text-[#4B3425] drop-shadow">
                    {brand}
                </a>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsOpen((current) => !current)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F4EE]/90 text-2xl font-light text-[#4B3425] shadow-sm backdrop-blur transition"
                        aria-label="メニューを開く"
                    >
                        {isOpen ? "×" : "+"}
                    </button>

                    {isOpen && (
                        <nav className="absolute right-0 top-14 w-56 rounded-3xl bg-[#F7F4EE]/95 p-5 shadow-sm backdrop-blur">
                            <p className="mb-4 text-xs tracking-[0.28em] text-[#8A8178]">
                                MENU
                            </p>

                            <ul className="space-y-4">
                                {items.map((item) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-base text-[#4B3425] transition-opacity hover:opacity-70"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}