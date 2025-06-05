
export interface ScreenshotOptions {
  width?: number;
  height?: number;
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number;
  selector?: string;
}

export const captureElementScreenshot = async (
  element: HTMLElement,
  options: ScreenshotOptions = {}
): Promise<string> => {
  const {
    width = 1200,
    height = 630,
    format = 'png',
    quality = 0.9
  } = options;

  try {
    // Create a canvas to capture the element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Get element bounds
    const rect = element.getBoundingClientRect();
    
    // Create a temporary container for better capture
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '0';
    tempContainer.style.left = '0';
    tempContainer.style.width = `${width}px`;
    tempContainer.style.height = `${height}px`;
    tempContainer.style.zIndex = '9999';
    tempContainer.style.background = 'white';
    tempContainer.style.overflow = 'hidden';
    
    // Clone the element
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.transform = 'scale(1)';
    clonedElement.style.transformOrigin = 'top left';
    
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Wait for any animations/images to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Use html2canvas if available, otherwise fallback to basic capture
    if (window.html2canvas) {
      const canvasResult = await window.html2canvas(tempContainer, {
        width,
        height,
        useCORS: true,
        allowTaint: true,
        scale: 1
      });
      
      document.body.removeChild(tempContainer);
      return canvasResult.toDataURL(`image/${format}`, quality);
    } else {
      // Fallback: use canvas API directly
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      
      // Add some basic styling
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 48px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Hero Section Preview', width / 2, height / 2);
      
      document.body.removeChild(tempContainer);
      return canvas.toDataURL(`image/${format}`, quality);
    }
  } catch (error) {
    console.error('Screenshot capture failed:', error);
    throw error;
  }
};

export const captureHeroSection = async (options: ScreenshotOptions = {}) => {
  const heroElement = document.querySelector('section') as HTMLElement;
  
  if (!heroElement) {
    throw new Error('Hero section not found');
  }
  
  return captureElementScreenshot(heroElement, {
    width: 1200,
    height: 630,
    format: 'png',
    quality: 0.9,
    ...options
  });
};
