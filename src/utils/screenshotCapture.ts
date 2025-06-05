
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

// New function to capture website URL as screenshot
export const captureWebsiteScreenshot = async (
  url: string, 
  options: ScreenshotOptions = {}
): Promise<string> => {
  const {
    width = 1200,
    height = 630,
    format = 'png',
    quality = 0.9
  } = options;

  try {
    console.log(`📸 Capturing screenshot for: ${url}`);
    
    // Create iframe to load the website
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;
    iframe.style.border = 'none';
    iframe.style.zIndex = '-1';
    
    document.body.appendChild(iframe);

    // Load the website in iframe
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        document.body.removeChild(iframe);
        reject(new Error('Screenshot capture timeout'));
      }, 10000);

      iframe.onload = async () => {
        try {
          clearTimeout(timeout);
          
          // Wait a bit for content to render
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          if (window.html2canvas && iframe.contentDocument) {
            const canvas = await window.html2canvas(iframe.contentDocument.body, {
              width,
              height,
              useCORS: true,
              allowTaint: true,
              scale: 1
            });
            
            document.body.removeChild(iframe);
            resolve(canvas.toDataURL(`image/${format}`, quality));
          } else {
            // Fallback: create a simple preview image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
              throw new Error('Could not get canvas context');
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#1e293b');
            gradient.addColorStop(1, '#475569');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // Add website URL
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 32px system-ui';
            ctx.textAlign = 'center';
            ctx.fillText('Website Preview', width / 2, height / 2 - 40);
            
            ctx.font = '24px system-ui';
            ctx.fillStyle = '#cbd5e1';
            ctx.fillText(url, width / 2, height / 2 + 20);
            
            document.body.removeChild(iframe);
            resolve(canvas.toDataURL(`image/${format}`, quality));
          }
        } catch (error) {
          document.body.removeChild(iframe);
          reject(error);
        }
      };

      iframe.onerror = () => {
        clearTimeout(timeout);
        document.body.removeChild(iframe);
        reject(new Error('Failed to load website'));
      };

      iframe.src = url.startsWith('http') ? url : `https://${url}`;
    });
    
  } catch (error) {
    console.error('Website screenshot capture failed:', error);
    throw error;
  }
};
