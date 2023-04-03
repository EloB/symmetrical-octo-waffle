// Fix TTL
export const cache: Record<string, HTMLImageElement> = {};

const createAsyncImage = (src: string) => {
  if (cache[src]) return cache[src];
  const image = new Image();
  image.src = src;
  return image.decode().then(() => {
    cache[src] = image;
    return image;
  });
};

export default createAsyncImage;
