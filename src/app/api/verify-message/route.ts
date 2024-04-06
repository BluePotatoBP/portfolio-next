import type { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.CLOUDFLARE_SECRET_KEY;

export async function POST(request: Request) {
	if (!secret) {
		console.error("CLOUDFLARE_SECRET_KEY environmental variable is not set.");
		return new Response(JSON.stringify({ success: false, error: 'CLOUDFLARE_SECRET_KEY environmental variable is not set.' }), { status: 500, headers: { 'content-type': 'application/json' } });
	}

	try {
		const { token } = (await request.json() as { token: string; });

		const res = await fetch(verifyEndpoint, {
			method: 'POST',
			body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		});

		const data = (await res.json()) as TurnstileServerValidationResponse;

		return new Response(JSON.stringify(data), {
			status: data.success ? 200 : 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Error verifying Turnstile token:', error);
		return new Response(JSON.stringify({ success: false, error: 'Error verifying Turnstile token' }), { status: 500, headers: { 'content-type': 'application/json' } });
	}
}

