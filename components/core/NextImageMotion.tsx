// "correct" way to do it. (then pass this to `motion(NextImageWrapped)`)
// const NextImageWrapped = forwardRef<HTMLElement>((props, ref) => (<NextImage {...props} itemRef={ref} />))
// NextImageWrapped.displayName = "NextImageWrapped";

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import NextImage from 'next/image';

export const NextImageMotion = motion(forwardRef(NextImage))