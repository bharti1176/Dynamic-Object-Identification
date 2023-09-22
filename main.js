
stats= "";
objects=[];
r=0
g=0
b=0

function setup()
{
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function draw()
{
    image(video,0,0,380,380)
    if(stats!="")
    {
        r=random(255)
        g=random(255)
        b=random(255)
        objectDetector.detect(video,gotResults)
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detected Objects"
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are :" + objects.length
            fill(r,g,b)
            percent=floor(objects[i].confidence*100)
            textSize(20)
            text(objects[i].label + " " + percent+ "%", objects[i].x+10,objects[i].y+20)
            noFill()
            strokeWeight(4)
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}

function modelloaded()
{
    console.log('model is initialized')
    stats=true
    
}
function gotResults(error,results)
{
    if (error)
    {
    console.error(error)
    }
    console.log(results)
    objects=results;
}
