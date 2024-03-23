import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface NavigationLinkProps {
	to: string;
	children: React.ReactNode;
}

const NavLink: FC<NavigationLinkProps> = ({ to, children }) => {
	const isActive = usePathname() === to;
  
	return (
	  <Link href={to} className={`link flex justify-center items-center ${isActive ? "active_link" : ''}`} draggable={false}>{children}</Link>
	);
  }

export default NavLink