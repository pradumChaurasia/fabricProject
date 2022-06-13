
const initCanvas = (id)=>{
    return  new fabric.Canvas(id,{
        width:500,
        height:500,
        selection:false
        
    })
}
// canvas.renderAll()

const setBackground = (url,canvas)=>{
    fabric.Image.fromURL(url,(img)=>{
    canvas.backgroundImage = img

    canvas.renderAll()
})
}

const toggleMode = (mode)=>{

    if (mode===modes.pan){
        if(currentMode === modes.pan){
            currentMode = ""
        }
        else{
            currentMode = modes.pan
        }
    }
    else if(mode===modes.zoom){
        if(currentMode === modes.zoom){
            currentMode = ""
        }
        else{
            currentMode = modes.zoom
        }
    }
   
}

const setPanEvents = (canvas)=>{
    canvas.on("mouse:move",(event)=>{
        if (mousePressed && currentMode === modes.pan) {
         canvas.setCursor('grab')
         canvas.renderAll()
         const mEvent = event.e
         const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
         canvas.relativePan(delta)
     }
     })
     
     canvas.on("mouse:down",(event)=>{
         mousePressed=true
         if (currentMode === modes.pan){
         canvas.setCursor('crosshair')
         canvas.renderAll()
         }
     })
     
     
     canvas.on("mouse:up",(event)=>{
         mousePressed=false
         canvas.setCursor('default')
         canvas.renderAll()
     })
     

     canvas.on('mouse:wheel', (event)=> {
         if(mousePressed==false && currentMode === modes.zoom){
            canvas.setCursor('crosshair')
        var zooming = event.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** zooming;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
        event.e.preventDefault();
        event.e.stopPropagation();
        var vpt = this.viewportTransform;
        if (zoom < 400 / 1000) {
          vpt[4] = 200 - 1000 * zoom / 2;
          vpt[5] = 200 - 1000 * zoom / 2;
        } else {
          if (vpt[4] >= 0) {
            vpt[4] = 0;
          } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
            vpt[4] = canvas.getWidth() - 1000 * zoom;
          }
          if (vpt[5] >= 0) {
            vpt[5] = 0;
          } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
            vpt[5] = canvas.getHeight() - 1000 * zoom;
          }
         }
         
}
})

    }

  
    
const imgAdded = (e)=>{
    console.log(e)
    const inputelem = document.getElementById('myImg')
    const file = inputelem.files[0]
    
    
    // const canvCenter=canvas.getCenter()
    // const img = new fabric.Image({
    //     width:100,
    //     height:100,
    //     left:canvCenter.left,
    //     top:canvCenter.top,
    //     originX:'center',
    //     originY:'center',
    //     objectCaching:false,
    // })
    reader.readAsDataURL(file)
}






const canvas = initCanvas('canvas')
const svgState={}
let mousePressed = false;
let currentMode;
const modes={
    pan:'pan',
    zoom:'zoom',
}
// const group={}


const reader = new FileReader()



   
setBackground("https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",canvas)


setPanEvents(canvas)
// canvas.on("mouse:over",(e)=>{
//     console.log("e")
// })



const inputFile = document.getElementById("myImg")
inputFile.addEventListener("change",imgAdded)

reader.addEventListener("load",()=>{
    console.log(reader.result)

    fabric.Image.fromURL(reader.result,img=>{
        canvas.add(img)
        canvas.renderAll()
    })
})