const songname = document.getElementById("songname");
const bandname = document.getElementById("bandname");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const back = document.getElementById("back");
const currentprogress = document.getElementById('current-progress');
const progresscontainer = document.getElementById('progresscontainer');
 
const napista = {
    songname: "Na pista",
    artist: "Thehc Mc,Aka Far",
    file: "Na pista",
};
const Lucidez = {
    songname: "Lucidez",
    artist: "Thehc Mc",
    file: "Lucidez",
};
const Minhalevada = {
    songname: "Minha levada",
    artist: "Thehc Mc",
    file: "Minha levada",
};


let IsPlaying = false;
const playlist = [napista, Lucidez, Minhalevada];
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
    cover.src = `./imagens/${playlist[index].file}.jpg`;
    song.src = `./songs/${playlist[index].file}.mp3`;
    songname.innerText = playlist[index].songname;
    bandname.innerText = playlist[index].artist;
}

function backsong() {
    if (index === 0) {
        index = playlist.length - 1;
    }
    else {
        index -= 1;
    }
    inicializarmusica();
    playsong();
}


function nextsong() {
    if (index === playlist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    inicializarmusica();
    playsong();
}

function UpdateProgressBar() {
    const barWidth = (song.currentTime/song.duration)*100;
    currentprogress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event){
   const width = progresscontainer.clientWidth;
   const clickposition = event.offsetX 
   const jumpToTime = (clickposition/width)* song.duration;
   song.currentTime = jumpToTime;
}

inicializarmusica();

play.addEventListener('click', playPausedecider);
back.addEventListener("click",backsong);
next.addEventListener("click",nextsong);
song.addEventListener('timeupdate',UpdateProgressBar);
progresscontainer.addEventListener('click',jumpTo);
