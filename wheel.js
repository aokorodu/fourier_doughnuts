class Wheel{
    constructor(r, angVel){
        this.r = r;
        this.angle = 0;
        this.angVel = angVel;
        this.position;
    }

    setVelocity(newVelocity){
        this.anglelVel = newVelocity;
    }

    init(){
        this.position = createVector(0, this.r);
    }

    update(){
        this.angle += this.angVel;
        
        this.position.x = this.r * Math.cos(this.angle);
        this.position.y = this.r * Math.sin(this.angle);

        return this.position;
    }


}