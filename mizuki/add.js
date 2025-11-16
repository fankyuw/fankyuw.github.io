var imagePaths = []
var imageExt = ["png","jpg","webp"]

const imgNode = document.createElement("img")
imgNode.setAttribute("style","width:300px;")
imgNode.setAttribute("id","popupImage")
const divNode = document.createElement('div')
divNode.setAttribute("class","image")

function getImages(classname) {
    const imgs = document.getElementsByClassName(classname)
    console.log(imgs)

    for (var i = 0; i < imgs.length; i++) {
        // console.log(imgs.item(i))
        var element = imgs.item(i)

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        // async function getImages(classname) {
        //     return document.getElementsByClassName(classname)
        // }
        var img = element.childNodes.item(2)
        var caption = element.childNodes.item(0);
        var modal = element.childNodes.item(3)
        var modalImg = modal.childNodes.item(0)
        var captionText = modal.childNodes.item(1)



        console.log(captionText)
        img.onclick = function(){
            captionText.innerText = caption.innerText
            console.log(img)
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
        
        modal.onclick = function(){
            modal.style.display = "none";
        }
        modalImg.addEventListener('click', (event) => {
            event.stopPropagation()
        })
        // Get the <span> element that closes the modal

        // When the user clicks on <span> (x), close the modal
    }
}


$.ajax({
    url:"/mizuki/cards/",
    success:function(data){
        imagePaths = []
        imageExt.forEach(element => {
            $(data).find(`a:contains(.${element})`).each(function(){
                imagePaths.push($(this).attr("href"))
            })
        });
        imagePaths.forEach(element =>{
            const currentDiv = document.getElementById("mizukis").appendChild(divNode.cloneNode())
            var newPath = element.replaceAll("\\mizuki\\cards\\","")
            var newText = newPath.replaceAll("%20"," ")
            newText = newText.replaceAll("_"," ")
            newText = newText.replaceAll(".webp"," ")
            currentDiv.innerHTML = newText
            currentDiv.appendChild(document.createElement("br"))
            const currentImgNode = currentDiv.appendChild(imgNode.cloneNode())
            currentImgNode.setAttribute("src",`/mizuki/cards/${newPath}`)
            
            const modal = currentDiv.appendChild(document.createElement("div"))
            modal.setAttribute("id","myModal")
            modal.setAttribute("class","modal")

            
            const modalContent = modal.appendChild(document.createElement("img"))
            modalContent.setAttribute("class","modal-content")
            modalContent.setAttribute("id","img01")

            const caption = modal.appendChild(document.createElement("h1"))
            caption.innerText = newText
            caption.setAttribute("class","caption-text")
        })
        getImages("image")
    }
})
console.log('hi')
