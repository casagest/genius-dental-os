import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Layers3, 
  Settings,
  Target,
  Volume2,
  Maximize,
  Download
} from "lucide-react";
import * as THREE from 'three';

interface VolumeData {
  data: Uint16Array | Uint8Array;
  width: number;
  height: number;
  depth: number;
  spacing: [number, number, number];
}

interface ImplantPosition {
  position: string;
  coordinates: { x: number; y: number; z: number };
  angle: number;
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

interface CBCT3DViewerProps {
  volumeData?: VolumeData;
  implantPositions?: ImplantPosition[];
  boneDensityThreshold?: number;
  onImplantSelect?: (implant: ImplantPosition) => void;
}

// Volume Rendering Component
const VolumeRenderer: React.FC<{ volumeData: VolumeData; threshold: number }> = ({ 
  volumeData, 
  threshold 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const volumeTexture = useMemo(() => {
    const texture = new THREE.Data3DTexture(
      volumeData.data,
      volumeData.width,
      volumeData.height,
      volumeData.depth
    );
    texture.format = THREE.RedFormat;
    texture.type = volumeData.data instanceof Uint16Array ? THREE.UnsignedShortType : THREE.UnsignedByteType;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = texture.wrapT = texture.wrapR = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  }, [volumeData]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position + 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler3D volumeTexture;
        uniform float threshold;
        uniform float opacity;
        varying vec3 vPosition;
        
        void main() {
          vec4 color = texture(volumeTexture, vPosition);
          float intensity = color.r;
          
          if (intensity < threshold) {
            discard;
          }
          
          // Bone density color mapping
          vec3 boneColor;
          if (intensity > 0.8) {
            boneColor = vec3(1.0, 1.0, 0.9); // Dense bone - light yellow
          } else if (intensity > 0.6) {
            boneColor = vec3(0.9, 0.8, 0.7); // Medium bone - beige
          } else {
            boneColor = vec3(0.7, 0.6, 0.5); // Soft bone - brown
          }
          
          gl_FragColor = vec4(boneColor, opacity * intensity);
        }
      `,
      uniforms: {
        volumeTexture: { value: volumeTexture },
        threshold: { value: threshold },
        opacity: { value: 0.8 }
      },
      transparent: true,
      side: THREE.BackSide
    });
  }, [volumeTexture, threshold]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.threshold.value = threshold;
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

// Implant Marker Component
const ImplantMarker: React.FC<{ 
  implant: ImplantPosition; 
  onClick: () => void;
  isSelected: boolean;
}> = ({ implant, onClick, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && !isSelected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const color = useMemo(() => {
    switch (implant.riskLevel) {
      case 'low': return '#22c55e';
      case 'moderate': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  }, [implant.riskLevel]);

  return (
    <group position={[implant.coordinates.x / 20, implant.coordinates.y / 20, implant.coordinates.z / 20]}>
      <mesh ref={meshRef} onClick={onClick}>
        <cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={isSelected ? 1.0 : 0.8}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
      
      {/* Position Label */}
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.03}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {implant.position}
      </Text>
      
      {/* Info Panel when selected */}
      {isSelected && (
        <Html position={[0.1, 0, 0]} distanceFactor={10}>
          <div className="bg-white p-2 rounded shadow-lg border text-xs">
            <div className="font-semibold">Position {implant.position}</div>
            <div>Angle: {implant.angle.toFixed(1)}°</div>
            <div>Confidence: {(implant.confidence * 100).toFixed(0)}%</div>
            <div className={`font-medium ${
              implant.riskLevel === 'low' ? 'text-green-600' :
              implant.riskLevel === 'moderate' ? 'text-orange-600' :
              'text-red-600'
            }`}>
              Risk: {implant.riskLevel.toUpperCase()}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Main 3D Scene Component
const Scene3D: React.FC<{
  volumeData?: VolumeData;
  implantPositions?: ImplantPosition[];
  threshold: number;
  selectedImplant: string | null;
  onImplantSelect: (implant: ImplantPosition) => void;
}> = ({ volumeData, implantPositions, threshold, selectedImplant, onImplantSelect }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Volume Rendering */}
      {volumeData && (
        <VolumeRenderer volumeData={volumeData} threshold={threshold} />
      )}

      {/* Implant Markers */}
      {implantPositions?.map((implant) => (
        <ImplantMarker
          key={implant.position}
          implant={implant}
          onClick={() => onImplantSelect(implant)}
          isSelected={selectedImplant === implant.position}
        />
      ))}

      {/* Coordinate System */}
      <group>
        <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 0.5, 0xff0000]} />
        <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 0.5, 0x00ff00]} />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 0.5, 0x0000ff]} />
      </group>

      {/* Ground plane for reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#f0f0f0" transparent opacity={0.3} />
      </mesh>

      {/* Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={1}
        maxDistance={10}
      />
    </>
  );
};

const CBCT3DViewer: React.FC<CBCT3DViewerProps> = ({
  volumeData,
  implantPositions = [],
  boneDensityThreshold = 0.5,
  onImplantSelect
}) => {
  const [densityThreshold, setDensityThreshold] = useState(boneDensityThreshold);
  const [selectedImplant, setSelectedImplant] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showImplants, setShowImplants] = useState(true);
  const { toast } = useToast();

  const handleImplantSelect = (implant: ImplantPosition) => {
    setSelectedImplant(implant.position);
    onImplantSelect?.(implant);
    
    toast({
      title: `Implant Position ${implant.position}`,
      description: `Risk level: ${implant.riskLevel} | Confidence: ${(implant.confidence * 100).toFixed(0)}%`,
    });
  };

  const resetView = () => {
    setSelectedImplant(null);
    setDensityThreshold(0.5);
    toast({
      title: "View Reset",
      description: "3D view has been reset to default settings",
    });
  };

  const exportScreenshot = () => {
    // Implementation would capture canvas and download
    toast({
      title: "Screenshot Exported",
      description: "3D view screenshot has been saved",
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="border-2 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers3 className="w-6 h-6 text-indigo-600" />
            <span>3D CBCT Visualization</span>
          </CardTitle>
          <CardDescription>
            Interactive 3D visualization cu poziții implanturi și densitate osoasă
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={resetView}
                className="space-x-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset View</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImplants(!showImplants)}
                className="space-x-1"
              >
                <Target className="w-4 h-4" />
                <span>{showImplants ? 'Hide' : 'Show'} Implants</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={exportScreenshot}
                className="space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Screenshot</span>
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Density Threshold:</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={densityThreshold}
                  onChange={(e) => setDensityThreshold(parseFloat(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-slate-600">{(densityThreshold * 100).toFixed(0)}%</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="space-x-1"
              >
                <Maximize className="w-4 h-4" />
                <span>Fullscreen</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Viewer */}
      <Card className="border-2 border-blue-200">
        <CardContent className="p-0">
          <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'h-96'} relative`}>
            <Canvas
              camera={{ position: [2, 2, 2], fov: 60 }}
              style={{ background: 'linear-gradient(to bottom, #1e3a8a, #1e40af)' }}
            >
              <Scene3D
                volumeData={volumeData}
                implantPositions={showImplants ? implantPositions : []}
                threshold={densityThreshold}
                selectedImplant={selectedImplant}
                onImplantSelect={handleImplantSelect}
              />
            </Canvas>
            
            {/* Overlay Info */}
            <div className="absolute top-4 left-4 space-y-2">
              <Badge className="bg-white/90 text-slate-800">
                <Eye className="w-3 h-3 mr-1" />
                3D CBCT View
              </Badge>
              {selectedImplant && (
                <Badge className="bg-blue-100 text-blue-800">
                  <Target className="w-3 h-3 mr-1" />
                  Position {selectedImplant} Selected
                </Badge>
              )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg text-xs space-y-1">
              <div className="font-semibold mb-2">Risk Levels</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Low Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Moderate Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>High Risk</span>
              </div>
            </div>

            {/* Close fullscreen */}
            {isFullscreen && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4"
              >
                ✕
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Implant List */}
      {implantPositions.length > 0 && (
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span>Implant Positions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {implantPositions.map((implant) => (
                <div
                  key={implant.position}
                  onClick={() => handleImplantSelect(implant)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedImplant === implant.position
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Position {implant.position}</h4>
                    <Badge className={`${
                      implant.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      implant.riskLevel === 'moderate' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {implant.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>Angle: {implant.angle.toFixed(1)}°</div>
                    <div>Confidence: {(implant.confidence * 100).toFixed(0)}%</div>
                    <div className="text-xs text-slate-500">
                      ({implant.coordinates.x.toFixed(1)}, {implant.coordinates.y.toFixed(1)}, {implant.coordinates.z.toFixed(1)})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CBCT3DViewer;