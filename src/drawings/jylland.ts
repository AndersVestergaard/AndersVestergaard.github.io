
import * as THREE from 'three';
import data from "./../assets/jylland-lower.json";
import data2 from "./../assets/jylland-upper.json";


import { Drawing } from './drawing';


export class JyllandLower {
    private line: THREE.Line;

    private fpsInterval: number;
    constructor(scene: THREE.Scene, private fps: number = 60) {

        var maxPoints = Object.keys(data).length;
        // world
        var lineGeometry = new THREE.BufferGeometry();

        var positions = new Float32Array(maxPoints * 3);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // draw range
        lineGeometry.setDrawRange(0, 0);

        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        this.line = new THREE.Line(lineGeometry, lineMaterial);

        scene.add(this.line);

    }

    draw(sec: number, delay: number = 0) {
        var drawing = new Drawing(data, this.line, this.fps);
        drawing.draw(sec, delay);
    }


}


export class JyllandUpper {
    private line: THREE.Line;

    constructor(scene: THREE.Scene, private fps: number = 60) {

        var maxPoints = Object.keys(data2).length;
        // world
        var lineGeometry = new THREE.BufferGeometry();

        var positions = new Float32Array(maxPoints * 3);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // draw range
        var drawCount = 2; // draw the first 2 points, only
        lineGeometry.setDrawRange(0, drawCount);

        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        this.line = new THREE.Line(lineGeometry, lineMaterial);

        scene.add(this.line);

    }

    draw(sec: number, delay: number = 0) {
        var drawing = new Drawing(data2, this.line, this.fps);
        drawing.draw(sec, delay);
    }


}


