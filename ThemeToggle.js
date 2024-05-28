define([
    'qlik',
    './properties',
    'text!./template.html',
    'css!./index.css',
], function (qlik, properties, template) {
    function changeTheme(theme) {
        try {
            qlik.theme.apply(theme);
        } catch (err) {
            console.err('ERROR: Could not apply theme: ', err);
        }
    }

    function getVariable(variableName) {
        return new Promise((resolve, reject) => {
            qlik.currApp()
                .model.engineApp.getVariable(variableName)
                .then((reply) => {
                    console.log('reply: ', reply);

                    reply.getContent().then((data) => {
                        console.log(variableName, ': ', data.qString);
                        resolve(data.qString);
                    });
                });
        });
    }

    function setStringVariable(variableName, value) {
        return new Promise((resolve, reject) => {
            console.log('Changing ', variableName, ' to ', value);

            // qlik.currApp().model.engineApp.setStringValue(variableName, value);

            qlik.currApp()
                .model.engineApp.getVariable(variableName)
                .then((reply) => {
                    console.log('reply: ', reply);

                    // reply.setContent(variableName, value);
                    reply.setContent();

                    resolve();
                });
        });
    }

    return {
        template: template,
        support: {
            snapshot: true,
            export: true,
            exportData: false,
        },
        definition: properties,
        paint: function () {
            return qlik.Promise.resolve();
        },
        controller: [
            '$scope',
            function ($scope) {
                $scope.lightModeIconUrl =
                    '/content/Global%20Library/light-mode-icon%4096px.png';
                $scope.darkModeIconUrl =
                    '/content/Global%20Library/dark-mode-icon%40100px.png';

                $scope.currentTheme = $scope.layout.defaultTheme;
                $scope.currentIcon =
                    $scope.currentTheme === 'lightTheme'
                        ? $scope.darkModeIconUrl
                        : $scope.lightModeIconUrl;
                $scope.buttonText =
                    $scope.layout.defaultTheme === 'lightTheme'
                        ? 'Switch to Dark Mode'
                        : 'Switch to Light Mode';

                changeTheme($scope.layout.defaultTheme);

                $scope.toggleTheme = function () {
                    if ($scope.currentTheme === 'lightTheme') {
                        $scope.currentTheme = 'darkTheme';
                        $scope.currentIcon = $scope.lightModeIconUrl;

                        changeTheme($scope.layout.darkTheme);
                        $scope.buttonText = 'Switch to Light Mode';
                    } else if ($scope.currentTheme === 'darkTheme') {
                        $scope.currentTheme = 'lightTheme';
                        $scope.currentIcon = $scope.darkModeIconUrl;

                        changeTheme($scope.layout.lightTheme);
                        $scope.buttonText = 'Switch to Dark Mode';
                    }
                };

                console.log('ThemeToggle layout: ', $scope.layout);
                console.log('qlik.app: ', qlik.currApp());
                // console.log(
                //     'qlik getVariables(): ',
                //     qlik.currApp().model.engineApp.getVariables({
                //         'qVariableListDef'
                //     })
                // );

                setStringVariable('JAN_VAR', 'AS;DF;LKAJSD;F').then(() => {
                    getVariable('JAN_VAR');
                });

                // setStringVariable('JAN_VAR', 'CHANGE_1').then(() =>
                //     console.log('should be done')
                // );

                $(document).ready(() => {
                    $('.ThemeToggle-button').addClass($scope.layout.position);
                });
            },
        ],
    };
});
