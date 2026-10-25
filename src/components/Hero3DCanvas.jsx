import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sparkles, RotateCw, Maximize2 } from 'lucide-react';

export default function Hero3DCanvas({ onOpenViewer }) {
  const mountRef = useRef(null);
  const [activeModel, setActiveModel] = useState('wire'); // 'wire' | 'switch' | 'fan' | 'mcb'

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 2.2, 4.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.enableZoom = false; // keep hero banner stable on page scroll

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const mainLight = new THREE.SpotLight(0xfffbeb, 4.5);
    mainLight.position.set(4, 7, 4);
    mainLight.penumbra = 0.6;
    scene.add(mainLight);

    const cyanRim = new THREE.PointLight(0x38bdf8, 3, 10);
    cyanRim.position.set(-4, -1, -3);
    scene.add(cyanRim);

    const goldRim = new THREE.DirectionalLight(0xf59e0b, 2.5);
    goldRim.position.set(2, 3, -4);
    scene.add(goldRim);

    // Particle Stars / Electrical Sparks in 3D Background
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePos[p] = (Math.random() - 0.5) * 8;
      particlePos[p + 1] = (Math.random() - 0.5) * 6;
      particlePos[p + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.04,
      transparent: true,
      opacity: 0.7
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Model Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    let animatedMesh = null;

    // Materials
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xcd7f32,
      metalness: 0.95,
      roughness: 0.15
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2
    });

    // 1. WIRE COIL MODEL
    if (activeModel === 'wire') {
      const wireGroup = new THREE.Group();
      const wireMat = new THREE.MeshStandardMaterial({
        color: 0xdc2626, // Goldmedal / Polycab Red
        roughness: 0.35,
        metalness: 0.15
      });

      for (let i = 0; i < 16; i++) {
        const radiusOffset = (i % 3) * 0.08;
        const heightOffset = (Math.floor(i / 3) - 2.5) * 0.11;
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.15 + radiusOffset, 0.065, 12, 40),
          wireMat
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = heightOffset;
        wireGroup.add(ring);
      }

      // Brand Ribbon
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#B91C1C';
      ctx.fillRect(0, 0, 512, 128);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GOLDMEDAL & POLYCAB', 256, 50);
      ctx.fillStyle = '#FEF08A';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('100% PURE COPPER WIRE', 256, 90);

      const bandTex = new THREE.CanvasTexture(canvas);
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(1.3, 1.3, 0.42, 32, 1, true),
        new THREE.MeshStandardMaterial({ map: bandTex, roughness: 0.4, side: THREE.DoubleSide })
      );
      wireGroup.add(band);

      // Exposed Copper Tip
      const leadCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(1.2, 0.1, 0),
        new THREE.Vector3(1.5, 0.5, 0.2),
        new THREE.Vector3(1.6, 1.0, 0.4),
        new THREE.Vector3(1.4, 1.4, 0.6)
      );
      wireGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leadCurve, 16, 0.075, 10, false), wireMat));

      // 7 strands of bright copper
      for (let s = 0; s < 7; s++) {
        const angle = (s / 7) * Math.PI * 2;
        const strand = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.35, 8), copperMat);
        strand.position.set(1.4 + Math.cos(angle) * 0.025, 1.55, 0.6 + Math.sin(angle) * 0.025);
        strand.rotation.z = -0.15;
        wireGroup.add(strand);
      }

      rootGroup.add(wireGroup);
      animatedMesh = wireGroup;
    }

    // 2. MODULAR SWITCH
    else if (activeModel === 'switch') {
      const switchGroup = new THREE.Group();
      // Plate
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 2.3, 0.2),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15, metalness: 0.05 })
      );
      switchGroup.add(plate);

      // Gold Trim
      const trim = new THREE.Mesh(new THREE.BoxGeometry(2.36, 2.36, 0.05), brassMat);
      trim.position.z = -0.05;
      switchGroup.add(trim);

      // Rocker
      const rocker = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.2, 0.22),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 })
      );
      rocker.position.z = 0.2;
      rocker.rotation.x = 0.22;
      switchGroup.add(rocker);

      // LED Indicator
      const ind = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 2.5 })
      );
      ind.position.set(0, 0.35, 0.32);
      switchGroup.add(ind);

      rootGroup.add(switchGroup);
      animatedMesh = switchGroup;
    }

    // 3. CEILING FAN
    else if (activeModel === 'fan') {
      const fanGroup = new THREE.Group();
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 1.6, 16),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 })
      );
      rod.position.y = 0.9;
      fanGroup.add(rod);

      const rotatingHub = new THREE.Group();
      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.45, 0.32, 32),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.2 })
      );
      rotatingHub.add(hub);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.03, 16, 32), brassMat);
      ring.rotation.x = Math.PI / 2;
      rotatingHub.add(ring);

      for (let b = 0; b < 3; b++) {
        const bladeArm = new THREE.Group();
        const blade = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.02, 1.8),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.4, roughness: 0.3 })
        );
        blade.position.set(0, 0, 1.1);
        blade.rotation.x = 0.15;
        bladeArm.add(blade);
        bladeArm.rotation.y = (b / 3) * Math.PI * 2;
        rotatingHub.add(bladeArm);
      }

      fanGroup.add(rotatingHub);
      rootGroup.add(fanGroup);
      animatedMesh = rotatingHub;
    }

    // 4. MCB
    else {
      const mcbGroup = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 2.3, 1.7),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 })
      );
      mcbGroup.add(body);

      const lever = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.45, 0.35),
        new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.3 })
      );
      lever.position.set(0, 0.2, 0.95);
      lever.rotation.x = 0.35;
      mcbGroup.add(lever);

      const flag = new THREE.Mesh(
        new THREE.PlaneGeometry(0.28, 0.14),
        new THREE.MeshBasicMaterial({ color: 0xdc2626 })
      );
      flag.position.set(0, -0.2, 0.86);
      mcbGroup.add(flag);

      rootGroup.add(mcbGroup);
      animatedMesh = mcbGroup;
    }

    // Animation Loop
    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Slow particle float
      particles.rotation.y = time * 0.04;

      // Model-specific animation
      if (activeModel === 'fan' && animatedMesh) {
        animatedMesh.rotation.y += delta * 8; // smooth spinning fan
      } else if (animatedMesh) {
        animatedMesh.position.y = Math.sin(time * 1.6) * 0.08;
      }

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
  }, [activeModel]);

  return (
    <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-tr from-navy-950 via-navy-900 to-slate-900 border border-navy-700/80 shadow-2xl backdrop-blur-md">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="px-3 py-1 bg-navy-800/90 border border-navy-600 text-[11px] font-black text-amber-300 rounded-full flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-electric animate-spin" />
          <span>Real-Time 3D Engine</span>
        </span>
      </div>

      {/* Fullscreen 3D Inspector Launcher Button */}
      {onOpenViewer && (
        <button
          onClick={() => onOpenViewer(activeModel)}
          className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-electric hover:bg-amber-400 text-navy-950 text-xs font-black rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
          title="Open Full 3D Studio"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Inspect 3D Studio</span>
        </button>
      )}

      {/* Bottom Switcher: Wire / Switch / Fan / MCB */}
      <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between gap-2 bg-navy-950/80 backdrop-blur-md p-2 rounded-2xl border border-navy-700/80">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'wire', label: 'Polycab/Goldmedal Wire' },
            { id: 'switch', label: 'Modular Switch' },
            { id: 'fan', label: '1200mm Ceiling Fan' },
            { id: 'mcb', label: 'DIN MCB' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setActiveModel(m.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                activeModel === m.id
                  ? 'bg-electric text-navy-950 shadow-md scale-105 font-black'
                  : 'bg-navy-900/80 text-slate-300 hover:bg-navy-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="text-[10px] text-slate-400 font-mono hidden sm:flex items-center gap-1 flex-shrink-0">
          <RotateCw className="w-3 h-3 text-electric" />
          <span>Drag 360°</span>
        </div>
      </div>
    </div>
  );
}
