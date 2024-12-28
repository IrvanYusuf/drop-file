import { fileToBase64 } from 'src/utils/file-to-base64';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useCallback } from 'react';

export const useHandleDropFile = (modelTypes = [], setFiles, files, navigate = false) => {
  const router = useRouter();
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const fileURLs = await Promise.all(
          acceptedFiles.map(async (file) => {
            const fileExtension = file.name.split('.').pop();
            if (!modelTypes.includes(fileExtension)) {
              const url = await fileToBase64(file);
              return { type: fileExtension, url, file };
            } else {
              return { type: fileExtension, url: '', file };
            }
          })
        );

        setFiles((prevFiles) => prevFiles && [...prevFiles, ...fileURLs]);
        const addFiles = [...files, ...fileURLs];
        localStorage.setItem('files', JSON.stringify(addFiles));

        // redirect ke post project
        if (navigate) {
          router.replace(paths.postProject);
        }
      }
    },
    [files]
  );

  return onDrop;
};
