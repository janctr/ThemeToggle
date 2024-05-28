define(['qlik'], function (qlik) {
    function getThemeList() {
        return new Promise((resolve, reject) => {
            qlik.getThemeList().then((themes) => {
                resolve(
                    themes.map((theme) => {
                        return {
                            label: theme.name,
                            value: theme.id,
                        };
                    })
                );
            });
        });
    }

    const themeSettings = {
        type: 'items',
        label: 'Themes',
        translation: 'Themes',
        items: {
            defaultTheme: {
                ref: 'defaultTheme',
                type: 'string',
                component: 'dropdown',
                label: 'Default theme',
                defaultValue: 'lightTheme',
                options: [
                    { label: 'Light Mode', value: 'lightTheme' },
                    { label: 'Dark Mode', value: 'darkTheme' },
                ],
            },
            lightTheme: {
                type: 'string',
                ref: 'lightTheme',
                component: 'dropdown',
                label: 'Light Mode',
                defaultValue: 'sense',
                options: getThemeList(),
            },
            darkTheme: {
                type: 'string',
                ref: 'darkTheme',
                component: 'dropdown',
                label: 'Dark Mode',
                defaultValue: 'AdvanaDarkMode',
                options: getThemeList(),
            },
            position: {
                ref: 'position',
                type: 'string',
                component: 'dropdown',
                label: 'Icon position',
                defaultValue: 'normal',
                options: [
                    { label: 'In extension', value: 'normal' },
                    { label: 'Bottom left', value: 'bottom-left' },
                    {
                        label: 'Bottom right',
                        value: 'bottom-right',
                    },
                    { label: 'Top left', value: 'top-left' },
                    { label: 'Top right', value: 'top-right' },
                ],
            },
        },
    };

    const variables = {
        type: 'items',
        label: 'Variables',
        translation: 'Variables',
        items: {
            description: {
                component: 'text',
                label: 'Set variables after enabling light mode',
            },
            lightModeVariables: {
                type: 'array',
                translation: 'Light Mode Variables',
                ref: 'lightModeVariables',
                min: 1,
                allowAdd: true,
                allowRemove: true,
                allowMove: true,
                addTranslation: 'Add variable',
                grouped: true,
                itemTitleRef: 'lightModeVariableName',
                items: {
                    lightModeVariableSettings: {
                        type: 'items',
                        component: 'expandable-items',
                        grouped: true,
                        items: {
                            lightModeVariableName: {
                                label: 'Variable name',
                                ref: 'lightModeVariableName',
                                type: 'string',
                                expression: 'optional',
                            },
                            variableUpdatevalue: {
                                label: 'Update value',
                                ref: 'variableUpdatevalue',
                                type: 'string',
                                expression: 'optional',
                            },
                        },
                    },
                },
            },
            darkModeVariables: {
                type: 'items',
                label: 'Actions to be run after enabling dark mode',
                translation: 'Actions to be run after enabling dark mode',
            },
        },
    };

    return {
        type: 'items',
        component: 'accordion',
        items: {
            themeSettings,
            variables,
            settings: {
                uses: 'settings',
            },
        },
    };
});
