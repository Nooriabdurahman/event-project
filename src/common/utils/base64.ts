export const convertToBase64 = (image: string): string => {
  if (image.startsWith('data:image')) {
    return image;
  }
  return `data:image/png;base64,${Buffer.from(image).toString('base64')}`;
};