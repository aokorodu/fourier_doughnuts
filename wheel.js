class Wheel{
    constructor(r, angVel){
        this.r = r;
        this.angle = 0;
        this.angVel = angVel;
        this.position;
        this.tau = 2* Math.PI;
    }

    setVelocity(newVelocity){
        this.angVel = newVelocity;
    }

    init(){
        this.position = createVector(0, this.r);
    }

    update(){
        this.angle += this.angVel;
        if(this.angle > this.tau) this.angle -= this.tau;
        this.position.x = this.r * Math.cos(this.angle);
        this.position.y = this.r * Math.sin(this.angle);

        return this.position;
    }


}