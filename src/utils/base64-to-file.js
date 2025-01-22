const base64ToFile = (base64String, fileName, mimeType) => {
  const byteString = atob(base64String.split(',')[1]);
  const mime = mimeType || base64String.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], fileName, { type: mime });
};
