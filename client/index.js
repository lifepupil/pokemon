/* global pokedex:true */
/* jshint camelcase:false */

'use strict';

$(document).ready(init);

function init() {
  drawPokedex();
  // Event delegation is an important concept for situations like this where there are MANY divs to click
  // e.g. BAD ---> $('.pokemon').on('click', getPokemon);
  $('#pokedex').on('click', '.pokemon', getPokemon);
}



function getPokemon(){
  // TEST THAT THIS FUNCTION IS BEING CALLED PROPERLY
  // alert('it works!');
  // To make sure that $this is accessible to every function in this function we do this
  var $self = $(this);

  var domain = 'http://pokeapi.co/';
  // EITHER OF THE NEXT TWO LINES WILL WORK
  // var uri = $(this).attr('data-uri');
  var uri = $(this).data('uri');

  var URL = domain + uri;
  $.getJSON(URL, function(response) {

    var spriteURLs = response.sprites.map(function(o){
      return domain + o.resource_uri;
    });

    // console.log(spriteURLs);
    spriteURLs.forEach(function(url){
      $.getJSON(url, function(response) {

        $self.children('.image').css('background-image', 'url("'+domain + response.image+'")');
        console.log($self,response.image);
      })
    });
  });

}

function drawPokedex() {
  pokedex.pokemon.forEach(function(pokemonObj) {
    // console.log(pokemon);
    var $outer = $('<div>');
    var $name = $('<div>');
    var $image = $('<div>');

    $outer.addClass('pokemon');
    $outer.attr('data-uri', pokemonObj.resource_uri);
    $name.addClass('name');

    $name.text(pokemonObj.name);
    $image.addClass('image');

    $outer.append($name, $image);
    $('#pokedex').append($outer);

  });


  // var $pokemonCharacter = $('<div>');
  // $pokemonCharacter.addClass('pokemon').attr('name', pokedex.pokemon[0].name);
  // var $pokemonName = $('<div>');
  //
  // $('#pokedex').append($pokemonCharacter);


  // pokedex.pokemon[0].name
  // pokedex.pokemon[0].resource_uri
}
