angular.module('app')
    .controller('menuCtrl', function (auth, $http) {
        console.log('hello from menu js');
        this.showLoginForm = false;
        this.showSignUpForm = false;
        this.showRules = false;
        this.showLogOut = false;
        this.showLoginButton = false;
        this.showLeaderboard = false;

        this.toggleLoginForm = () => {
            this.showLoginForm = !this.showLoginForm;
        };

        this.toggleSignUpForm = () => {
            this.showSignUpForm = !this.showSignUpForm;
        };

        this.toggleRules = () => {
            this.showRules = !this.showRules;
        };

        this.toggle = () => {
            this.showLogOut = !this.showLogOut;
            this.toggleLoginForm();
        };

        this.toggleLoginButton = () => {
            this.showLoginButton = !this.showLoginButton;
        };

        this.toggleLeaderboard = () => {
            console.log(auth);
            this.showLeaderboard = !this.showLeaderboard;
        };

        this.leaderboardInfo;
        this.usernames = [];
        this.wins = [];
        this.losses = [];
        this.goals_made = [];
        this.games_played = [];
        this.handleLeaderboard = () => {
            $http({
                method: 'GET',
                url: '/api/leaderboards'
            }).then((response) => {
                console.log('response', response);
                this.leaderboardInfo = response.data;
                console.log(this.leaderboardInfo);
            }, (error) => {
                console.log(error);
            }).then(() => {
                for (let i = 0; i < this.leaderboardInfo.length; i++) {
                    this.usernames.push(this.leaderboardInfo[i].username);
                    this.wins.push(this.leaderboardInfo[i].wins);
                    this.losses.push(this.leaderboardInfo[i].losses);
                    this.goals_made.push(this.leaderboardInfo[i].goals_made);
                    this.games_played.push(this.leaderboardInfo[i].games_played);
                }
                console.log('usernames', this.usernames)
            })
        };
    })
    .component('menu', {
        bindings : {
        },
        controller : 'menuCtrl',
        templateUrl : '/templates/menu.html'

    });