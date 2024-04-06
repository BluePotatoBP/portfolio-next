
const ContactEasterEgg = () => {
	return (
		<div className="contact-easter-egg-container">
			<div className="images-container flex flex-row gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
				<div className="container-divider-bottom flex flex-col gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
					<div className="h-[30rem] rounded-2xl bg-contact-dark-blue border-dashed border-slate-400 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0" />
					<div className="h-[13rem] rounded-2xl bg-contact-dark-blue border-dashed border-red-100 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0" />
				</div>
				<div className="container-divider-bottom flex flex-col gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
					<div className="h-[13rem] rounded-2xl bg-contact-dark-blue border-dashed border-red-100 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0" />
					<div className="h-[30rem] rounded-2xl bg-contact-dark-blue border-dashed border-slate-400 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0" />
				</div>
			</div>
		</div>
	);
};

export default ContactEasterEgg