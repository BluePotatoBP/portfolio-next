'use server'

import { Suspense } from 'react'
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';

import { getProject } from '@/ProjectsList';

export default async function ProjectDetails({ params }: { params: { projectId: string } }) {
	// Fetch the README
	const markdown = await fetch(`https://api.github.com/repos/${getProject(params.projectId)?.repo}/contents/README.md`, {
		headers: {
			'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
		}
	})
		.then(response => response.json())
		.then(data => { // Decode base64 in a way that supports emoji 😑
			let decodedData = new TextDecoder().decode(Uint8Array.from(atob(data.content), c => c.charCodeAt(0)))

			return decodedData
		})
		.catch(e => {
			console.log(e)
			return "# Whoops..."
		})

	return (
		<main className="flex w-full min-h-screen flex-col items-center justify-center p-24">
			<h1 className='text-5xl font-black tracking-widest pb-8'>{params.projectId.toLocaleUpperCase()}</h1>
			<Suspense fallback={<>Loading...</>}>
				<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeReact]} className='flex justify-start flex-col gap-2'>{markdown}</ReactMarkdown>
			</Suspense>
		</main>
	)
}