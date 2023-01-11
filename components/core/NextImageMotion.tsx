
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import NextImage, { ImageProps } from 'next/image';

// "correct" way to do it. (then pass this to `motion(NextImageWrapped)`)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const NextImageWrapped = forwardRef<typeof NextImage, ImageProps>((props, ref) => (<NextImage {...props} ref={ref} />))
NextImageWrapped.displayName = "NextImageWrapped";

export const NextImageMotion = motion(NextImageWrapped);