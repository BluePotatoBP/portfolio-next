'use client'

import { useEffect, useState } from 'react';
import AnimatedIcon from '@/app/components/reusable/AnimatedIcon/AnimatedIcon';
import NavLink from '@/app/components/reusable/NavLink/NavLink'
import SearchBar from '@/app/components/reusable/SearchBar/SearchBar';

import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { AiFillExperiment } from "react-icons/ai";
import { FiExternalLink } from 'react-icons/fi';
import './Navbar.css';

const NavBar = () => {
	// Apply darker background on first scroll
	const [hasScrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if(window.scrollY > 0) setScrolled(true)
			else setScrolled(false)
		}

		window.addEventListener('scroll', handleScroll);
		// Remove event listener when the event is over
		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, [])

	return (
		<nav className={`navbar-container${hasScrolled ? ' scrolled': '' }`}>
			<AnimatedIcon />
			<div className="navbar-helper-container">
				<div className='navbar-links'>
					<NavLink to="/contact" >
						<BiSolidMessageSquareDetail className='icon' />
						<div className="link-text">Contact</div>
					</NavLink>
					<NavLink to="/playground" >
						<AiFillExperiment className='icon' />
						<div className="link-text">Playground</div>
					</NavLink>
					<a href="https://github.com/bluepotatobp/portfolio-website" draggable={false} target="_blank" rel='noreferrer' className="link outgoing">
						<FiExternalLink className='icon' />
						<div className="link-text">Source</div>
					</a>
				</div>
				<SearchBar />
			</div>
		</nav>
	);

}


export default NavBar;