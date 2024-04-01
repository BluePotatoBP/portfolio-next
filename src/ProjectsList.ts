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

const projects: { [key: string]: Project; } = {
	likealight: {
		name: "likealight",
		decoName: "Like A Light",
		shortDesc: "Discord bot written in JS using the Akairo framework.",
		thumbnail: "lalLogo512.png",
		repo: "bluepotatobp/lal-akairo",
		tags: [
			"lal",
			"likealight",
			"light",
			"akairo",
			"discord",
			"discordjs",
			"like a light",
		],
		featured: true,
	},

	void: {
		name: "void",
		decoName: "VOID",
		shortDesc: "Discord bot using the Sapphire framework.",
		thumbnail: "voidLogo.png",
		repo: "voidbotsprod/void-sapphire",
		tags: ["void", "sapphire", "discord", "discordjs", "voidbots"],
		featured: true,
	},

	"portfolio-next": {
		name: "portfolio-next",
		decoName: "Portfolio Next",
		shortDesc: "My portfolio website written in TS with NextJS.",
		thumbnail: "logoColorized.png",
		repo: "bluepotatobp/portfolio-next",
		tags: ["portfolio", "website", "react", "portfolio website", "next", "nextjs", "typescript"],
		featured: true,
	},

	"portfolio-website": {
		name: "portfolio-website",
		decoName: "Legacy Portfolio",
		shortDesc: "My legacy portfolio website written in JS with React.",
		thumbnail: "logo512.png",
		repo: "bluepotatobp/portfolio-website",
		tags: ["portfolio", "website", "react", "portfolio website", "javascript"],
		featured: false,
	},

	nicetry: {
		name: "",
		decoName: "Nice Try",
		shortDesc: "But it's not going to work buddy",
		thumbnail: "clown_transform.gif",
		repo: "",
		tags: ["<", ">"],
		hidden: true,
	},
};

/**
 * Helper function for getting projects
 */
export function getProjects(showHidden = false): Project[] {
	let filteredProjects = Object.values(projects).filter((p) => {
		if (showHidden) return p;
		return p && !p.hidden;
	});

	return filteredProjects;
}

export function getProject(name: string): Project | undefined {
	return projects[name];
}
