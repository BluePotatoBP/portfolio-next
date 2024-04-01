'use client';
import "./ProjectListGrid.css";
import { getProjects } from '@/ProjectsList';
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import ProjectCard from "@/app/components/reusable/ProjectCard/ProjectCard";

const projects = getProjects(false);

// Create card instances
const listProjects = (amount: number, onlyFeatured = false) =>
	projects.slice(0, amount).map((p, i) => {
		if (p === null) return null;
		if (onlyFeatured && !p.featured) return null;
		if (p.hidden || p.hidden === null) return null;
		return <ProjectCard decoration={p} key={`card-${i}`} />;
	});

const ProjectListGrid = () => {
	const [displayedProjects, setDisplayedProjects] = useState(8);

	// Handle the load more button
	const handleLoadMoreClick = () => {
		setDisplayedProjects(displayedProjects + 4);
	};

	return (
		<div className="projects-list">
			<h1 className="title-large tracking-widest max-w-[80%]" id="projects">ALL PROJECTS</h1>
			<div className="projects-list-items flex flex-row lg:gap-4 gap-2">
				{listProjects(displayedProjects)}
			</div>
			{displayedProjects < projects.length && (
				<button className="load-more-btn" title="Press to load more projects." onClick={handleLoadMoreClick}>
					<MdExpandMore />
				</button>
			)}
		</div>
	);

};

export default ProjectListGrid;