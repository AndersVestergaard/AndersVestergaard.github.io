import * as THREE from "three";

export class Drawing {

    private fpsInterval: number;
    private nextPoint: number = 0;

    constructor(private data: any, private line: THREE.Line, 
        private fps: number = 60) {
        this.fpsInterval = 1000 / this.fps;
    }

    private ppf: number = 1;
    private delay: number = 0;
    draw(sec: number, delay: number = 0) {
        this.delay = delay;
        this.drawData();
        var pps = Object.keys(this.data).length / sec;
        this.ppf = (pps / this.fps) / 3;
        var test = Date.now();
        this.animate();
    }

    private last: number = 0;    
    private start: number = 0;    
    private animateFrame = 0;

    animate() {

        if (this.last == 0) {
            this.last = Date.now();
            this.start = Date.now();
        }
        requestAnimationFrame(this.animate.bind(this));

        var now = Date.now();
        var elapsed = now - this.last;
        if (now - this.start > this.delay && elapsed > this.fpsInterval) {
            this.last = now - (elapsed % this.fpsInterval);
            var tempGeo = this.line.geometry as THREE.BufferGeometry;
            var tempAtt = tempGeo.attributes.position as THREE.BufferAttribute;
            this.animateFrame += this.ppf;
            tempGeo.setDrawRange(0, Math.min(Math.floor(this.animateFrame),  Math.round(this.nextPoint / 3)) );
        }
    }

    drawData() {

        for (const property in this.data) {
            var tempGeo = this.line.geometry as THREE.BufferGeometry;
            var tempAtt = tempGeo.attributes.position as THREE.BufferAttribute;
            var positions = tempAtt.array;
            positions[this.nextPoint] = this.data[property];
            this.nextPoint++;
        }

    }



}