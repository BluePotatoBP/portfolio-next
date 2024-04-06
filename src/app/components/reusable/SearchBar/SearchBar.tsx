import "./SearchBar.css";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { getProjects } from "../../../../ProjectsList";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';

import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdImageNotSupported } from "react-icons/md";

interface Project {
	name: string;
	decoName: string;
	shortDesc: string;
	thumbnail: string;
	repo: string;
	tags: string[];
	featured?: boolean;
	hidden?: boolean;
}

const SearchBar: React.FC = () => {
	const location = usePathname();
	// Requesting the projects list
	const [inputItems, setInputItems] = useState<Project[]>([]);
	useEffect(() => {
		setInputItems(getProjects(true));
	}, []);
	const hasProjects = Object.keys(inputItems).length > 0;

	// Search state
	const [searchValue, setSearchValue] = useState("");
	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value), []);
	const inputExists = searchValue.length > 0;

	// Clear button
	const handleInputClear = useCallback(() => setSearchValue(""), []);

	// Filtering projects from tags/name and memoizing the result
	const projectList = useMemo(() => {
		// If theres no input return an empty array
		if (!inputExists) return [];
		// Otherwise filter the projects
		const inputArray = Object.values(inputItems);

		const filteredProjects = inputArray.filter((project) => {
			// Formatting inputs
			const projectNameFormatted = project.decoName.toLowerCase().split(" ").join("");
			const searchValueFormatted = searchValue.toLowerCase().split(" ").join("");
			if (searchValueFormatted === "") return false;

			// Filtering by name, decoName and tags
			if ((projectNameFormatted.includes(searchValueFormatted) ||
				project.name.toLowerCase().includes(searchValueFormatted) ||
				project.tags.some((tag) => tag.toLowerCase().includes(searchValueFormatted)))
			) return true;

			return false;
		});

		return filteredProjects;
	}, [inputExists, inputItems, searchValue]);

	// Focus state
	const [focused, setFocused] = useState(false);
	const handleFocus = () => setFocused(true);
	const searchContainer = useRef<HTMLDivElement>(null);
	const handleBlur = (event: any) => {
		if (searchContainer.current && !searchContainer.current.contains(event.relatedTarget)) setFocused(false);
	};

	useEffect(() => {
		const searchInput = document.querySelector('.search-input');
		searchInput?.addEventListener('blur', handleBlur);

		return () => {
			searchInput?.removeEventListener('blur', handleBlur);
		};
	}, []);

	// Getting elements reference for later use
	const searchInput = useRef<HTMLInputElement>(null);
	const searchItems = useRef<HTMLDivElement>(null);

	// Change appearance of search bar based on focus
	useEffect(() => {
		const noProjectsElement = document.getElementsByClassName("no-projects")[0];
		const noShortcutTipElement = document.getElementsByClassName("shortcut-tip")[0];
		const noKeybindsElement = document.getElementsByClassName("clear-tip")[0];
		const noSearchFooter = document.getElementsByClassName("search-footer")[0];

		if (focused) {
			// If focused, change the placeholder
			if (searchInput.current) {
				searchInput.current.style.fontWeight = "300";
			}

			// If parent element exists and the input is empty change padding to 0
			if (searchItems.current && inputExists) {
				searchItems.current.style.padding = "0.75rem 0";
			} else {
				searchItems.current!.style.padding = "0";
			}

			// Adding a footer with tips
			if (inputExists && !noShortcutTipElement && projectList.length > 0) {
				const userAgent = window.navigator.userAgent;
				let OS: string;
				if (userAgent.includes("Windows")) OS = "Windows";
				else if (userAgent.includes("Mac")) OS = "MacOS";
				else if (userAgent.includes("Linux")) OS = "Linux";
				else OS = "Windows";

				const actionKey: { [key: string]: string; } = {
					"Windows": "Ctrl",
					"MacOS": "⌘",
					"Linux": "Ctrl"
				};

				if (window.innerWidth >= 820) {
					if (searchItems.current) {
						const searchFooter = document.createElement("div");
						searchFooter.className = "search-footer";
						searchItems.current.appendChild(searchFooter);

						const shortcutTip = document.createElement("div");
						shortcutTip.className = "shortcut-tip";
						shortcutTip.innerHTML = `<div class="highlight-code">${actionKey[OS]}+K</div> to toggle focus.`;
						searchFooter.appendChild(shortcutTip);

						const clearTip = document.createElement("div");
						clearTip.className = "clear-tip";
						clearTip.innerHTML = `Clear input <div class="highlight-code">${actionKey[OS]}+U</div>`;
						searchFooter.appendChild(clearTip);
					}
				}

			} else if (!inputExists || projectList.length === 0) {
				if (noSearchFooter && searchItems.current) searchItems.current.removeChild(noSearchFooter);
				if (noShortcutTipElement && noSearchFooter) noSearchFooter.removeChild(noShortcutTipElement);
				if (noKeybindsElement && noSearchFooter) noSearchFooter.removeChild(noKeybindsElement);
			}

			// Show a message if there are no projects found
			if (inputExists && projectList.length === 0 && !noProjectsElement) {
				if (searchItems.current) {
					const noProjects = document.createElement("div");
					noProjects.className = "no-projects";
					noProjects.innerHTML = "Couldn't find that project.";
					searchItems.current.appendChild(noProjects);
				}
			} else if (projectList.length === 0) {
				const noProjectsElementChild = document.getElementsByClassName("no-projects")[1];
				if (noProjectsElementChild && searchItems.current) searchItems.current.removeChild(noProjectsElementChild);
			}

			// If theres no input and no projects remove "error" message
			if (searchValue === "" || searchValue === " " || projectList.length > 0) {
				if (noProjectsElement && searchItems.current) searchItems.current.removeChild(noProjectsElement);
			}

		} else if (searchInput.current) {
			// If not focused, remove tips from footer
			if (noSearchFooter && searchItems.current) searchItems.current.removeChild(noSearchFooter);
			if (noShortcutTipElement && noSearchFooter) noSearchFooter.removeChild(noShortcutTipElement);
			if (noKeybindsElement && noSearchFooter) noSearchFooter.removeChild(noKeybindsElement);

			// Change styling back to normal
			if (!inputExists) searchInput.current.style.fontWeight = "600";
			searchInput.current.placeholder = "Search";
			if (searchItems.current) searchItems.current.style.padding = "0";
			if (noProjectsElement && searchItems.current) searchItems.current.removeChild(noProjectsElement);
		}
	}, [searchInput, focused, searchValue, searchItems, projectList, inputExists]);

	useEffect(() => {
		// Search shortcut (Ctrl + K)
		// There is a way to make this cross compatible with other keyboard layouts, but I dont think its necessary for my page
		// https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/getLayoutMap
		const focusToggleCallback = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
				event.preventDefault();
				if (focused) {
					searchInput.current!.blur();
				} else {
					searchInput.current!.focus();
				}
			}
		};

		document.addEventListener('keydown', focusToggleCallback);
		return () => document.removeEventListener('keydown', focusToggleCallback);
	}, [focused, searchInput]);

	useEffect(() => {
		// Clear input shortcut (Ctrl + U)
		const clearCallback = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.code === 'KeyU') {
				event.preventDefault();
				handleInputClear();
			}
		};

		document.addEventListener('keydown', clearCallback);
		return () => document.removeEventListener('keydown', clearCallback);
	}, [handleInputClear]);

	useEffect(() => {
		// Autofocus on searchbar when typing starts
		const autofocusCallback = (event: KeyboardEvent) => {
			const conditions = [
				event.metaKey,
				event.ctrlKey,
				event.code === 'OSLeft',
				event.code === 'OSRight',
				event.code === 'Escape',
				event.code === 'AltLeft',
				event.code === 'AltRight',
				event.code === 'Tab',
				event.code === 'Home',
				event.code === 'End',
				event.code === 'PageUp',
				event.code === 'PageDown',
				event.code === 'Insert',
				event.code === 'Delete',
				event.code === 'Pause',
				event.code === 'ScrollLock',
				event.code === 'ArrowUp',
				event.code === 'ArrowDown',
				event.code === 'ArrowLeft',
				event.code === 'ArrowRight',
				event.code?.match(/F[0-9]/i) || false
			];

			if (!conditions.some(condition => condition)) {
				if (location === "/") {
					searchInput.current!.focus();
				}
			}
		};

		document.addEventListener('keydown', autofocusCallback);
		return () => document.removeEventListener('keydown', autofocusCallback);
	}, [handleInputClear, location]);

	// Mapping the projects and returning list items
	const projectListItems = () =>
		projectList.slice(0, 5).map((p) => {
			const linkTo: string = p.name ? `/project/${p.name}` : "not-found";
			const decoName: string = p.decoName ? p.decoName : "Something went wrong...";
			const shortDesc: string = p.shortDesc ? p.shortDesc : "Something went wrong...";
			const thumbnailSrc = p.thumbnail !== '' ?
				(<Image alt="" draggable={false} src={`/images/${p.thumbnail}`} unoptimized={p.thumbnail.endsWith('.gif') ? true : false} width="20" height="20" />)
				: (<MdImageNotSupported className="thumbnail-fallback" />);

			return (
				<li key={`item${projectList.indexOf(p)}`}>
					<div className="search-item">
						<Link href={linkTo} draggable={false} onClick={handleInputClear} key={`item${projectList.indexOf(p)}`} prefetch={true}>
							<div className="search-result-thumbnail">{thumbnailSrc}</div>
							<div className="search-result-info">
								<div className="result-clickable">
									<div className="search-result-name">{decoName}</div>
									<div className="search-result-desc">{shortDesc}</div>
								</div>
							</div>
						</Link>
					</div>
					<div className="bottom-line" key={`divider${projectList.indexOf(p)}`}></div>
				</li>
			);
		});

	return (
		<div className="search-container" ref={searchContainer}>
			<div className="search-bar">
				{hasProjects ? <FaSearch className="search-icon" /> : <FaSearch className="search-icon fallback" />}
				<input
					type="text"
					placeholder="Search"
					aria-label="Enter search term"
					className="search-input"
					name="search-input"
					id="search-input"
					ref={searchInput}
					value={searchValue}
					onChange={handleInputChange}
					onFocus={handleFocus}
					maxLength={50}
				/>
				{inputExists && <button className="search-clear" onClick={handleInputClear}><ImCross /></button>}
			</div>
			<div className="search-items" ref={searchItems}>
				{focused ? <ul>{projectListItems()}</ul> : null}
			</div>
		</div>
	);
};

export default SearchBar;