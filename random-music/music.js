
// function loadFile(filepath) {
//     var result = null
//     var xmlHttp = new XMLHttpRequest()
//     xmlHttp.open("GET",filepath,false)
//     xmlHttp.send()
//     if (xmlHttp.status == 200) {
//         result = xmlHttp.responseText

//     }
//     return result
// }

let musicPaths = []
var musicExt = ["wav","mp3","flac","ogg"]
var musicFolders = ["music","beepbox-music"]
const audioNode = document.createElement("audio")
audioNode.setAttribute("controls","")
audioNode.setAttribute("style","height:40px;width:300px,-webkit-text-stroke: 0px black")
const audioSource = document.createElement("source")
const divNode = document.createElement('div')
divNode.setAttribute("class","audiotrack")

console.log(musicFolders)
musicFolders.forEach(folder =>{
    $.ajax({
        url:`/random-music/${folder}`,
        success:function(data){
            musicPaths = []
            musicExt.forEach(element => {
                $(data).find(`a:contains(.${element})`).each(function(){
                    musicPaths.push($(this).attr("href"))
                })
            });
            musicPaths.forEach(element => { 
                var newName = element.split(`\\random-music\\${folder}\\`).pop()
                const currentDiv = document.getElementById(folder).appendChild(divNode.cloneNode())
                currentDiv.innerHTML = newName
                currentDiv.appendChild(document.createElement("br"))
                const currentAudioNode = currentDiv.appendChild(audioNode.cloneNode())
                const currentAudioSource = currentAudioNode.appendChild(audioSource.cloneNode())
                currentAudioSource.setAttribute("src",element)
            }); 
            console.log('done')
        }
    })

})