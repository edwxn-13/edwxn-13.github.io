
class GameController
{
    constructor()
    {
        this.pressed = false;
        this.x = 0;
        this.y = 0;
        window.addEventListener("mousedown",(event) => this.mDown(event)); 
        window.addEventListener("mouseup", (event) => this.mUp(event)); 
        window.addEventListener("mousemove", (event) => this.mMove(event)); 

    }

    mDown(event)
    {
        this.x = event.clientX;
        this.y = event.clientY;

        this.pressed = true;
    }

    mMove(event)
    {
        this.x = event.clientX;
        this.y = event.clientY;
    }
    mUp(event)
    {
        
        this.pressed = false;
    
    }
}

class CBody
{
    static mass_max = 1000000000000;
    constructor(id, radius, mass, position ,velocity, texture)
    {
        this.particle = new Particle(id, radius, mass, position ,velocity);
        this.sprite = new PIXI.Sprite(texture)
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.radius = 2 * mass/CBody.mass_max;
        this.mass = Math.pow(mass, 4);
        this.sprite.scale = 0.5 * this.radius;
        this.sprite.anchor.set(1.0);
    }

    update(time)
    {
        var speed_limit = 40;
        if(Vector2f.length(this.particle.velocity) > speed_limit){
            this.particle.velocity = Vector2f.multi(Vector2f.normalize(this.particle.velocity), speed_limit);         
        }
        this.particle.position = Vector2f.add(this.particle.position, Vector2f.multi(this.particle.velocity,time.deltaTime));
        this.sprite.x = this.particle.position.x;
        this.sprite.y = this.particle.position.y;
    }
}

var gameController = new GameController();

var w = window.innerWidth;
var h = window.innerHeight;


const app = new PIXI.Application();
await app.init({ background: '#FF44bb', width: w * 0.989, height: h * 0.982});

document.getElementById("page").appendChild(app.canvas);
var client = document.getElementById("page");

const texture = await PIXI.Assets.load('images/Untitled.png');

var renderer = PIXI.autoDetectRenderer({
    transparent: true,
    resolution: 1
});


//var cbody = new CBody(1, 20, 23, new Vector2f(900,300), new Vector2f(1.5,1.5), texture);

var particle_list = [];

for (let index = 0; index < 120; index++) {

    var temp = new CBody(index, 10, Math.random() * (CBody.mass_max), new Vector2f(Math.random() * app.screen.width,Math.random() * app.screen.height), new Vector2f(Math.random() *5,Math.random() *5), texture);

    if(index == 0)
    {
        temp = new CBody(index, 10, 2 * CBody.mass_max, new Vector2f(Math.random() * 600,Math.random() * 600), new Vector2f(0,0), texture);

    }
    app.stage.addChild(temp.sprite);
    particle_list.push(temp);
    
}

app.ticker.add((time) =>
{
    
    for (let index = 0; index < particle_list.length; index++) {
        particle_list[index].update(time);
        particle_list[index].particle.check_borders(app.screen.width, app.screen.height);
        var grav_pull = new Vector2f(0,0);
        for (let j = 0; j < particle_list.length; j++) {
            if(particle_list[j].particle.id == particle_list[index].particle.id){
                continue;
            }

            var distance = Vector2f.minus(particle_list[j].particle.position, particle_list[index].particle.position);


            var dist_normal = Vector2f.normalize(distance);
            var grav_field = particle_list[j].particle.gravForce(Vector2f.length(distance)) * particle_list[index].particle.mass;

            var grav_pull = Vector2f.add(grav_pull, Vector2f.multi(dist_normal, grav_field));

            Particle.check_collision(particle_list[j].particle, particle_list[index].particle);
        }

        particle_list[index].particle.addForce(Vector2f.multi(new Vector2f(-grav_pull.x, -grav_pull.y), time.deltaTime));
    }

    if(gameController.pressed)
    {
        for (let index = 0; index < particle_list.length; index++) 
        {
            var distance_from_impulse = Vector2f.minus(particle_list[index].particle.position, new Vector2f(gameController.x,gameController.y));

            var force_multi = 0.02 * time.deltaTime;
            particle_list[index].particle.addForce(new Vector2f( force_multi * -distance_from_impulse.x * particle_list[index].particle.mass,force_multi *  -distance_from_impulse.y * particle_list[index].particle.mass));
        }
    }

});