import React from "react"

import { BsTwitter, BsDiscord, BsGithub } from "react-icons/bs"


const Footer = () => {

	return (
		<footer className="footer-container flex flex-row relative justify-center items-center bg-transparent p-2">
			<div className="footer-content">
				<div className="footer-socials flex flex-row justify-between items-center gap-6">
					<a href="https://twitter.com/BluePotatoBP" draggable={false} target="_blank" rel='noreferrer' aria-label="twitter" className="link p-4 rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] hover:bg-red-500"><BsTwitter className='icon' /></a>
					<a href="https://discord.gg/v8zkSc9" draggable={false} target="_blank" rel='noreferrer' aria-label="discord" className="link p-4 rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] hover:bg-red-500"><BsDiscord className='icon' /></a>
					<a href="https://github.com/BluePotatoBP" draggable={false} target="_blank" rel='noreferrer' aria-label="github" className="link p-4 rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] hover:bg-red-500"><BsGithub className='icon' /></a>
				</div>
			</div>
		</footer>
	)
}

export default Footer