const songname = document.getElementById("songname");
const bandname = document.getElementById("bandname");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const back = document.getElementById("back");
const currentprogress = document.getElementById('currentprogress');
const progresscontainer = document.getElementById('progresscontainer');
const shuffleButton = document.getElementById('embaralhar');
const repeatButton = document.getElementById('repeat');


const napista = {
    songname: "Na pista",
    artist: "-Thehc Mc,Aka Far-",
    file: "Na pista",
};
const Lucidez = {
    songname: "Lucidez",
    artist: "-Thehc Mc-",
    file: "Lucidez",
};
const Minhalevada = {
    songname: "Minha levada",
    artist: "-Thehc Mc-",
    file: "Minha levada",
};


let IsPlaying = false;
let isShuffled = false
const originalPlaylist = [napista, Lucidez, Minhalevada];
let sortedPlaylist = [...originalPlaylist];
let index = 0;


function playsong() {
    play.querySelector('.bi').classList.remove('bi-play-circle')
    play.querySelector('.bi').classList.add('bi-pause-circle')
    song.play();
    IsPlaying = true
}
function pausesong() {
    play.querySelector('.bi').classList.add('bi-play-circle')
    play.querySelector('.bi').classList.remove('bi-pause-circle')
    song.pause();
    IsPlaying = false
}



function playPausedecider() {
    if (IsPlaying === true) {
        pausesong();
    }
    else {
        playsong();
    }
}

function inicializarmusica() {
    cover.src = `./imagens/${sortedPlaylist[index].file}.jpg`;
    song.src = `./songs/${sortedPlaylist[index].file}.mp3`;
    songname.innerText = sortedPlaylist[index].songname;
    bandname.innerText = sortedPlaylist[index].artist;
}

function backsong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    inicializarmusica();
    playsong();
}


function nextsong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    inicializarmusica();
    playsong();
}

function UpdateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentprogress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event) {
    const width = progresscontainer.clientWidth;
    const clickposition = event.offsetX
    const jumpToTime = (clickposition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active')
    }
    else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active')
    }
}

function repeatButtonClicked(){
    
}

inicializarmusica();

play.addEventListener('click', playPausedecider);
back.addEventListener("click", backsong);
next.addEventListener("click", nextsong);
song.addEventListener('timeupdate', UpdateProgressBar);
progresscontainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
