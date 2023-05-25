export function getFileType(url: string) {
  // Extract the file extension from the URL
  const extension = url.split('.')?.pop()?.toLowerCase();

  const videoExtensions = ['mp4', 'mpeg', 'avi', 'mov', 'webm', 'wmv'];

  if (!extension) {
    return;
  }

  if (videoExtensions.includes(extension)) {
    return 'video';
  }

  return 'image';
}
