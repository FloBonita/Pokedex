const mongoose = require('mongoose');
const request = require('request');
// const Post = mongoose.model('Post');

exports.index = async (req, res)=>{
    let responseJson = {
        pageTitle: "Inicio -"
    };

    // const posts = await Post.find();
    // responseJson.posts = posts;

    res.render('home', responseJson);
},

exports.pokemons = (req, res) => {



}