import { Theme } from '@material-ui/core';

export const tabsStyles = () => ({
    indicator: {
        display: 'none',
    },
});
export const tabItemStyles = ({
    palette,
    breakpoints,
}: Pick<Theme, 'breakpoints' | 'palette'>) => {
    const defaultBgColor = "#202020";
    const defaultSelectedBgColor = '#ec1d24';
    return {
        root: ({
            bgColor = defaultBgColor,
            selectedBgColor = defaultSelectedBgColor,
        }) => ({
            minHeight: 'auto',
            minWidth: 'auto',
            opacity: 1,
            overflow: 'initial',
            color: 'white',
            backgroundColor: bgColor,
            transition: '0.2s',
            
            '&:before': {
                transition: '0.2s',
            },
            '& + $selected:before': {
                opacity: 0,
            },
            '&:hover': {
                '&:not($selected)': {
                    backgroundColor: "#202020"
                },
                '&::before': {
                    opacity: 0,
                },
                '& + $root:before': {
                    opacity: 0,
                },
            },
        }),
        selected: ({ selectedBgColor = defaultSelectedBgColor }) => ({
            backgroundColor: selectedBgColor,
            color: 'white',
            '& + $root': {
                zIndex: 1,
            },
            '& + $root:before': {
                opacity: 0,
            },
        }),
        wrapper: {
            zIndex: 2,
            textTransform: 'initial',
        },
    };
};
