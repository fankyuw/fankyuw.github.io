
var panels = []
const panelExt = ["png","jpeg"]

const panelNode = document.createElement("img")
panelNode.setAttribute("class","panel")
panelNode.setAttribute("id","popupImage")

function popPanel(classname) {
    const images = document.getElementsByClassName(classname)
    const modal = document.getElementById("modalContainer")
    const modalImg = document.getElementById("modalImage")
    const cross = document.getElementById("closeButton")
    var on = true
    function close() {
        on = true
        modalImg.style.height = "90%"
        modal.style.display = "none";
    }
    modal.onclick = function(){
        close()
    }
    cross.onclick = function(){
        close()
    }
    modalImg.onclick = function(){
        if (on) {
            on = false
            modalImg.style.height = "200%"
            modalImg.style.cursor = "zoom-out"
        }
        else {
            on = true
            modalImg.style.height = "90%"
            modalImg.style.cursor = "zoom-in"
        }
    }
    modalImg.addEventListener('click', (event) => {
        event.stopPropagation()
    })
    for (var i = 0; i < images.length; i++) {
        panel = images.item(i)
        console.log(panel)
        panel.onclick = function(){
            console.log(panel)
            modal.style.display = "block"
            modalImg.src = this.src
        }
    }

}

$.ajax({
    url:"/panels/panels/",
    success:function(data){
        panels = []
        panelExt.forEach(element =>{
            $(data).find(`a:contains(.${element})`).each(function(){
                panels.push($(this).attr("href"))
            })
        })
        console.log(panels)
        panels.forEach(element =>{
            const currentPanel = document.getElementById("panelContainer").appendChild(panelNode.cloneNode())
            console.log(element)
            var newPath = element.replaceAll("\\panels\\panels\\","")
            var newText = newPath.replaceAll("%5C","/")
            console.log(newText)
            currentPanel.setAttribute("src",`/panels/panels/${newText}`)
            // /panels/panels/
            // currentPanel.setAttribute("src",newText)
            popPanel("panel")
        })
    }
})