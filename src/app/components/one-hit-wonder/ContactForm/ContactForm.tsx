'use client';
import { useState, useCallback, useRef, useEffect } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { motion, Variants, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
	const CHARACTER_LIMIT: number = 1000;
	const buttonVariants: Variants = {
		initial: { scale: 0 },
		animate: { scale: 1 },
		bounce: {
			scale: [1, 1.2, 1],
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
			},
		},
	};
	const countRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const turnstileRef = useRef<TurnstileInstance>(null);

	const [email, setEmail] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [charCount, setCharCount] = useState<number>(0);
	const [coolWebsiteFieldThatJustHappensToBeHiddenToHumans, setHoomanRadar] = useState<string>('');
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value.length <= CHARACTER_LIMIT) {
			setMessage(e.target.value);
			setCharCount(e.target.value.length);
		}
	}, []);

	async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		if (coolWebsiteFieldThatJustHappensToBeHiddenToHumans !== '') return setSubmitted(true);;

		if (formRef.current) {
			const formData = new FormData(formRef.current);
			const token = formData.get('cf-turnstile-response');

			try {
				const res = await fetch('api/verify-message', {
					method: 'POST',
					body: JSON.stringify({ token }),
					headers: {
						'content-type': 'application/json'
					}
				});
				const data = await res.json();

				if (data.success) {
					// Reset forms, animate submit button
					setEmail('');
					setMessage('');
					setCharCount(0);
					setSubmitted(true);
					setError(null);
					turnstileRef.current?.reset();
					// Currently the data just goes nowhere, save it somewhere 
				} else {
					// Inform the user with an error
					setError('Captcha ran into an issue, sorry about that. Refresh the page or contact me through other means.');
					setSubmitted(false);
				}
			} catch (error) {
				// Inform the user with an error
				console.error('Error submitting form:', error);
				setError('Some funny business went down, please refresh the page.');
				setSubmitted(false);
			}

		}
	};

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (submitted) {
			timer = setTimeout(() => {
				setSubmitted(false);
			}, 10000);
		}
		return () => clearTimeout(timer);
	}, [submitted]);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (error !== null) {
			timer = setTimeout(() => {
				setError(null);
			}, 10000);
		}
		return () => clearTimeout(timer);
	}, [error]);

	return (
		<div className="contact-form-container flex flex-col min-w-32 max-w-[80vw] lg:max-w-[60rem] gap-8">
			<div className="form-container flex flex-col gap-8 bg-black/10 p-4 rounded-[2rem]">
				<div className="form-inner-styling-container flex flex-col gap-8 bg-black/10 p-4 rounded-2xl">
					<div className="info flex flex-col gap-4">
						<h2 className="text-4xl font-semibold">Get in touch</h2>
						<p>You can find me on social platforms or send me a message through the form below.</p>
					</div>
					<form className="inputs flex flex-col gap-2" name="contact" id="contact" onSubmit={handleSubmit} ref={formRef}>
						<input type="text" name="website" value={coolWebsiteFieldThatJustHappensToBeHiddenToHumans} onChange={(e) => setHoomanRadar(e.target.value)} className="hidden" />
						<input type="email" name="email" autoComplete='email' placeholder="EMAIL" required value={email} onChange={(e) => setEmail(e.target.value)} className="py-4 px-4 rounded-lg text-slate-200 bg-contact-dark-blue" />
						<textarea name="message" required id="message" placeholder="MESSAGE" value={message} onChange={handleInputChange} maxLength={2000} className="flex pb-32 pt-4 px-4 rounded-lg text-slate-200 resize-none bg-contact-dark-blue"></textarea>
						<div className={`char-count flex justify-end ${charCount >= 950 ? 'text-red-500 font-bold' : charCount >= 800 ? 'text-lovely-yellow font-medium' : ''}`} ref={countRef} >{charCount}/{CHARACTER_LIMIT}</div>
						<AnimatePresence>
							{
							error && <motion.div 
							className="error-message text-red-500 text-sm text-center"
							initial={{ opacity: 0, scaleY: 0 }}
							animate={{ opacity: 1, scaleY: 1 }}
							exit={{ opacity: 0, scaleY: 0 }}
							>{error}</motion.div>
							}
						</AnimatePresence>
						<div className="button-turnstile flex lg:flex-row flex-col justify-between text-center items-center gap-4">
							<motion.button
								type="submit"
								className={`flex lg:w-48 w-full ${submitted ? 'bg-lime-600' : 'bg-red-500'} justify-center text-center p-4 rounded-full text-slate-100 font-black tracking-widest`}
								disabled={submitted}
								variants={buttonVariants}
								initial="initial"
								animate={submitted ? 'bounce' : 'animate'}
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 20
								}}
							>
								{submitted ? "GOT IT!" : "SEND MESSAGE"}
							</motion.button>
							<Turnstile
								siteKey={process.env.NEXT_PUBLIC_TURNSTILE_KEY ? process.env.NEXT_PUBLIC_TURNSTILE_KEY : '2x00000000000000000000AB'} // If not set, force a blocked challenge.
								options={{ language: 'auto', appearance: 'interaction-only', refreshExpired: 'auto' }}
								as='aside'
								ref={turnstileRef}
								scriptOptions={{
									appendTo: 'body'
								}}
							/>
						</div>
					</form>
				</div>
			</div>
			<div className="socials-container flex flex-row gap-4 w-full lg:justify-between justify-center">
				<div className="twitter-link flex flex-col">
					<h5 className="text-slate-400">TWITTER</h5>
					<a href="https://twitter.com/BluePotatoBP" draggable={false} target="_blank" rel='noreferrer' aria-label="twitter" className="link rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] text-slate-200 hover:text-slate-400">@bluepotatobp</a>
				</div>
				<div className="discord-link flex flex-col lg:text-start text-center">
					<h5 className="text-slate-400">DISCORD</h5>
					<a href="https://discord.gg/v8zkSc9" draggable={false} target="_blank" rel='noreferrer' aria-label="discord" className="link rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] text-slate-200 hover:text-slate-400">@bluepotatobp</a>
				</div>
				<div className="github-link flex flex-col lg:text-start text-end">
					<h5 className="text-slate-400">GITHUB</h5>
					<a href="https://github.com/BluePotatoBP" draggable={false} target="_blank" rel='noreferrer' aria-label="github" className="link rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] text-slate-200 hover:text-slate-400">@bluepotatobp</a>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;