var episodes = []

var requestEpisodesURL = 'https://raw.githubusercontent.com/Eclerini/Eclerini/main/json/episodes.json';

var requestEpisodes = new XMLHttpRequest();

requestEpisodes.open('GET', requestEpisodesURL);

requestEpisodes.responseType = 'json';
requestEpisodes.send();

requestEpisodes.onload = function() {
    episodes = requestEpisodes.response;
    addAll()
}


function addAll() {
    let divAllEpisodesAndSeasons = document.getElementById('allEpisodesAndSeasons')
    for (let numberOfSeason=0; numberOfSeason < episodes.length; numberOfSeason++) {
        addSeason(divAllEpisodesAndSeasons, episodes[numberOfSeason]["titleSeason"])

        let hrSeason = document.createElement('hr')
        hrSeason.className="hrSeason"
        divAllEpisodesAndSeasons.append(hrSeason)

        addBandeAnnonce(divAllEpisodesAndSeasons, episodes[numberOfSeason]["bandeAnnonce"])

        divAllEpisodesAndSeasons.append(document.createElement('hr'))

        const divAllEpisodes = document.createElement('div')
        divAllEpisodes.className="allEpisodesOfSeason"

        for (let numberOfEpisode=0; numberOfEpisode < episodes[numberOfSeason]["episodes"].length; numberOfEpisode++) {
            addOneEpisode(divAllEpisodes, episodes[numberOfSeason]["episodes"][numberOfEpisode])
        }
        divAllEpisodesAndSeasons.append(divAllEpisodes)
    }
}


function addSeason(div, titleSeason) {
    const h2TitleSeason = document.createElement('h2')
    h2TitleSeason.className="titleSeason"
    h2TitleSeason.innerText=titleSeason
    div.append(h2TitleSeason)
}


function addBandeAnnonce(divAll, bandeAnnonce) {
    const divBandeAnnonce = document.createElement('div')
    divBandeAnnonce.className = "bandeAnnonce"
    addContentOfVideo(divBandeAnnonce, bandeAnnonce)
    divAll.append(divBandeAnnonce)
}


function addOneEpisode(divAllEpisodes, episode) {
    const divEpisode = document.createElement('div')
    divEpisode.className = "episode"
    addContentOfVideo(divEpisode, episode)
    divAllEpisodes.append(divEpisode)
}


function addContentOfVideo(divAll, video) {
    const divDescriptif = document.createElement('div')
    divDescriptif.className='descriptif'

    const h4Titre = document.createElement('h3')
    h4Titre.innerText= video["titre"]
    divDescriptif.append(h4Titre)

    const h5SousTitre = document.createElement('h4')
    h5SousTitre.innerText = video["sousTitre"]
    divDescriptif.append(h5SousTitre)

    const h6Descrip = document.createElement('h5')
    h6Descrip.innerText = video["descriptif"]
    divDescriptif.append(h6Descrip)

    const divVideo = document.createElement('div')
    divVideo.className="div-video"

    const iframe = document.createElement('iframe')
    iframe.src=video["lienVideo"]
    iframe.title="Youtube video player"
    iframe.frameborder="0"
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen=true
    divVideo.append(iframe)

    divAll.append(divDescriptif)
    divAll.append(divVideo)
}