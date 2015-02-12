/* Profile Website   */
/* by Brian Cottrell */
/* 01-11-2015        */

//Returns information about a list of websites
function getSiteList(){
    var siteInfo = [
        {
            name: 'Pathfinding Challenge',
            url: 'http://damp-falls-4815.herokuapp.com',
            image: 'images/site1.png',
            description: 'The goal of this site is to crowd source a solution to the traveling salesman math problem.'
        },
        {
            name: 'Business Guide',
            url: 'http://predict-app.herokuapp.com',
            image: 'images/site2.png',
            description: 'Built within a group of four, this site provides a location based assessment for a proposed business.'
        },
        {
            name: 'Novel Endings',
            url: 'http://limitless-peak-5524.herokuapp.com',
            image: 'images/site3.png',
            description: 'This site allows any number of authors to contribute to a single story.'
        },
        {
            name: 'Fandango Discovery',
            url: 'http://briancottrell.github.io/fandango-discovery',
            image: 'images/site4.png',
            description: 'Created as an entry for the NBCUniversal 24 hour hackathon, this site provides a set of movie related challenges and rewards.'
        },
        {
            name: '3D Tic-Tac-Toe',
            url: 'http://briancottrell.firebaseapp.com',
            image: 'images/site5.png',
            description: 'By bringing tic-tac-toe into the third dimension, the game requires more strategy and ties are not possible on a 3x3x3 board.'
        },
        {
            name: 'Browser Apps',
            url: 'http://briancottrell.github.io/browser-apps',
            image: 'images/site6.png',
            description: 'A collection of simple applications to run in a web browser.'
        },
        // {
        //     name: 'Pathfinding Challenge',
        //     url: 'http://damp-falls-4815.herokuapp.com',
        //     image: 'images/site1.png',
        //    description: ''
        // },
        // {
        //     name: 'Pathfinding Challenge',
        //     url: 'http://damp-falls-4815.herokuapp.com',
        //     image: 'images/site1.png',
        //    description: ''
        // },
        {
            name: 'Connected Tic-Tac-Toe',
            url: 'http://briansproject1.firebaseapp.com/',
            image: 'images/site7.png',
            description: 'An expanded variation of tic-tac-toe playable across a network.'
        }
    ];
    return siteInfo;
}