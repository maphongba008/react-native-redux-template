export const getVideoId = (url: string) => {
  if (!url) {
    return '';
  }
  const urls = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return urls[2] !== undefined ? urls[2].split(/[^0-9a-z_-]/i)[0] : urls[0];
};
