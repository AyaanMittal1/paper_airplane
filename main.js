status1=false;
video="";
objects=[];
cofedence=0;
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(325,250);
    canvas.center();
}
function draw(){
    image(video, 0,0,325,250);
    if(status1 == true){
        cocoSSD.detect(video,got_results);
        stroke(random(1,255),random(1,255),random(1,255));
        for(i=0; i<objects.length; i++){
            cofedence=(objects[i].confidence*100).toFixed(2);
            fill(random(1,255),random(1,255),random(1,255));
            text(objects[i].label+" "+cofedence+"%",objects[i].x+10,objects[i].y+10);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function got_results(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
    document.getElementById("status").innerHTML="Video has loaded";
}
function start(){
    cocoSSD=ml5.objectDetector("cocossd",model_ready);
    document.getElementById("status").innerHTML="loding Video";
}
function model_ready(){
    console.log("model has loaded");
    video.loop();
    video.speed(1);
    video.volume(1);
    status1=true;
}
function change_speed(){
    speed=document.getElementById("speed").value;
    document.getElementById("slider_value").innerHTML=speed;
    video.speed(speed);
}