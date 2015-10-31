var app = app || {};

$(function(){

    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'tvshow': 'homeTVShow',
            'actor': 'homeActor'
        },

        setup: function () {
            app.menuView.render();
        },

        home: function(){
            this.setup();
            app.homeView.render();
        },

        homeTVShow: function(){
            this.setup();
            app.trailerEpisodeView.render();
            app.tvShowView.render();
            app.episodesView.render();

        },

        homeActor: function() {
            this.setup();
            app.actorMainView.render();
        }
        });
    app.router = new Router();
    Backbone.history.start();
});