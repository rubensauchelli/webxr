import {Component, Input, OnInit} from '@angular/core';
import * as THREE from 'three';
import {Clock, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {VRButton} from 'three/examples/jsm/webxr/VRButton';
import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry';

@Component({
  selector: 'app-augmented-reality',
  templateUrl: './augmented-reality.component.html',
  styleUrls: ['./augmented-reality.component.css']
})


export class AugmentedRealityComponent implements OnInit {
  private clock: Clock;
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private controls: OrbitControls;
  private stats: Stats;
  private room;
  private radius: number;
  private loader = new THREE.TextureLoader();


  @Input() public texture: string = "/assets/nft-2.png";



  constructor() {
    //Test push change
    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    this.clock = new THREE.Clock();

    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.camera.position.set( 0, 1.6, 3 );

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x505050 );

    this.scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( light );

    this.renderer = new THREE.WebGLRenderer({ antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.target.set(0, 1.6, 0);
    this.controls.update();

    // @ts-ignore
    this.stats = new Stats()
    container.appendChild( this.stats.dom );

    this.initScene();
    this.setupVR();

    window.addEventListener('resize', this.resize.bind(this) );

    this.renderer.setAnimationLoop( this.render.bind(this) );
  }
  initScene(){
    this.radius = 0.08;

    this.room = new THREE.LineSegments(
      new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ),
      new THREE.LineBasicMaterial( { color: 0x808080 } )
    );
    this.room.geometry.translate( 0, 3, 0 );
    this.scene.add( this.room );

    //const geometry = new THREE.IcosahedronBufferGeometry( this.radius, 2 );
    const geometry = new THREE.BoxGeometry(1, 1,1);

    //for ( let i = 0; i < 200; i ++ ) {
     //private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

      //const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
      const material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture) });

      const object = new THREE.Mesh( geometry, material);

      object.position.x = 0
      object.position.y = 2
      object.position.z = -1

      this.room.add( object );

   // }
  }

  setupVR(){
    this.renderer.xr.enabled = true;
    document.body.appendChild( VRButton.createButton( this.renderer ) );
  }

  resize(){
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  render( ) {
    this.stats.update();

    this.renderer.render( this.scene, this.camera );
  }

  ngOnInit(): void {
    console.log('twat')
  }

  random( min, max ){
    return Math.random() * (max-min) + min;
  }
}
