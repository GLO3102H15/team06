define([
    'jquery',
    'underscore',
    'backbone',
    'vm'
], function ($, _, Backbone, Vm) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'tvshow/:id': 'homeTVShow',
            'actor/:id': 'homeActor',
            'movie/:id': 'homeMovie',
            'watchlist': 'homeWatchlists',
            'watchlist/:id': 'homeOneWatchlist'
        }
    });

    var initialize = function(options){
        var appView = options.appView;
        var router = new AppRouter(options);
        router.on('route:home', function () {
            require(['views/homeView'], function (HomeView) {
                var homeView = Vm.create(appView, 'HomeView', HomeView);
                homeView.render();
            });
        });
        router.on('route:homeTVShow', function (id) {
            require(['views/tvshow/tvshowMainView'], function (TvShowMainView) {
                var tvShowView = Vm.create(appView, 'TvShowView', TvShowMainView);
                tvShowView.render(id);
            });
        });
        router.on('route:homeActor', function (id) {
            require(['views/actor/actorMainView'], function (ActorMainView) {
                var actorView = Vm.create(appView, 'ActorView', ActorMainView);
                actorView.render(id);
            });
        });
        router.on('route:homeMovie', function (id) {
            require(['views/movie/movieMainView'], function (MovieMainView) {
                var movieView = Vm.create(appView, 'MovieView', MovieMainView);
                movieView.render(id);
            });
        });
        router.on('route:homeWatchlists', function () {
            require(['views/watchlist/watchlistMainView'], function (WatchlistsMainView) {
                var watchlistsView = Vm.create(appView, 'WatchlistView', WatchlistsMainView);
                watchlistsView.render();
            });
        });
        router.on('route:homeOneWatchlist', function () {
            require(['views/watchlist/watchlistMainView'], function (WatchlistMainView) {
                console.log("this is a watchlist");
            });
        });
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
