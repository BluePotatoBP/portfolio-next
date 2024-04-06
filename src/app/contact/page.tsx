import ContactForm from "@/app/components/one-hit-wonder/ContactForm/ContactForm";
import ContactEasterEgg from "@/app/components/one-hit-wonder/ContactEasterEgg/ContactEasterEgg";

export default function Contact() {

	return (
		<main className="flex min-h-screen flex-row items-center lg:justify-between justify-center lg:py-32 lg:px-32 pt-64 bg-[#1b1e28]">
			<div className="left-container">
				<ContactEasterEgg />
			</div>
			<div className="right-container">
				<ContactForm />
			</div>
		</main>
	);
}