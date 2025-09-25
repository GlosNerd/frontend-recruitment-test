import Link from 'next/link';
import { useRouter } from 'next/router';
import { CyberportLogo } from '@/components/layout/CyberportLogo';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const { pathname } = useRouter();
    const active = pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={`rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
        >
            {children}
        </Link>
    );
};

export default function Header() {
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center">
                    <CyberportLogo height={35} />
                </Link>

                <nav className="flex items-center gap-1">
                    {/* Für jeden Navigationspunkt übergebe ich Pfad und Inhalt. 
                    NavLink nutzt intern next/link für das Routing und setzt automatisch den aktiven Zustand. */}
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/products">Products</NavLink>
                </nav>
            </div>
        </header>
    );
}
