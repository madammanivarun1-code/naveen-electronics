import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sparkles, Check, ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Room3DExplorer({ activeRoom, onSelectProduct, onOpen3D }) {
  const mountRef = useRef(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const { products, addToCart } = useStore();

  const hotspots = [
    {
      id: 'fan',
      name: '1200mm Ceiling Fan / BLDC',
      pos: [0, 2.3, 0],
      roomTypes: ['living-room', 'master-bedroom', 'kitchen-dining'],
      productId: 'fv-01',
      desc: 'High air delivery copper motor fan with aero blades'
    },
    {
      id: 'switch',
      name: 'Modular Switch Plate (6-Module)',
      pos: [-1.9, 0.4, 0.5],
      roomTypes: ['living-room', 'master-bedroom', 'kitchen-dining', 'bathroom-utility'],
      productId: 'ss-01',
      desc: 'Silver contact 6A/16A switches with LED indicators'
    },
    {
      id: 'wire',
      name: '2.5 sq mm Polycab / Goldmedal FRLS',
      pos: [-1.9, 1.8, -0.5],
      roomTypes: ['living-room', 'master-bedroom', 'kitchen-dining', 'bathroom-utility', 'main-panel'],
      productId: 'wc-02',
      desc: 'Pure copper flame retardant concealed wiring run'
    },
    {
      id: 'socket',
      name: '16A Power Point (AC / Geyser)',
      pos: [1.2, -0.4, -1.9],
      roomTypes: ['kitchen-dining', 'master-bedroom', 'bathroom-utility'],
      productId: 'ss-03',
      desc: 'Heavy duty modular power socket with safety shutter'
    },
    {
      id: 'mcb',
      name: 'SPN Distribution Board & MCB',
      pos: [1.8, 0.8, -0.8],
      roomTypes: ['main-panel', 'kitchen-dining'],
      productId: 'pd-01',
      desc: 'C-curve 10kA breaker for short-circuit & overload protection'
    }
  ];

  const activeHotspots = hotspots.filter(h => h.roomTypes.includes(activeRoom.id));

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1329);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(4.5, 3.8, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Don't go below floor
    controls.minDistance = 3.5;
    controls.maxDistance = 10;
    controls.target.set(0, 0.6, 0);

    // Ambient & Studio Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);

    const ceilingDownlight = new THREE.SpotLight(0xffedd5, 3.5);
    ceilingDownlight.position.set(0, 3.2, 0);
    ceilingDownlight.angle = Math.PI / 3;
    ceilingDownlight.penumbra = 0.6;
    ceilingDownlight.castShadow = true;
    scene.add(ceilingDownlight);

    const windowLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    windowLight.position.set(-5, 4, 3);
    scene.add(windowLight);

    // 1. 3D Architectural Room (Isometric Corner)
    const roomGroup = new THREE.Group();

    // Floor
    const floorGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.0;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Left Wall
    const leftWallGeo = new THREE.PlaneGeometry(4.2, 3.8);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-2.1, 0.9, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    // Back Wall
    const backWall = new THREE.Mesh(leftWallGeo, wallMat);
    backWall.position.set(0, 0.9, -2.1);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // Ceiling Beam
    const beamGeo = new THREE.BoxGeometry(4.2, 0.15, 0.15);
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, 2.7, 0);
    roomGroup.add(beam);

    // 2. 3D Ceiling Fan hanging from ceiling center
    const fanPivot = new THREE.Group();
    const fanRod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 })
    );
    fanRod.position.set(0, 2.3, 0);
    roomGroup.add(fanRod);

    const fanRotor = new THREE.Group();
    fanRotor.position.set(0, 1.9, 0);
    const fanHub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.3, 0.15, 24),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7 })
    );
    fanRotor.add(fanHub);

    for (let b = 0; b < 3; b++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.015, 1.1),
        new THREE.MeshStandardMaterial({ color: 0x1e293b })
      );
      blade.position.set(0, 0, 0.65);
      blade.rotation.x = 0.12;
      const bladeArm = new THREE.Group();
      bladeArm.add(blade);
      bladeArm.rotation.y = (b / 3) * Math.PI * 2;
      fanRotor.add(bladeArm);
    }
    fanPivot.add(fanRotor);
    roomGroup.add(fanPivot);

    // 3. 3D Switch Plate on Left Wall
    const switchPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.45, 0.45),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
    );
    switchPlate.position.set(-2.05, 0.4, 0.5);
    roomGroup.add(switchPlate);

    // 4. 3D Sockets on Back Wall
    const socketPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.35, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
    );
    socketPlate.position.set(1.2, -0.4, -2.05);
    roomGroup.add(socketPlate);

    // 5. 3D Conduit Pipe Route along walls
    const conduitGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.6, 16);
    const conduitMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.3 });
    const vertConduit = new THREE.Mesh(conduitGeo, conduitMat);
    vertConduit.position.set(-2.06, 0.8, -0.5);
    roomGroup.add(vertConduit);

    scene.add(roomGroup);

    // 6. Interactive Hotspot Markers
    const hotspotPins = [];
    activeHotspots.forEach((h) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(h.pos[0], h.pos[1], h.pos[2]);

      const pinSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0xf59e0b,
          emissiveIntensity: 1.5
        })
      );
      pinGroup.add(pinSphere);

      const ringGeo = new THREE.RingGeometry(0.16, 0.22, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xfde047, side: THREE.DoubleSide });
      const pulseRing = new THREE.Mesh(ringGeo, ringMat);
      pulseRing.rotation.x = Math.PI / 2;
      pinGroup.add(pulseRing);

      scene.add(pinGroup);
      hotspotPins.push({ group: pinGroup, ring: pulseRing, data: h });
    });

    // Animation Loop
    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Spin fan in 3D room
      fanRotor.rotation.y += delta * 6;

      // Pulse hotspot rings
      hotspotPins.forEach((hp, idx) => {
        const scale = 1 + Math.sin(time * 3 + idx) * 0.25;
        hp.ring.scale.set(scale, scale, scale);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

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
  }, [activeRoom]);

  const selectedProduct = selectedHotspot 
    ? products.find(p => p.id === selectedHotspot.productId) || products[0]
    : null;

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-tr from-navy-950 via-navy-900 to-slate-900 border border-warm-200 shadow-xl flex flex-col justify-between">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge */}
      <div className="relative z-10 p-5 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-navy-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-navy-700 text-xs font-bold text-white">
          <Sparkles className="w-3.5 h-3.5 text-electric" />
          <span>3D Room Visualizer: {activeRoom.name}</span>
        </div>

        <div className="text-[10px] text-slate-300 font-mono bg-navy-950/80 px-2.5 py-1 rounded-lg border border-navy-700 hidden sm:block">
          Orbit 360° to view walls & ceiling
        </div>
      </div>

      {/* Bottom Floating Hotspots Bar */}
      <div className="relative z-10 p-4 sm:p-6 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider block">
            Click to Inspect 3D Electrical Fittings:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeHotspots.map(h => (
              <button
                key={h.id}
                onClick={() => setSelectedHotspot(h)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedHotspot?.id === h.id
                    ? 'bg-electric text-navy-950 shadow-md scale-105'
                    : 'bg-navy-900/90 text-white hover:bg-navy-800 border border-navy-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>{h.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Hotspot Product Card Preview */}
        {selectedProduct && (
          <div className="p-3 bg-navy-900/90 backdrop-blur-md rounded-2xl border border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase">{selectedProduct.brand}</span>
                <h4 className="text-xs font-black text-white line-clamp-1">{selectedProduct.name}</h4>
                <div className="text-[11px] font-mono font-bold text-electric">
                  ₹{selectedProduct.indicativePrice?.toLocaleString('en-IN')} per {selectedProduct.unit} (est.)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onOpen3D && (
                <button
                  onClick={() => onOpen3D(selectedProduct)}
                  className="flex-1 sm:flex-none px-3.5 py-2 bg-navy-800 hover:bg-navy-700 text-electric text-xs font-bold rounded-xl border border-navy-600 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect in 3D</span>
                </button>
              )}
              <button
                onClick={() => addToCart(selectedProduct, 1)}
                className="flex-1 sm:flex-none px-4 py-2 bg-electric hover:bg-amber-400 text-navy-950 text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
