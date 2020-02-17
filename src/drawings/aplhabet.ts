import * as THREE from 'three';


import alphabet from "../assets/font/alphabet.json"


import { Drawing } from './drawing';
import { Object3D, Vector3, Camera, Matrix4 } from 'three';


export class Alphabet {

    private parent: THREE.Object3D; 

    constructor(scene: THREE.Scene, sec: number, delay: number = 0, fps: number = 60) {

        this.parent = new Object3D();
        scene.add( this.parent );

        var str = "Hej";
        var space = 0;

        for(var i =0 ; i < str.length; i++){
            var letter = alphabet[str[i]];
            for (let key in letter) {
                var data: any = letter[key];
                var maxPoints = Object.keys(data).length;

                for (let innerPoint in data){
                    if(parseInt(innerPoint) % 3 == 0){
                        data[innerPoint] = parseFloat(data[innerPoint]) + space; 
                    }
                }                

                // world
                var lineGeometry = new THREE.BufferGeometry();
                var positions = new Float32Array(maxPoints * 3);
                lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                // draw range
                lineGeometry.setDrawRange(0, 0);
                var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
                var line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);
                this.parent.add(line);
                var drawing = new Drawing(data, line, fps);
                drawing.draw(sec, delay);
            }
            space += parseFloat(alphabet[str[i]+"S"]);
        }
    }

    setPosition(x:number,y:number,z:number){
        this.parent.position.x = x;
        this.parent.position.y = y;
        this.parent.position.z = z;

    }

    setRotation(matrix: Matrix4 ){
        this.parent.setRotationFromMatrix(matrix);
    }


}