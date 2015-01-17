/* Profile Website   */
/* by Brian Cottrell */
/* 01-09-2015        */

/*VARIABLES*/
var sites,          //An array to store information about each site to display
    siteInfo,       //Contains stored information about each site
    siteCount,      //Total number of sites to display
    radius,         //Radius of each site element
    offset,         //Offset distance between each site element
    start,          //Keeps track of the javascript timer
    sequence,       //Keeps track of animation sequences
    steps,          //Number of steps in an animation sequence
    growSteps,      //Number of steps to transition a site element to grow to fullscreen 
    rotationSteps,  //Number of steps for site elements to circle around the display
    spacing,        //Spacing between site elements when loading the display
    selectedSite,   //Stores the currently seleced site
    xInterval,      //Interval for incrementing the x position during select animation
    yInterval,      //Interval for incrementing the y position during select animation
    savedText,      //Stores the current default text for the info section
    savedBorder,    //Stores the original border color when it is changed
    fontSize;       //Sets the font size of all text

/*FUNCTIONS*/
//This sets the parameters for the display page when the site loads
function setPage(num, siteClass, container){
    sites       = [];                   //Initialize the site array
    siteCount   = num;                  //Indicates the number of sites to display
    radius      = 12.5-0.75*siteCount;  //Each site radius depends on the number of sites
    offset      = 12.25+0.75*siteCount; //The offset also depends on the number of sites
    sequence    = 0;                    //Set animation sequence to 0 before starting
    steps       = 100;                  //Number of steps for first animation sequence
    growSteps   = 50;                   //Number of steps for fullsreen transition
    spacing     = 2.25;                 //Spacing between sites for display animation
    rotationSteps = 120;                //Number of steps for ratation transition
    sites.length = siteCount;           //Set length of site array
    //Adjust the font size to based on screen width
    fontSize = Math.round((document.getElementsByClassName('info')[0].offsetWidth-40)/12.5);
    //Set up the information section
    document.getElementsByClassName('info')[0].style.fontSize = fontSize+'px';
    document.getElementsByClassName('button-container')[0].style.fontSize = fontSize+'px';
    document.getElementsByClassName('info')[0].innerHTML = getInfoText()[0];
    for(var i = 0; i < document.getElementsByClassName('button').length; i++){
        document.getElementsByClassName('button')[i].addEventListener('mouseover', addFocus);
        document.getElementsByClassName('button')[i].addEventListener('mouseleave', unFocus);
    }
    document.getElementsByClassName('button')[0].addEventListener('click', function(){
        document.getElementsByClassName('info')[0].innerHTML = getInfoText()[0];
    });
    document.getElementsByClassName('button')[1].addEventListener('click', function(){
        document.getElementsByClassName('info')[0].innerHTML = getInfoText()[1];
    });
    document.getElementsByClassName('button')[2].addEventListener('click', function(){
        document.getElementsByClassName('info')[0].innerHTML = getInfoText()[2];
    });
    //For each site create and add a circular html element with the specified properties
    for(var i = 0; i < sites.length; i++){
        sites[i] = document.createElement('div');
        sites[i].classList.add(siteClass);
        sites[i].style.padding = radius+'%';
        sites[i].style.marginTop = -radius+'%';
        sites[i].style.marginLeft = steps+0.75*siteCount*i+'%';
        sites[i].style.background = 'url('+siteInfo[i].image+')';
        sites[i].style.backgroundColor = 'rgb(255, 255, 255)';
        sites[i].style.backgroundSize = 'contain';
        sites[i].style.backgroundRepeat = 'no-repeat';
        container.appendChild(sites[i]);
    }
    sites[0].style.background = siteInfo[0].image;
}
//Animated the sites to move onto the page from the right into a circle arrangement
function animateDisplay(){
    var offestPos,                      //The site offset based on its position in the array
        endPos;                         //The final position of each site element
    //For each site in the site array   
    for(var i = 0; i < sites.length; i++){
        //First animate the sites to line up and pass into the page from the left 
        if(sequence <= steps+(radius*spacing)*i){
            sites[i].style.marginLeft = steps+(radius*spacing)*i-sequence+'%';
        //Once a site reaches to edge of the display move it along the display circle
        }else{
            endPos = i*2*Math.PI/sites.length;
            offsetPos = 2*Math.PI*(steps-sequence-i)/(rotationSteps+i);
            sites[i].style.marginTop = offset*Math.sin(endPos+offsetPos)-radius+'%';
            sites[i].style.marginLeft = offset*Math.cos(endPos+offsetPos+Math.PI)+offset+'%';
            //Add event listeners to each site element once the animation reaches its end
            if(sequence == steps+rotationSteps){
                sites[i].addEventListener('click', selectSite);
                sites[i].addEventListener('mouseover', displaySiteInfo);
                sites[i].addEventListener('mouseleave', removeSiteInfo);
            }
        }
    }
    sequence++;
    //End the timer when the animation reaches the total number of steps
    if(sequence > steps+rotationSteps){
        clearInterval(start);
    }  
}
//This runs whenever a site element is clicked
function selectSite(){
    //Prevent any other sites from being clicked
    for(var i = 0; i < sites.length; i++){
        sites[i].removeEventListener('click', selectSite);
    }
    sequence    = 0;                    //Reset the animation sequence number
    steps       = 50;                   //Set the number of move steps
    selectedSite= sites.indexOf(this);  //Store the position index of the selected site
    this.style.zIndex = '1';
    //Set the x and y move intervals for each step in the animation
    xInterval   = offset*Math.cos(selectedSite*2*Math.PI/sites.length)/steps;
    yInterval   = offset*Math.sin(selectedSite*2*Math.PI/sites.length)/steps;
    start = setInterval(animateSite, 3);
}
//Moves selected site to the center of the page enlarges it and then redirects to the site
function animateSite(){
    //First animate the site element to move to the center of the page
    if(sequence <= steps){
        sites[selectedSite].style.marginTop = -1*radius+(steps-sequence)*yInterval+'%';
        sites[selectedSite].style.marginLeft = offset-(steps-sequence)*xInterval+'%';
    //Then animate the site element to grow until it covers the screen
    }else{
        sites[selectedSite].style.padding = radius+(sequence-growSteps)*0.8+'%';
        sites[selectedSite].style.marginTop = growSteps*0.8-radius-sequence*0.8+'%';
        sites[selectedSite].style.marginLeft = offset-sequence*0.8+growSteps*0.8+'%';
    }
    sequence++
    //End the timer and redirect to the site when the animation finishes
    if(sequence > steps+growSteps){
        clearInterval(start);
        window.location.href = siteInfo[selectedSite].url;
    }
}
//Displays information about the currently selected site in the info section
function displaySiteInfo(){
    var currentSite = siteInfo[sites.indexOf(this)];
    var text = '<strong>'+currentSite.name+'</strong>'+'<br/>'+currentSite.description;
    savedText = document.getElementsByClassName('info')[0].innerHTML
    savedBorder = this.style.border;
    document.getElementsByClassName('info')[0].innerHTML = text;
    this.style.border = '2px solid yellow';
}
//Returns the contents of the info section to its previous state
function removeSiteInfo(){
    if(savedText){
        document.getElementsByClassName('info')[0].innerHTML = savedText;
    }else{
        document.getElementsByClassName('info')[0].innerHTML = getInfoText()[0];
    }
    this.style.border = savedBorder;
}
//Changes the color of an elements when during a mouse over event
function addFocus(){
    this.style.color = 'rgb(200,200,200)';
    this.style.backgroundColor = 'rgb(100,100,100)';
}
//Restores the original color when the mouse leaves an element
function unFocus(){
    this.style.color = 'rgb(100,100,100)';
    this.style.backgroundColor = 'transparent';
}
//Redraws the display and adjusts the proportins when the window is resized
window.onresize = function(event){
    fontSize = Math.round((document.getElementsByClassName('info')[0].offsetWidth-40)/12.5);
    document.getElementsByClassName('info')[0].style.fontSize = fontSize+'px';
    document.getElementsByClassName('button-container')[0].style.fontSize = fontSize-1+'px';
}

/*PROGRAM*/
siteInfo = getSiteList();
setPage(siteInfo.length, 'site', document.getElementsByClassName('site-container')[0]);
start = setInterval(animateDisplay, 5);
