 class Player{
        constructor(analyser,equalize,canvas){
            this.a = analyser,
            this.e = equalize
            this.canvas = canvas
        }	
    audio = new Audio()
    context
    analyser
    source
    equalize ={
        filters : [],
        createFilter : (frequency)=>{
        let filter = this.context.createBiquadFilter();
            filter.type = 'peaking'
            filter.frequency.value = frequency
            filter.Q.value = 1
            filter.gain.value = 0
            return filter;
        },
        createFilters : ()=>{
        let frequencies = [65,160,400,1000,2500,6000,14000]
        let filters = frequencies.map(this.equalize.createFilter)
            filters.reduce((prev,curr)=>{
                prev.connect(curr)
                return curr
            })
        return filters;
        },
        init : ()=>{
            this.equalize.filters =  this.equalize.createFilters()
           this.source.connect(this.equalize.filters[0])
           this.equalize.filters[(this.equalize.filters.length - 1)].connect(this.a?this.analyser:this.context.destination)
        }
    }
      play(){
        this.audio.volume = 0.8
        if (this.a || this.e){
        this.context  = new AudioContext();
        if (this.a){
        this.analyser = this.context.createAnalyser();
        this.analyser.connect(this.context.destination)
        }
        this.source = this.context.createMediaElementSource(this.audio);
        this.equalize.init()
        }
        this.audio.play()
        this.frequencyArray = new Uint8Array(analyser.frequencyBinCount);
      }
      startAnimat(){
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.analyser.getByteFrequencyData(this.frequencyArray);
        let y,x = -10
        for (let i = 0; i < this.frequencyArray.length; i++) {
        y = this.frequencyArray[i]
        x+=10
        Render(x,y*2)
        }
        requestAnimationFrame(this.startAnimat);
      }
    }

    let plaer = new Player(true,true)

    let dropZone = document.getElementById("drop")






    dropZone.ondragover = e => {
        e.preventDefault();
    }
    
    dropZone.ondrop = e => {
        e.preventDefault();
            for (let i=0; i<e.dataTransfer.files.length; i++){
                if (e.dataTransfer.items[i].kind == "file" && e.dataTransfer.items[i].type=='audio/mpeg') {
                plaer.audio.src = URL.createObjectURL(e.dataTransfer.items[i].getAsFile())
                plaer.play()
            }
        }
    }