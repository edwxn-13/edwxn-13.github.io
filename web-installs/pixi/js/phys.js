
class Vector2f
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    
    static add(vec_a,vec_b)
    {
        var result = new Vector2f(vec_a.x + vec_b.x, vec_a.y + vec_b.y);
        return result;
    }

    static minus(vec_a,vec_b)
    {
        var result = new Vector2f(vec_a.x - vec_b.x, vec_a.y - vec_b.y);
        return result;
    }

    static multi(vec_a,b)
    {
        var result = new Vector2f(vec_a.x * b, vec_a.y * b);
        return result;
    }

    static div(vec_a,b)
    {
        var result = new Vector2f(vec_a.x / b, vec_a.y / b);
        return result;
    }

    static dot(vec_a, vec_b)
    {
        return (vec_a.x * vec_b.x) + (vec_a.y * vec_b.y);
    }

    static angle(vec_a, vec_b)
    {
        var dot = (vec_a.x * vec_b.x) + (vec_a.y * vec_b.y);
        var magnitude = Vector2f.length(vec_a) * Vector2f.length(vec_b);
        return Math.acos(dot/magnitude);
    }

    static normalize(vec_a)
    {
        var magnitude = Vector2f.length(vec_a);
        var result = new Vector2f(vec_a.x/magnitude, vec_a.y/magnitude);
        return result;
    }

    static length(vector_a)
    {
        return Math.sqrt(Math.pow(vector_a.x, 2) + Math.pow(vector_a.y, 2))
    }
}

class Particle {

    constructor(id, radius, mass, position ,velocity) {
      this.id = id;
      this.radius = radius;
      this.mass = mass;
      this.position = position;
      this.velocity = velocity;
    }

    static check_collision(particle_a, particle_b)
    {
        var distance = Vector2f.length(Vector2f.minus(particle_b.position, particle_a.position));
        var min_seperation = particle_a.radius + particle_b.radius;
        if(distance - min_seperation < 0){

            var momentum_a = Vector2f.length(particle_a.velocity) * particle_a.mass;
            var momentum_b = Vector2f.length(particle_b.velocity) * particle_b.mass;
            var total_momentum = momentum_a + momentum_b;
            
            var sep_vector = Vector2f.minus(particle_b.position, particle_a.position);
            var p_vector = Vector2f.normalize(new Vector2f(sep_vector.y, sep_vector.x));


            return true;
        }

        return false;
    }

    check_borders(screen_width, screen_height)
    {

        var restitution = 0.4; 
        if(this.position.x  > screen_width -  2 *this.radius)
        {
            this.velocity.x = -this.velocity.x * restitution;
        }

        if(this.position.x - this.radius < 0)
        {
            this.velocity.x = -this.velocity.x * restitution;
        }


        if(this.position.y + this.radius> screen_height)
        {
            this.velocity.y = -this.velocity.y * restitution;
        }
    
        if(this.position.y - this.radius < 0)
        {
            this.velocity.y = -this.velocity.y * restitution;
        }

    }

    addForce(force)
    {
        var mass_force = Vector2f.div(force,this.mass);
        this.velocity = Vector2f.add(this.velocity, mass_force);
    }

    gravForce(distance)
    {

        if(distance < 2)
            {
                this.mass / Math.pow(this.radius,2)
            }
        var grav = 6.6743 * Math.pow(10,-11);
        var vari_thing = this.mass / Math.pow(distance,2)
        return grav * vari_thing;
    }


}