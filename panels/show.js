
var panels = []
const panelExt = ["png","jpeg"]

const panelNode = document.createElement("img")
panelNode.setAttribute("class","panel")


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
            currentPanel.setAttribute("src",`/panels/panels/${newPath}`)
            // currentPanel.setAttribute("src",newText)
        })
    }
})