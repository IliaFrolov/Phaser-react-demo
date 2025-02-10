import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { SpineGameObject } from "@esotericsoftware/spine-phaser"


export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    spineBoy: SpineGameObject;

    constructor() {
        super('Game');

    }
    preload() {
        this.load.spineJson("spineboy", "assets/spineboy/spineboy.json")
        this.load.spineAtlas("spineboy-atlas", "assets/spineboy/spineboy.atlas")
    }
    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        // Create Spine Object
        this.spineBoy = this.add.spine(400, 700, "spineboy", "spineboy-atlas");
        this.spineBoy.animationStateData.defaultMix = 0.2;

        // Play Animation
        this.spineBoy.animationState.setAnimation(0, "idle", true);
        EventBus.emit('current-scene-ready', this);
    }
    walk() {
        this.spineBoy.animationState.setAnimation(0, "walk", true);
        EventBus.emit('animation-update', 'walk');
        console.log("walk");
    }
    run() {
        this.spineBoy.animationState.setAnimation(0, "run", true);
        EventBus.emit('animation-update', 'run');
        console.log("run");
    }
    stop() {
        this.spineBoy.animationState.setAnimation(0, "run-to-idle", false);
        this.spineBoy.animationState.addAnimation(0, "idle", true);
        EventBus.emit('animation-update', 'idle');
        console.log("stop");
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
