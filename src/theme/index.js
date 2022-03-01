import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
});

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    colors: {
        black: '#16161D',
    },
    fonts: {
        heading: 'Inter',
        body: 'Inter'
    },
    breakpoints,
});