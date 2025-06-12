
import { useState } from "react";
import { BeforeAfterImage } from "@/types/project";

interface BeforeAfterSliderProps {
  images: BeforeAfterImage[];
}

const BeforeAfterSlider = ({ images }: BeforeAfterSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseInt(e.target.value));
  };

  return (
    <div className="space-y-6">
      {images.map((imageSet, index) => (
        <div key={index} className="space-y-4">
          {imageSet.caption && (
            <h4 className="text-lg font-semibold text-slate-800">{imageSet.caption}</h4>
          )}
          
          <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-lg">
            {/* Before Image (Background) */}
            <img
              src={imageSet.before}
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* After Image (Overlay with clip-path) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`
              }}
            >
              <img
                src={imageSet.after}
                alt="After"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
              Before
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
              After
            </div>
            
            {/* Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BeforeAfterSlider;
