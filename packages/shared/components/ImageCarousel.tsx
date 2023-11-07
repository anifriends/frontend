import { Box, chakra, Flex, Image, shouldForwardProp } from '@chakra-ui/react';
import type { PanInfo } from 'framer-motion';
import {
  AnimatePresence,
  isValidMotionProp,
  motion,
  wrap,
} from 'framer-motion';
import { useState } from 'react';

import BackIcon from '../assets/icon_back.svg';

type ImageCarouselProps = {
  imageUrls: string[];
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export default function ImageCarousel({ imageUrls }: ImageCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageUrlIndex = wrap(0, imageUrls.length, page);

  const paginate = (newDirection: number) =>
    setPage([page + newDirection, newDirection]);

  const dragImage = (
    // eslint-disable-next-line
    // @ts-ignore
    event: DragEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const goBackPage = () => paginate(-1);

  const goNextPage = () => paginate(1);

  return (
    <Box overflowX="hidden" h="318px" w="100%" position="relative">
      <AnimatePresence initial={false} custom={direction}>
        <MotionImage
          height="inherit"
          width="inherit"
          objectFit="contain"
          position="absolute"
          key={page}
          src={imageUrls[imageUrlIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          // eslint-disable-next-line
          // @ts-ignore
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 40 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={dragImage}
        />
      </AnimatePresence>
      <Flex
        as="button"
        justify="center"
        align="center"
        boxSize={7}
        borderRadius={50}
        bgColor="white"
        position="absolute"
        overflow="hidden"
        top="calc(50% - 0.875rem)"
        left={2}
        zIndex={10}
        onClick={goBackPage}
      >
        <Image src={BackIcon} />
      </Flex>
      <Flex
        as="button"
        justify="center"
        align="center"
        boxSize={7}
        borderRadius={50}
        bgColor="white"
        position="absolute"
        overflow="hidden"
        top="calc(50% - 0.875rem)"
        right={2}
        zIndex={10}
        onClick={goNextPage}
      >
        <Image transform="rotate(180deg)" src={BackIcon} />
      </Flex>
    </Box>
  );
}

const MotionImage = chakra(motion.img, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
