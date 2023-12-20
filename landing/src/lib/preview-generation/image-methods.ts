export function getImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (el: any, err: ErrorEvent) => {
      reject(err.error);
    };
  });
}
export async function downscaleImage(
  dataUrl: string,
  imageType: string, // e.g. 'image/jpeg'
  resolution: number, // max width/height in pixels
  quality: number, // e.g. 0.9 = 90% quality
): Promise<string> {
  // Create a temporary image so that we can compute the height of the image.
  const image = await getImage(dataUrl);
  const oldWidth = image.naturalWidth;
  const oldHeight = image.naturalHeight;

  const longestDimension = oldWidth > oldHeight ? "width" : "height";
  const currentRes = longestDimension == "width" ? oldWidth : oldHeight;

  if (currentRes > resolution) {
    const newSize =
      longestDimension == "width"
        ? Math.floor((oldHeight / oldWidth) * resolution)
        : Math.floor((oldWidth / oldHeight) * resolution);
    const newWidth = longestDimension == "width" ? resolution : newSize;
    const newHeight = longestDimension == "height" ? resolution : newSize;

    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the downscaled image on the canvas and return the new data URL.
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    const newDataUrl = canvas.toDataURL(imageType, quality);
    return newDataUrl;
  } else {
    return dataUrl;
  }
}
