import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, Check, FlipHorizontal, AlertCircle } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onCancel: () => void;
  handType: 'left' | 'right';
  onHandTypeChange: (hand: 'left' | 'right') => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onCancel,
  handType,
  onHandTypeChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Initialize camera stream
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    setIsInitializing(true);
    setCameraError(null);

    const startCamera = async () => {
      try {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        currentStream = mediaStream;
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
        setIsInitializing(false);
      } catch (err: any) {
        console.error('Camera access error:', err);
        setCameraError(
          err.name === 'NotAllowedError'
            ? 'Camera permission was denied. Please allow camera access in browser settings or upload from gallery.'
            : 'Unable to start camera stream. You can upload an image file from your device gallery instead.'
        );
        setIsInitializing(false);
      }
    };

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Capture snapshot from video onto canvas
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // If using user-facing camera, flip horizontally for mirror realism
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
  };

  const retake = () => {
    setCapturedImage(null);
  };

  const confirmAndProceed = () => {
    if (capturedImage) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      onCapture(capturedImage);
    }
  };

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white z-10">
        <button
          onClick={onCancel}
          className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hand Toggle */}
        <div className="flex bg-slate-900/90 border border-amber-500/30 rounded-full p-1 text-xs">
          <button
            onClick={() => onHandTypeChange('left')}
            className={`px-3 py-1.5 rounded-full font-medium transition-all ${
              handType === 'left'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Left Hand
          </button>
          <button
            onClick={() => onHandTypeChange('right')}
            className={`px-3 py-1.5 rounded-full font-medium transition-all ${
              handType === 'right'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Right Hand
          </button>
        </div>

        <button
          onClick={toggleCameraFacing}
          className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Switch Camera"
        >
          <FlipHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Viewfinder View */}
      <div className="relative flex-1 my-3 rounded-3xl overflow-hidden bg-slate-950 flex items-center justify-center border border-purple-900/40 shadow-inner">
        {cameraError ? (
          <div className="max-w-md p-6 text-center text-rose-300 space-y-3">
            <AlertCircle className="w-12 h-12 mx-auto text-rose-400" />
            <h3 className="text-lg font-bold">Camera Access Restricted</h3>
            <p className="text-xs text-slate-400">{cameraError}</p>
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs mt-2 hover:bg-amber-400"
            >
              Choose from Gallery Instead
            </button>
          </div>
        ) : capturedImage ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={capturedImage}
              alt="Captured Palm"
              className="max-h-full max-w-full object-contain rounded-2xl"
            />
            <div className="absolute top-4 left-4 bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-xs px-3 py-1 rounded-full font-medium">
              Ready for AI Reading
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              playsInline
              muted
              className={`w-full h-full object-cover ${
                facingMode === 'user' ? 'scale-x-[-1]' : ''
              }`}
            />

            {/* Palm Guide Silhouette Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div className="w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] border-2 border-dashed border-amber-400/60 rounded-[60px] flex items-center justify-center relative shadow-[0_0_50px_rgba(234,179,8,0.15)]">
                {/* Finger line hints */}
                <div className="absolute top-4 flex gap-6 text-amber-300/40 text-[9px] font-mono">
                  <span>Index</span>
                  <span>Middle</span>
                  <span>Ring</span>
                  <span>Little</span>
                </div>
                {/* Center scan crosshair */}
                <div className="w-8 h-8 border-t-2 border-l-2 border-amber-400/80 absolute top-6 left-6" />
                <div className="w-8 h-8 border-t-2 border-r-2 border-amber-400/80 absolute top-6 right-6" />
                <div className="w-8 h-8 border-b-2 border-l-2 border-amber-400/80 absolute bottom-6 left-6" />
                <div className="w-8 h-8 border-b-2 border-r-2 border-amber-400/80 absolute bottom-6 right-6" />

                <div className="text-center px-4 py-2 rounded-xl bg-black/60 backdrop-blur border border-amber-400/30 text-amber-200 text-xs">
                  Place {handType} palm flat inside guide with good lighting
                </div>
              </div>
            </div>

            {isInitializing && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
              </div>
            )}
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Bottom Shutter Controls */}
      <div className="flex items-center justify-center gap-6 py-2 z-10">
        {capturedImage ? (
          <>
            <button
              onClick={retake}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-semibold text-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Photo
            </button>
            <button
              onClick={confirmAndProceed}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-sm hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all"
            >
              <Check className="w-4 h-4" />
              Analyze This Palm
            </button>
          </>
        ) : (
          <button
            onClick={takeSnapshot}
            disabled={isInitializing || !!cameraError}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 border-amber-400 p-1 bg-transparent hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(234,179,8,0.5)] flex items-center justify-center disabled:opacity-50"
            title="Take Photo"
          >
            <div className="w-full h-full rounded-full bg-amber-400 flex items-center justify-center text-black">
              <Camera className="w-8 h-8" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
