'use client';
import { motion, useMotionValue, useVelocity, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { MdAnchor, MdEmergency, MdRocket } from "react-icons/md";
import { FaFeatherAlt } from "react-icons/fa";

const ContactEasterEgg = () => {

	const innerConstraint = useRef(null);

	const color = (saturation: number) => saturation ? `hsl(10, ${saturation}, 57%)` : '#14161e';
	const x = useMotionValue(0);
	const xSmooth = useSpring(x, { damping: 20, stiffness: 50 });
	const xVelocity = useVelocity(xSmooth);
	const backgroundColor = useTransform(xVelocity, [-2000, 0, 2000], [color(100), color(0), color(100)]);

	return (
		<div className="contact-easter-egg-container" ref={innerConstraint}>
			<div className="images-container flex flex-row gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
				<div className="container-divider-bottom flex flex-col gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
					<motion.div
						className="flex justify-center items-center h-[22rem] rounded-2xl bg-contact-dark-blue border-dashed border-slate-400 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0 cursor-grab"
						drag
						dragElastic={0.25}
						dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
					><MdAnchor className='text-[4rem]' /></motion.div>
					<motion.div
						className="flex justify-center items-center h-[13rem] rounded-2xl bg-contact-dark-blue border-dashed border-red-100 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0 cursor-grab"
						drag
						dragConstraints={innerConstraint}
						whileHover={{ scale: 0.8 }}
					><FaFeatherAlt /></motion.div>
				</div>
				<div className="container-divider-bottom flex flex-col gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
					<motion.div
						className="flex justify-center items-center h-[13rem] rounded-2xl bg-contact-dark-blue border-dashed border-red-100 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0 cursor-not-allowed"
						whileHover={{ backgroundColor: '#84c7ff', transition: { type: 'tween', duration: 0.5 } }}
					><MdEmergency className='text-[2rem]' /></motion.div>
					<motion.div
						className="flex justify-center items-center h-[22rem] rounded-2xl bg-contact-dark-blue border-dashbned border-slate-400 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0 cursor-grab"
						drag
						dragElastic={1}
						dragConstraints={innerConstraint}
						whileHover={{ rotate: 90 }}
						style={{ x, backgroundColor }}
					><MdRocket className='text-[2rem]' /></motion.div>
				</div>
			</div>
		</div>
	);
};

export default ContactEasterEgg;