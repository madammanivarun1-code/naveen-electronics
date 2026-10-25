import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  X, 
  RotateCw, 
  Sun, 
  Layers, 
  Play, 
  Pause, 
  ShoppingCart, 
  MessageCircle, 
  Check, 
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_INFO } from '../data/categories';

export default function Product3DViewerModal({ product, onClose }) {
  const { addToCart } = useStore();
  const mountRef = useRef(null);

  // 3D Controls State
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireColor, setWireColor] = useState('red'); // 'red' | 'blue' | 'yellow' | 'green' | 'black'
  const [wireGauge, setWireGauge] = useState(product?.specs?.['Conductor Size'] || '2.5 sq mm');
  const [exposeCopper, setExposeCopper] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(2); // 0: off, 1: low, 2: med, 3: high
  const [isBulbOn, setIsBulbOn] = useState(true);
  const [bulbColorTemp, setBulbColorTemp] = useState('cool'); // 'cool' (6500K) | 'warm' (3000K)
  const [mcbTripped, setMcbTripped] = useState(false);
  const [studioLight, setStudioLight] = useState('bright'); // 'bright' | 'warm' | 'dramatic'

  // Refs for 3D animated parts
  const animRef = useRef({});
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const category = product?.category || 'wires-cables';
  const brand = product?.brand || 'Polycab';

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a); // Deep navy backdrop

    // Subtle grid ground for 3D spatial depth
    const grid = new THREE.GridHelper(10, 20, 0x334155, 0x1e293b);
    grid.position.y = -1.6;
    scene.add(grid);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3, 2.5, 4.5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 10;
    controls.minDistance = 1.5;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.5;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xfff7ed, 4);
    mainSpot.position.set(5, 8, 5);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.5;
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const fillLight = new THREE.PointLight(0x38bdf8, 2, 10);
    fillLight.position.set(-4, -1, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfbbf24, 2);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    // 6. Build 3D Models by Category
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Materials helper
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xcd7f32,
      metalness: 0.92,
      roughness: 0.18
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.25
    });

    // ---------------------------------------------------------
    // A. WIRES & CABLES 3D MODEL (Polycab & Goldmedal Coil)
    // ---------------------------------------------------------
    if (category === 'wires-cables') {
      const coilGroup = new THREE.Group();

      const getWireColorHex = (col) => {
        switch (col) {
          case 'red': return 0xdc2626;
          case 'blue': return 0x2563eb;
          case 'yellow': return 0xeab308;
          case 'green': return 0x16a34a;
          case 'black': return 0x1e293b;
          default: return 0xdc2626;
        }
      };

      const wireColorHex = getWireColorHex(wireColor);

      const wireMat = new THREE.MeshStandardMaterial({
        color: wireColorHex,
        roughness: 0.35,
        metalness: 0.1
      });

      // Layered coiled wire rings
      const coilRadius = 1.2;
      const wireThickness = 0.07;
      const turns = 18;

      for (let i = 0; i < turns; i++) {
        const radiusOffset = (i % 3) * 0.08;
        const heightOffset = (Math.floor(i / 3) - 3) * 0.12;

        const torusGeo = new THREE.TorusGeometry(coilRadius + radiusOffset, wireThickness, 12, 48);
        const ring = new THREE.Mesh(torusGeo, wireMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = heightOffset;
        coilGroup.add(ring);
      }

      // Brand Packaging Wrapper Band around the coil
      const bandGeo = new THREE.CylinderGeometry(1.36, 1.36, 0.45, 32, 1, true);
      const isGoldmedal = brand.toLowerCase().includes('goldmedal') || product.name.includes('Goldmedal');
      const bandColor = isGoldmedal ? 0xb91c1c : 0x15803d;

      // Create Dynamic Canvas Texture for Brand Ribbon
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = isGoldmedal ? '#B91C1C' : '#15803D';
      ctx.fillRect(0, 0, 512, 128);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(isGoldmedal ? 'GOLDMEDAL FRLS 90m' : 'POLYCAB FR 90m', 256, 50);
      ctx.fillStyle = '#FEF08A';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('100% PURE COPPER • IS:694', 256, 90);

      const bandTex = new THREE.CanvasTexture(canvas);
      const bandMat = new THREE.MeshStandardMaterial({
        map: bandTex,
        roughness: 0.4,
        side: THREE.DoubleSide
      });
      const band = new THREE.Mesh(bandGeo, bandMat);
      coilGroup.add(band);

      // Lead Wire sticking out with stripped pure copper core
      const leadCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(1.3, 0.2, 0),
        new THREE.Vector3(1.6, 0.6, 0.3),
        new THREE.Vector3(1.7, 1.2, 0.6),
        new THREE.Vector3(1.5, 1.7, 0.8)
      );
      const leadInsulationGeo = new THREE.TubeGeometry(leadCurve, 20, 0.08, 12, false);
      const leadInsulation = new THREE.Mesh(leadInsulationGeo, wireMat);
      coilGroup.add(leadInsulation);

      // Stripped Pure Copper Conductors sticking out of tip
      if (exposeCopper) {
        const copperTipGroup = new THREE.Group();
        const strandCount = 7;
        for (let s = 0; s < strandCount; s++) {
          const angle = (s / strandCount) * Math.PI * 2;
          const r = 0.03;
          const strandGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.4, 8);
          const strand = new THREE.Mesh(strandGeo, copperMat);
          strand.position.set(
            1.5 + Math.cos(angle) * r,
            1.9,
            0.8 + Math.sin(angle) * r
          );
          strand.rotation.z = -0.15;
          copperTipGroup.add(strand);
        }
        coilGroup.add(copperTipGroup);
      }

      modelGroup.add(coilGroup);
      animRef.current.coil = coilGroup;
    }

    // ---------------------------------------------------------
    // B. SWITCHES & SOCKETS 3D MODEL
    // ---------------------------------------------------------
    else if (category === 'switches-sockets') {
      const switchGroup = new THREE.Group();

      // Outer Designer Wall Plate (Gloss Polycarbonate)
      const plateGeo = new THREE.BoxGeometry(2.4, 2.4, 0.2);
      const plateMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.15,
        metalness: 0.05
      });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.castShadow = true;
      plate.receiveShadow = true;
      switchGroup.add(plate);

      // Chrome/Gold Bevel Border
      const trimGeo = new THREE.BoxGeometry(2.46, 2.46, 0.05);
      const trim = new THREE.Mesh(trimGeo, brassMat);
      trim.position.z = -0.05;
      switchGroup.add(trim);

      // Modular Inner Bezel
      const innerBezelGeo = new THREE.BoxGeometry(1.6, 1.6, 0.25);
      const innerBezelMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 });
      const innerBezel = new THREE.Mesh(innerBezelGeo, innerBezelMat);
      innerBezel.position.z = 0.05;
      switchGroup.add(innerBezel);

      // Interactive Clickable Switch Rocker
      const rockerGeo = new THREE.BoxGeometry(1.2, 1.2, 0.22);
      const rockerMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2
      });
      const rocker = new THREE.Mesh(rockerGeo, rockerMat);
      rocker.position.z = 0.22;
      rocker.rotation.x = isSwitchOn ? 0.22 : -0.22;
      switchGroup.add(rocker);
      animRef.current.rocker = rocker;

      // Red Indicator Light
      const indGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const indMat = new THREE.MeshStandardMaterial({
        color: isSwitchOn ? 0xef4444 : 0x475569,
        emissive: isSwitchOn ? 0xef4444 : 0x000000,
        emissiveIntensity: isSwitchOn ? 2.5 : 0
      });
      const ind = new THREE.Mesh(indGeo, indMat);
      ind.position.set(0, 0.35, 0.34);
      switchGroup.add(ind);
      animRef.current.indicator = ind;

      // Socket Pins simulation if it's a socket
      if (product.name.toLowerCase().includes('socket')) {
        rocker.visible = false;
        const socketFaceGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.15, 32);
        const socketFace = new THREE.Mesh(socketFaceGeo, new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
        socketFace.rotation.x = Math.PI / 2;
        socketFace.position.z = 0.2;
        switchGroup.add(socketFace);

        // 3 Pin Holes
        const makePinHole = (x, y, r) => {
          const pinGeo = new THREE.CylinderGeometry(r, r, 0.25, 16);
          const pinMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
          const pin = new THREE.Mesh(pinGeo, pinMat);
          pin.rotation.x = Math.PI / 2;
          pin.position.set(x, y, 0.25);
          switchGroup.add(pin);
        };
        makePinHole(0, 0.28, 0.11); // Earth
        makePinHole(-0.25, -0.15, 0.08); // Live
        makePinHole(0.25, -0.15, 0.08); // Neutral
      }

      modelGroup.add(switchGroup);
    }

    // ---------------------------------------------------------
    // C. FANS & VENTILATION 3D MODEL (Spinning Ceiling Fan)
    // ---------------------------------------------------------
    else if (category === 'fans-ventilation') {
      const fanGroup = new THREE.Group();

      // Ceiling Downrod & Canopy
      const rodGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 16);
      const rodMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 });
      const rod = new THREE.Mesh(rodGeo, rodMat);
      rod.position.y = 1.0;
      fanGroup.add(rod);

      const canopyGeo = new THREE.ConeGeometry(0.3, 0.4, 32);
      const canopy = new THREE.Mesh(canopyGeo, rodMat);
      canopy.position.y = 1.8;
      fanGroup.add(canopy);

      // Rotating Hub & Rotor
      const rotatingGroup = new THREE.Group();

      const hubGeo = new THREE.CylinderGeometry(0.6, 0.5, 0.35, 32);
      const hubMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.6,
        roughness: 0.2
      });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      rotatingGroup.add(hub);

      // Gold Trim Ring
      const ringGeo = new THREE.TorusGeometry(0.62, 0.03, 16, 32);
      const ring = new THREE.Mesh(ringGeo, brassMat);
      ring.rotation.x = Math.PI / 2;
      rotatingGroup.add(ring);

      // 3 Aerodynamic Fan Blades (120° apart)
      const bladeShape = new THREE.Shape();
      bladeShape.moveTo(0, 0);
      bladeShape.lineTo(0.25, 0.5);
      bladeShape.lineTo(0.3, 2.2);
      bladeShape.quadraticCurveTo(0, 2.4, -0.3, 2.2);
      bladeShape.lineTo(-0.25, 0.5);
      bladeShape.closePath();

      const extrudeSettings = { depth: 0.03, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 };
      const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.3,
        roughness: 0.3
      });

      for (let b = 0; b < 3; b++) {
        const bladeArm = new THREE.Group();
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(0, 0, 0.4);
        blade.rotation.x = Math.PI / 2 + 0.15; // Pitch angle for airflow
        bladeArm.add(blade);
        bladeArm.rotation.y = (b / 3) * Math.PI * 2;
        rotatingGroup.add(bladeArm);
      }

      fanGroup.add(rotatingGroup);
      modelGroup.add(fanGroup);
      animRef.current.fanRotor = rotatingGroup;
    }

    // ---------------------------------------------------------
    // D. PROTECTION & DISTRIBUTION (Single-Pole DIN MCB)
    // ---------------------------------------------------------
    else if (category === 'protection-distribution') {
      const mcbGroup = new THREE.Group();

      // Main MCB Enclosure
      const bodyGeo = new THREE.BoxGeometry(0.8, 2.4, 1.8);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      mcbGroup.add(body);

      // Terminal Blocks (Top and Bottom)
      const termGeo = new THREE.BoxGeometry(0.65, 0.4, 0.6);
      const termMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 });
      const termTop = new THREE.Mesh(termGeo, termMat);
      termTop.position.set(0, 1.1, -0.4);
      mcbGroup.add(termTop);

      const termBottom = new THREE.Mesh(termGeo, termMat);
      termBottom.position.set(0, -1.1, -0.4);
      mcbGroup.add(termBottom);

      // Din Rail Slot on Back
      const slotGeo = new THREE.BoxGeometry(0.82, 0.6, 0.3);
      const slotMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
      const slot = new THREE.Mesh(slotGeo, slotMat);
      slot.position.set(0, 0, -0.9);
      mcbGroup.add(slot);

      // Operating Toggle Lever
      const togglePivot = new THREE.Group();
      togglePivot.position.set(0, 0.2, 0.9);

      const leverGeo = new THREE.BoxGeometry(0.4, 0.5, 0.4);
      const leverMat = new THREE.MeshStandardMaterial({
        color: mcbTripped ? 0xef4444 : 0xea580c,
        roughness: 0.3
      });
      const lever = new THREE.Mesh(leverGeo, leverMat);
      lever.position.set(0, 0, 0.2);
      togglePivot.add(lever);
      togglePivot.rotation.x = mcbTripped ? -0.4 : 0.4;
      mcbGroup.add(togglePivot);
      animRef.current.mcbLever = togglePivot;

      // Status Flag (Red = ON, Green = OFF/TRIPPED)
      const flagGeo = new THREE.PlaneGeometry(0.3, 0.15);
      const flagMat = new THREE.MeshBasicMaterial({ color: mcbTripped ? 0x16a34a : 0xdc2626 });
      const flag = new THREE.Mesh(flagGeo, flagMat);
      flag.position.set(0, -0.2, 0.91);
      mcbGroup.add(flag);
      animRef.current.mcbFlag = flag;

      modelGroup.add(mcbGroup);
    }

    // ---------------------------------------------------------
    // E. LIGHTING (9W B22 LED Bulb)
    // ---------------------------------------------------------
    else {
      const bulbGroup = new THREE.Group();

      // Frosted Bulb Dome
      const domeGeo = new THREE.SphereGeometry(1.0, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.65);
      const domeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.1,
        transparent: true,
        opacity: 0.95,
        emissive: isBulbOn ? (bulbColorTemp === 'warm' ? 0xf59e0b : 0xe0f2fe) : 0x000000,
        emissiveIntensity: isBulbOn ? 1.6 : 0
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.y = 0.4;
      bulbGroup.add(dome);
      animRef.current.bulbDome = dome;

      // Internal Point Light inside the bulb
      const bulbLight = new THREE.PointLight(
        bulbColorTemp === 'warm' ? 0xffedd5 : 0xf0f9ff,
        isBulbOn ? 4 : 0,
        8
      );
      bulbLight.position.y = 0.5;
      bulbGroup.add(bulbLight);
      animRef.current.bulbLight = bulbLight;

      // Aluminium Heat Sink Base
      const sinkGeo = new THREE.CylinderGeometry(0.7, 0.45, 0.8, 32);
      const sinkMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.3 });
      const sink = new THREE.Mesh(sinkGeo, sinkMat);
      sink.position.y = -0.25;
      bulbGroup.add(sink);

      // B22 Bayonet Metal Cap
      const capGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.5, 32);
      const capMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.2 });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = -0.8;
      bulbGroup.add(cap);

      // Two Bayonet Pins
      const pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 16);
      const pin = new THREE.Mesh(pinGeo, brassMat);
      pin.rotation.z = Math.PI / 2;
      pin.position.y = -0.8;
      bulbGroup.add(pin);

      modelGroup.add(bulbGroup);
    }

    // 7. Animation Loop
    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Rotate fan blades based on speed
      if (animRef.current.fanRotor && fanSpeed > 0) {
        const rpmMultiplier = fanSpeed === 1 ? 4 : fanSpeed === 2 ? 10 : 20;
        animRef.current.fanRotor.rotation.y += delta * rpmMultiplier;
      }

      // Gentle floating animation for wire coil / other models
      if (animRef.current.coil) {
        animRef.current.coil.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.08;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      controls.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.innerHTML = '';
      }
    };
  }, [category, brand, wireColor, exposeCopper, isSwitchOn, fanSpeed, isBulbOn, bulbColorTemp, mcbTripped, autoRotate]);

  // Interactive Switch Toggle Handler
  const toggleSwitch = () => {
    setIsSwitchOn(prev => !prev);
  };

  // Interactive MCB Toggle Handler
  const toggleMcb = () => {
    setMcbTripped(prev => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-navy-900 rounded-3xl border border-navy-700 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Top Floating Header */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
          <span className="px-3 py-1 bg-electric text-navy-950 font-black text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Studio</span>
          </span>
          <span className="text-white text-xs font-bold hidden sm:inline-block">
            {product?.name || 'Electrical Product'}
          </span>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-navy-800/90 hover:bg-navy-700 text-white rounded-full flex items-center justify-center transition-colors shadow-md border border-navy-700"
          title="Close 3D Viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3D WebGL Canvas Area */}
        <div className="flex-1 h-full relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-slate-900">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* 3D Viewport Controls Pill */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-navy-950/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-navy-700/80 text-[11px] text-slate-300">
            <button
              onClick={() => setAutoRotate(r => !r)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold transition-colors ${
                autoRotate ? 'bg-electric text-navy-950' : 'bg-navy-800 text-slate-300'
              }`}
            >
              <RotateCw className="w-3 h-3" />
              <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
            </button>
            <span className="text-slate-500">•</span>
            <span className="hidden sm:inline">Drag to rotate 360° • Scroll to zoom</span>
          </div>
        </div>

        {/* Right Sidebar: 3D Configurator & Live Product Actions */}
        <div className="w-full md:w-80 bg-navy-950/95 border-t md:border-t-0 md:border-l border-navy-800 p-6 flex flex-col justify-between overflow-y-auto z-10 text-white space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                {product?.brand || 'Polycab & Goldmedal'}
              </span>
              <h3 className="text-base font-black text-white leading-snug mt-1">
                {product?.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black font-mono text-electric">
                  ₹{product?.indicativePrice?.toLocaleString('en-IN') || 59}
                </span>
                <span className="text-xs text-slate-400">per {product?.unit || 'metre'} (est.)</span>
              </div>
            </div>

            {/* 3D Interactive Controls by Category */}
            <div className="p-4 bg-navy-900/90 rounded-2xl border border-navy-800 space-y-3.5">
              <div className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>3D Physical Properties</span>
              </div>

              {/* A. Wire Category Controls */}
              {category === 'wires-cables' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">
                      Wire Insulation Color:
                    </label>
                    <div className="flex gap-2">
                      {[
                        { id: 'red', bg: 'bg-red-600', name: 'Phase Red' },
                        { id: 'yellow', bg: 'bg-yellow-400', name: 'Phase Yellow' },
                        { id: 'blue', bg: 'bg-blue-600', name: 'Phase Blue' },
                        { id: 'green', bg: 'bg-green-600', name: 'Earth Green' },
                        { id: 'black', bg: 'bg-slate-800', name: 'Neutral Black' }
                      ].map(c => (
                        <button
                          key={c.id}
                          onClick={() => setWireColor(c.id)}
                          title={c.name}
                          className={`w-7 h-7 rounded-full ${c.bg} border-2 transition-transform ${
                            wireColor === c.id ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-bold">
                      Expose Copper Core:
                    </label>
                    <button
                      onClick={() => setExposeCopper(e => !e)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold w-full transition-colors flex items-center justify-center gap-2 ${
                        exposeCopper ? 'bg-amber-500 text-navy-950' : 'bg-navy-800 text-slate-300'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{exposeCopper ? '100% Copper Exposed' : 'Covered Tip'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* B. Switch Category Controls */}
              {category === 'switches-sockets' && (
                <div className="space-y-2 text-xs">
                  <label className="text-[11px] text-slate-400 block font-bold">
                    Test 3D Switch Action:
                  </label>
                  <button
                    onClick={toggleSwitch}
                    className={`w-full py-2.5 rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                      isSwitchOn ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    <span>Click to Toggle: <strong>{isSwitchOn ? 'SWITCH ON (I)' : 'SWITCH OFF (O)'}</strong></span>
                  </button>
                </div>
              )}

              {/* C. Fan Category Controls */}
              {category === 'fans-ventilation' && (
                <div className="space-y-2 text-xs">
                  <label className="text-[11px] text-slate-400 block font-bold">
                    3D Fan RPM Speed Control:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 0, label: 'Stop' },
                      { id: 1, label: 'Low' },
                      { id: 2, label: 'Med' },
                      { id: 3, label: '380 RPM' }
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => setFanSpeed(s.id)}
                        className={`py-1.5 rounded-xl font-bold text-[10px] transition-colors ${
                          fanSpeed === s.id ? 'bg-electric text-navy-950' : 'bg-navy-800 text-slate-300'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* D. Protection / MCB Controls */}
              {category === 'protection-distribution' && (
                <div className="space-y-2 text-xs">
                  <label className="text-[11px] text-slate-400 block font-bold">
                    MCB Lever Simulation:
                  </label>
                  <button
                    onClick={toggleMcb}
                    className={`w-full py-2.5 rounded-xl font-black text-xs transition-colors flex items-center justify-center gap-2 ${
                      mcbTripped ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    <span>{mcbTripped ? 'BREAKER TRIPPED (OFF)' : 'CIRCUIT CLOSED (ON)'}</span>
                  </button>
                </div>
              )}

              {/* E. Lighting Controls */}
              {category === 'lighting' && (
                <div className="space-y-2.5 text-xs">
                  <button
                    onClick={() => setIsBulbOn(b => !b)}
                    className={`w-full py-2 rounded-xl font-bold text-xs transition-colors ${
                      isBulbOn ? 'bg-amber-400 text-navy-950' : 'bg-navy-800 text-slate-400'
                    }`}
                  >
                    {isBulbOn ? 'Bulb Illuminated (ON)' : 'Bulb Turned OFF'}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setBulbColorTemp('cool')}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold ${
                        bulbColorTemp === 'cool' ? 'bg-sky-400 text-navy-950' : 'bg-navy-800 text-slate-300'
                      }`}
                    >
                      6500K Cool Day
                    </button>
                    <button
                      onClick={() => setBulbColorTemp('warm')}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold ${
                        bulbColorTemp === 'warm' ? 'bg-amber-400 text-navy-950' : 'bg-navy-800 text-slate-300'
                      }`}
                    >
                      3000K Warm White
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Specs */}
            <div className="text-[11px] space-y-1.5 text-slate-300">
              <div className="flex justify-between border-b border-navy-800 pb-1">
                <span className="text-slate-400">Material Standard:</span>
                <span className="font-bold text-white">IS 694 : 2010</span>
              </div>
              <div className="flex justify-between border-b border-navy-800 pb-1">
                <span className="text-slate-400">Store Counter:</span>
                <span className="font-bold text-white">Raghavendra Colony, Gadwal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Warranty:</span>
                <span className="font-bold text-emerald-400">{product?.warranty || 'Manufacturer Warranty'}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 border-t border-navy-800">
            <button
              onClick={() => {
                addToCart(product, 1);
                onClose();
              }}
              className="w-full py-3.5 bg-electric hover:bg-amber-400 text-navy-950 font-black rounded-xl text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart (₹{product?.indicativePrice?.toLocaleString('en-IN')})</span>
            </button>

            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Naveen%20Electronics,%20I%20am%20viewing%20${encodeURIComponent(product?.name || '')}%20in%203D.%20Please%20share%20bulk%20pricing%20for%20Gadwal.`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Store ({STORE_INFO.phone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
