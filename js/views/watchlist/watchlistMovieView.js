define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchlist/watchlistMovieTemplate.html',
    'text!templates/watchlist/watchlistEmptyTemplate.html',
    'models/watchlistMovie',
    'models/watchlistDeleteMovie'
], function($, _, Backbone, WatchlistMovieTemplate, WatchlistEmptyTemplate, WatchlistMovie, WatchlistDeleteMovie){
    var WatchlistMainView = Backbone.View.extend({

        template : _.template(WatchlistMovieTemplate),
        templateEmpty : _.template(WatchlistEmptyTemplate),
        el: '.content',

        initialize: function(){
            this.watchlistMovie = new WatchlistMovie({"watchlistId" : this.options.id});
        },

        render: function(){
            var that = this;
            this.watchlistMovie.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    if(response.toJSON().movies.length < 1) {
                        that.$el.html(that.templateEmpty({watchlistMovie: response.toJSON()}));
                    } else {
                        that.$el.html(that.template({watchlistMovie: response.toJSON()}));
                    }
                }
            })
        },
        deleteMovie: function(watchlistId, movieId){
            var movie = new WatchlistDeleteMovie({movieId : movieId, watchlistId:watchlistId});
            movie.destroy({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success:function(ret){
                    window.location.replace('#/watchlist');
                }
            })
        }
    });

    return WatchlistMainView;
});