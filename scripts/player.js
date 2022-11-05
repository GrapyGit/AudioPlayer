const jsmediatags = window.jsmediatags;
let dropZone = document.getElementById("drop"),
 array = [],img = true,ps = true
let progress =  document.getElementById("progress")
let audio= new Audio();
let numb = -1
let deg = 1;
let col = 1
let filters = []
let volue
let context,
    source,
    mus = true,
    click=false,
    x =-10,
    analyser,
    time = document.getElementById("time")
var canvas = document.getElementById("myCanvas")
var bounds = canvas.getBoundingClientRect()
var ctx = canvas.getContext("2d")
canvas.width = 1024 //+ "px"
canvas.height =720 //+ "px"
document.oncontextmenu = ()=>{return false}
document.getElementById("equalizer").addEventListener("transitionend", () => {
    if (document.getElementById("equalizer").style.height !== "0%") {
        document.getElementById("equalizer").style.height = "100%"
    }
});
document.getElementById("defolt").onclick = ()=>{
    sliders.forEach((item, i)=>{
       if  (i <= sliders.length-2) {
       item.value = 0
       filters[i].gain.value = 0
       }
    })
}
const fileSelector = document.getElementById('file-selector');

  fileSelector.addEventListener('change', (e) => {
    let n = 0
        for (let i=0; i<e.target.files.length; i++){
            //if (e.target.files[i].kind == "file" && e.target.files[i].type=='audio/mpeg') {
            n++
            let track = document.createElement("p");
            track.className = "lolo"
            let img = document.createElement("img")
            img.style.width = 3+"%"
            img.style.position = "absolute"
            img.style.right = 3+"%"
            img.style.height ="auto"
            img.src = "img/delete.png"
            array.push(e.target.files[i])
            track.innerHTML = array[array.length-1].name.split('.')[0];
            track.appendChild(img)
            document.getElementById("drop").appendChild(track);	   
       // }
    }
        document.getElementById("b").style.display= "none"
    if (numb == -1 && n!=0) {
        context = new AudioContext();
        analyser = context.createAnalyser();
        sliders = Array.from(sliders)
        audio.volume = 0.5;
        analyser.fftSize = 256;
        source = context.createMediaElementSource(audio);
        analyser.smoothingTimeConstant = 0.2;
        equalize(audio)
        analyser.connect(context.destination);
        frequencyArray = new Uint8Array(analyser.frequencyBinCount);
        startAnimate()
for (let i=0; i<sliders.length-2;i++){
    sliders[i].addEventListener('change', (e)=>{
        filters[i].gain.value = e.target.value
    },false)
    sliders[i].addEventListener('input', (e)=>{
        filters[i].gain.value = e.target.value
    },false)
}

        audio.src = URL.createObjectURL(array[0]);
        audio.play()
        metaData(array[0])
        document.getElementsByClassName("lolo")[0].style.color = "white"
        numb++
    }
  })
  
  
  
  
var createFilter = function(frequency){
    var filter = context.createBiquadFilter();
    filter.type = 'peaking'
    filter.frequency.value = frequency
    filter.Q.value = 1
    filter.gain.value = 0
    return filter;
  }
  var createFilters = ()=>{
      var frequencies = [65,160,400,1000,2500,6000,14000]
      filters = frequencies.map(createFilter)
      filters.reduce((prev,curr)=>{
          prev.connect(curr)
          return curr
      }) 
      return filters
  }
  var equalize = (audio)=>{
      filters = createFilters()
      source.connect(filters[0])
      filters[filters.length -1].connect(analyser)
  }
timeConvert = (time)=>{
 let m 
 m = parseInt((time/60))
 time = time - m*60
 time = Math.round(time) + ""
 if (time.length==1) time = "0"+time
 time = m+":"+ time
 return time
}
progress.onclick = pere
progress.onmousemove = ()=>{
    time.style.display = "block"
    let i = 0
    let w = progress.offsetWidth
    let ww
    ww = (100*event.offsetX)/w
    ww = audio.duration/100 * ww
    time.textContent = timeConvert(ww)
    if (event.offsetX -((time.offsetWidth/time.textContent.length)*time.textContent.split(":")[0].length)<0){
        time.style.left = 0+"px"
     } 
     else {
     if (event.offsetX + time.offsetWidth-((time.offsetWidth/time.textContent.length)*time.textContent.split(":")[0].length)>w)
     i = event.offsetX + time.offsetWidth-((time.offsetWidth/time.textContent.length)*time.textContent.split(":")[0].length) - w
     time.style.left =  event.offsetX- i  - ((time.offsetWidth/time.textContent.length)*time.textContent.split(":")[0].length)+ "px"
     }
     if (click){
        document.getElementById("value").style.width = (100*event.offsetX)/w + "%"
    }
}
    progress.onmouseleave =() =>{
    time.style.display = "none"
    if (click){
       click = false
       if (ps) audio.play()
    }
}
progress.onmousedown = () =>
{
    audio.pause()
    click = true
}
progress.onmouseup =()=>{
    if (ps) audio.play()
    click = false
    //pere()
}
progress.onmouseover = ()=>{
    if (click){
        time.style.display = "block"
    }
  else time.style.display = "none"
}
let sliders = document.getElementsByClassName("slider")

dropZone.ondragover = e => {
    e.preventDefault();
}

dropZone.ondrop = e => {
    e.preventDefault();
    let n = 0
        for (let i=0; i<e.dataTransfer.files.length; i++){
            if (e.dataTransfer.items[i].kind == "file" && e.dataTransfer.items[i].type=='audio/mpeg') {
            n++
            let track = document.createElement("p");
            track.className = "lolo"
            let img = document.createElement("img")
            img.style.width = 3+"%"
            img.style.position = "absolute"
            img.style.right = 3+"%"
            img.style.height ="auto"
            img.src = "img/delete.png"
            array.push(e.dataTransfer.items[i].getAsFile())
            track.innerHTML = array[array.length-1].name.split('.')[0];
            track.appendChild(img)
            document.getElementById("drop").appendChild(track);	   
        }
    }
        document.getElementById("b").style.display= "none"
    if (numb == -1 && n!=0) {
        context = new AudioContext();
        analyser = context.createAnalyser();
        sliders = Array.from(sliders)
        audio.volume = 0.5;
        analyser.fftSize = 256;
        source = context.createMediaElementSource(audio);
        analyser.smoothingTimeConstant = 0.2;
        equalize(audio)
        analyser.connect(context.destination);
        frequencyArray = new Uint8Array(analyser.frequencyBinCount);
        startAnimate()
for (let i=0; i<sliders.length-2;i++){
    sliders[i].addEventListener('change', (e)=>{
        filters[i].gain.value = e.target.value
    },false)
    sliders[i].addEventListener('input', (e)=>{
        filters[i].gain.value = e.target.value
    },false)
}

        audio.src = URL.createObjectURL(array[0]);
        audio.play()
        metaData(array[0])
        document.getElementsByClassName("lolo")[0].style.color = "white"
        numb++
    }
}

function startAnimate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    analyser.getByteFrequencyData(frequencyArray);
    
    for (let i = 0; i < frequencyArray.length; i++) {
    y = frequencyArray[i]
    x+=10
    Render(x,y*2)
    }
    x = -10
    if (ps){
        if (col)
            deg+=3
        else
            deg-=3
    if (deg>=256) col=0
    if (deg<=0) col=1
    document.getElementById("value").style.background = 'linear-gradient(90deg, rgb(255, 0, '+(256-deg)+'), rgb(255, 0, '+deg+'))';
    }
    else  
    document.getElementById("value").style.background = '#e839dc'
    requestAnimationFrame(startAnimate);
}
 function Render(x,y){
    ctx.strokeStyle = 'rgb('+parseInt(256-(x/10))+', 41, '+parseInt(x/3)+ ')';//251
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,y);
    ctx.lineWidth = 5
    ctx.stroke();
 }

function pause(){
    if (ps){
        document.getElementById("ps").src = "img/play.png"
        ps = false
        audio.pause()
    }else{
        document.getElementById("ps").src = "img/pause.png"
        ps = true
        audio.play()
    }
}
document.getElementById("off").onclick = function(){
    console.log("uhti")
    if (img){
        document.getElementById("off").src = "img/volume-disabled.png"
        volue = audio.volume
        audio.volume = 0
        sliders[sliders.length-1].value = 0
         img = false
         }else {
            document.getElementById("off").src = "img/sound-on.png"
            audio.volume = volue
            sliders[sliders.length-1].value = volue*100
         img = true
         }
}
document.getElementById("drop").onclick =function(event){
    let arr = document.getElementsByClassName("lolo")
    let i = 0
    if (event.target.localName =="p"){
    document.getElementById("name").innerHTML = event.target.textContent
    for (i; i<arr.length; i++){
        if (arr[i] === event.target) break;
      }
      arr[numb].style.color='#f4681d'
      numb = i-1
      audio.onended()
    }
    else{
        console.log(event.path[1])
     for (i; i<arr.length; i++){
        if (arr[i] === event.path[1]){
        array.splice(i,1)
      if (numb>i) numb--
      event.path[1].parentNode.removeChild(event.path[1]); break;
        }
      }
      
    }
}

function pere(){
    let w = this.offsetWidth
    let o = event.offsetX
    document.getElementById("value").style.width = (100*o)/w + "%"
    audio.currentTime = audio.duration/100 * (100*o)/w
}

function equalizer(){
    if (document.getElementById("up").style.display == "none"){
    document.getElementById("up").style.display = "grid"
    document.getElementById("equalizer").style.height = 0 + "%"
    }else{
        document.getElementById("up").style.display = "none"
       document.getElementById("equalizer").style.height = 100 + "%"
    }
}
audio.ontimeupdate = ()=>{
    document.getElementById("value").style.width = (audio.currentTime/audio.duration)*100 + "%"
   // console.log(document.getElementById("value").style.background)
    document.getElementById("timeEnd").textContent = timeConvert(audio.currentTime)+"/"+timeConvert(audio.duration)
}

audio.onended = ()=>{
    numb++
    var name
    if (numb > array.length-1) numb = 0
    if (numb<0) numb = array.length-1
    name = document.getElementsByClassName("lolo")
    if (mus){
        name[numb].style.color='white'
        if (numb == 0)
        name[array.length-1].style.color='#f4681d'
        else
        name[numb-1].style.color='#f4681d'
    }
    else{
        name[numb].style.color='white'
        if (numb == array.length-1) name[0].style.color='#f4681d' 
        else name[numb+1].style.color='#f4681d'
        mus = true
    }
    audio.src = URL.createObjectURL(array[numb])
    audio.play()
    metaData(array[numb])
    document.getElementById("name").innerHTML = name[numb].textContent
}

let next = ()=>{
    if (array.length !=1)
    audio.onended()
}
let back = ()=>{
    if (array.length !=1){
    numb=numb-2
    mus = false
    audio.onended()
    }
}
sliders[7].addEventListener('change', (e)=>{
    audio.volume =  e.target.value/100
    if (!img){
    volue = audio.volume
    document.getElementById("off").onclick()
    }
},false)

sliders[7].addEventListener('input', (e)=>{
    audio.volume = e.target.value/100
    if (!img){
        volue = audio.volume
        document.getElementById("off").onclick()
        }
},false)



metaData = (file)=>{

jsmediatags.read(file,{
onSuccess: (tag)=>{
    console.log(tag.tags.picture)
if (tag.tags.picture){
const data = tag.tags.picture.data
const format = tag.tags.picture.format
let base64String=""

for(let i =0; i<data.length;i++)
base64String += String.fromCharCode(data[i])

document.getElementById("viz").style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`
}
},
onError: (error)=>{
    console.log(error)
}
}
)
}