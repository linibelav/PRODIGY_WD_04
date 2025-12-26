const canvas=document.getElementById('bgCanvas');
const ctx=canvas.getContext('2d');
let width=canvas.width=window.innerWidth;
let height=canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{width=canvas.width=window.innerWidth;height=canvas.height=window.innerHeight;});

const particles=[];
const particleCount=120;
class Particle{
    constructor(){this.x=Math.random()*width;this.y=Math.random()*height;this.vx=(Math.random()-0.5)*0.5;this.vy=(Math.random()-0.5)*0.5;this.size=Math.random()*2+1;this.color=`rgba(56,189,248,${Math.random()})`;}
    draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fillStyle=this.color;ctx.fill();}
    update(){this.x+=this.vx;this.y+=this.vy;if(this.x>width)this.x=0;if(this.x<0)this.x=width;if(this.y>height)this.y=0;if(this.y<0)this.y=height;}
}
for(let i=0;i<particleCount;i++){particles.push(new Particle());}
function connectParticles(){for(let i=0;i<particles.length;i++){for(let j=i;j<particles.length;j++){let dx=particles[i].x-particles[j].x;let dy=particles[i].y-particles[j].y;let distance=Math.sqrt(dx*dx+dy*dy);if(distance<100){ctx.beginPath();ctx.strokeStyle=`rgba(56,189,248,${1-distance/100})`;ctx.lineWidth=0.8;ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();}}}}
function drawGradientWave(){const gradient=ctx.createLinearGradient(0,0,width,height);gradient.addColorStop(0,'rgba(56,189,248,0.2)');gradient.addColorStop(1,'rgba(147,51,234,0.2)');ctx.fillStyle=gradient;ctx.beginPath();let yOffset=height/2+Math.sin(Date.now()/1000)*50;ctx.moveTo(0,height);ctx.lineTo(0,yOffset);for(let i=0;i<width;i++){ctx.lineTo(i,yOffset+Math.sin(i/50+Date.now()/1000*2)*30);}ctx.lineTo(width,height);ctx.closePath();ctx.fill();}
function animateParticles(){ctx.clearRect(0,0,width,height);drawGradientWave();particles.forEach(p=>{p.update();p.draw();});connectParticles();requestAnimationFrame(animateParticles);}
animateParticles();

const menuIcon=document.getElementById("menuIcon");
const navLinks=document.getElementById("navLinks");
menuIcon.addEventListener("click",()=>{navLinks.classList.toggle("active");});

document.querySelectorAll('.nav-links a').forEach(link=>{
    link.addEventListener('click',e=>{
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
        navLinks.classList.remove('active');
    });
});

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#home").classList.add("show");
});

const sections=document.querySelectorAll(".fade-in:not(#home)");
window.addEventListener("scroll",()=>{
    sections.forEach(section=>{
        if(section.getBoundingClientRect().top<window.innerHeight-100) section.classList.add("show");
    });
});

const typingElement=document.querySelector(".typing");
const words=["Web Developer","Front-End Enthusiast","UI/UX Designer"];
let i=0,j=0,isDeleting=false;
function type(){
    if(i>=words.length)i=0;
    let word=words[i];
    if(isDeleting){typingElement.textContent=word.substring(0,j--); if(j<0){isDeleting=false;i++;}}
    else{typingElement.textContent=word.substring(0,j++); if(j>word.length){isDeleting=true;j=word.length;}}
    setTimeout(type,isDeleting?50:150);
}
type();

const skillBars=document.querySelectorAll(".progress-bar");
window.addEventListener("scroll",()=>{
    const skillsSection=document.querySelector(".skills");
    if(skillsSection.getBoundingClientRect().top<window.innerHeight-100){
        skillBars.forEach(bar=>{bar.style.width=bar.dataset.percent;});
    }
});

document.getElementById("contactForm").addEventListener("submit",function(e){
    e.preventDefault();
    alert("Message sent! (Setup EmailJS for actual email sending)");
});
