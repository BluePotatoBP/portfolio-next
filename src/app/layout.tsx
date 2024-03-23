import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import NavBar from "@/app/components/one-hit-wonder/Navbar/Navbar";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Blue's Portfolio",
	description: "Portfolio website to show off my work over the years.",
	applicationName: "Portfolio | BluePotatoBP",
	referrer: 'origin'
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<NavBar />
				<main>{children}</main>
			</body>
		</html>
	);
}
