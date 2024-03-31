import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/components/one-hit-wonder/Navbar/Navbar";
import Footer from "@/app/components/one-hit-wonder/Footer/Footer";

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
				<Navbar />
				<main className="pt-8">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
