import * as THREE from 'three';


import backFace from "../../assets/me_with_hat/back-face-3.json"
import faceOmkreds from "../../assets/me_with_hat/face-omkreds-0.json"
import leftEye from "../../assets/me_with_hat/left-eye-0.5.json"
import mouth from "../../assets/me_with_hat/mouth-0.5.json"
import noseBrowns from "../../assets/me_with_hat/nose-browns-1.json"
import rightEye from "../../assets/me_with_hat/right-eye-0.5.json"
import hair from "../../assets/me_with_hat/hair.json"
import eyes from "../../assets/me_with_hat/eyes.json"


import { Drawing } from '../drawing';
import { Object3D, Matrix, Matrix4 } from 'three';


export class Face {

    public eyesParent: Object3D;

    constructor(scene: THREE.Scene, sec: number, delay: number = 0, fps: number = 60) {

        // //Face
        var maxPoints = Object.keys(backFace).length;
        // world
        var lineGeometry = new THREE.BufferGeometry();
        var positions = new Float32Array(maxPoints * 3);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // draw range
        lineGeometry.setDrawRange(0, 0);
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        var line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        var drawing = new Drawing(backFace, line, fps);
        drawing.draw(sec, delay);

        /////////////////NEXT//////////////////////////
        var data = faceOmkreds;
        var maxPoints = Object.keys(data).length;
        // world
        var lineGeometry = new THREE.BufferGeometry();
        var positions = new Float32Array(maxPoints * 3);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // draw range
        lineGeometry.setDrawRange(0, 0);
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        var drawing = new Drawing(data, line, fps);
        drawing.draw(sec, delay);

        /////////////////NEXT//////////////////////////
        var data = leftEye;
        var maxPoints = Object.keys(data).length;
        // world
        var lineGeometry = new THREE.BufferGeometry();
        var positions = new Float32Array(maxPoints * 3);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // draw range
        lineGeometry.setDrawRange(0, 0);
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        var drawing = new Drawing(data, line, fps);
        drawing.draw(sec, delay);


        /////////////////NEXT//////////////////////////
        var data = mouth;
        var maxPoints = Object.keys(data).length;
        // world
        var lineGeometry = new THREE.BufferGeometry();
        var positions = new Float32Array(maxPoints * 3);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // draw range
        lineGeometry.setDrawRange(0, 0);
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        var drawing = new Drawing(data, line, fps);
        drawing.draw(sec, delay);

        ///////////////NEXT//////////////////////////
        var data = noseBrowns;
        var maxPoints = Object.keys(data).length;
        // world
        var lineGeometry = new THREE.BufferGeometry();
        var positions = new Float32Array(maxPoints * 3);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // draw range
        lineGeometry.setDrawRange(0, 0);
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        var drawing = new Drawing(data, line, fps);
        drawing.draw(sec, delay);

        /////////////////NEXT//////////////////////////
        var data = rightEye;
        var maxPoints = Object.keys(data).length;
        // world
        var lineGeometry = new THREE.BufferGeometry();
        var positions = new Float32Array(maxPoints * 3);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // draw range
        lineGeometry.setDrawRange(0, 0);
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        var drawing = new Drawing(data, line, fps);
        drawing.draw(sec, delay);

        /////////////////NEXT//////////////////////////
        //Hair
        for (let key in hair) {
            var data = hair[key];
            var maxPoints = Object.keys(data).length;
            // world
            var lineGeometry = new THREE.BufferGeometry();
            var positions = new Float32Array(maxPoints * 3);
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            // draw range
            lineGeometry.setDrawRange(0, 0);
            var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
            line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
            var drawing = new Drawing(data, line, fps);
            drawing.draw(sec * (Math.random()*2) , delay);
        }

        //Eyes
        this.eyesParent = new Object3D();

        for (let key in eyes) {
            var data = eyes[key];
            var transform = eyes[key]["transform"];
            delete eyes[key]["transform"];
            var maxPoints = Object.keys(data).length;
            // world
            var lineGeometry = new THREE.BufferGeometry();
            var positions = new Float32Array(maxPoints * 3);
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            // draw range
            var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
            line = new THREE.Line(lineGeometry, lineMaterial);
            console.log(transform);

            line.position.set(transform.x, transform.y, transform.z);
            scene.add(line);
            var drawing = new Drawing(data, line, fps);
            drawing.draw(sec, delay);
            this.eyesParent.add(line);


        }
        scene.add(this.eyesParent);


    }

    rotateEyes(matrix: Matrix4){
        var eyes = this.eyesParent.children;
        for(var i = 0; i < eyes.length; i++){
            eyes[i].setRotationFromMatrix(matrix);
        }
    }
}