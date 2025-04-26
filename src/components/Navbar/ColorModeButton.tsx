import { Box, ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useColorMode } from '../ui/color-mode';

/**
 * Color mode button
 */
const ColorModeButton = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box margin={4}>
      <ClientOnly fallback={<Skeleton boxSize="8" />}>
        <IconButton onClick={toggleColorMode} variant="outline" size="sm">
          {colorMode === 'light' ? <LuSun /> : <LuMoon />}
        </IconButton>
      </ClientOnly>
    </Box>
  );
};

export default ColorModeButton;
