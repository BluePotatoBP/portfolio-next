/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/project',
				destination: '/#projects',
				permanent: true
			},
			{
				source: '/projects',
				destination: '/#projects',
				permanent: true
			}
		]
	},
	reactStrictMode: true
};

export default nextConfig;
