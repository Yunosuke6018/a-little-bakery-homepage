type FooterProps = {
    brand: string;
    message: string;
    copyright: string;
};

export function Footer({ brand, message, copyright }: FooterProps) {
    return (
        <footer className="bg-[#F7F4EE] px-6 py-12 text-[#4B3425]">
            <div className="mx-auto max-w-5xl border-t border-[#E8DDCB] pt-10">
                <p className="text-xl font-light">{brand}</p>
                <p className="mt-4 leading-7">{message}</p>
                <p className="mt-10 text-xs text-[#8A8178]">{copyright}</p>
            </div>
        </footer>
    );
}