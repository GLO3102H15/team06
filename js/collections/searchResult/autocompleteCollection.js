define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var AutocompleteCollection = Backbone.Collection.extend({
        initialize: function(text){
                this.url = 'https://itunes.apple.com/search?term=' + text;
        },
        parse: function(response) {
            var result = $(response)[0].results.filter(function (i,n){return i.kind ==="feature-movie" ||
                                                            i.kind ==="tv-episode" ||
                                                            i.kind === "artist"});
            return result;
        }
    });
    return AutocompleteCollection;
});