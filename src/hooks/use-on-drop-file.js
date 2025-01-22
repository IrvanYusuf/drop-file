import { fileToBase64 } from 'src/utils/file-to-base64';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useCallback } from 'react';

export const useHandleDropFile = (
  modelTypes = [],
  setFiles,
  files,
  navigate = false,
) => {
  const router = useRouter();
  // const onDrop = useCallback(
  //   async (acceptedFiles) => {
  //     console.log(acceptedFiles);
  //     const updatedFilesUpload = [...filesUpload, ...acceptedFiles];
  //     setFilesUpload(updatedFilesUpload);
  //     localStorage.setItem('files_upload', JSON.stringify(updatedFilesUpload));

  //     if (acceptedFiles.length > 0) {
  //       const fileURLs = await Promise.all(
  //         acceptedFiles.map(async (file) => {
  //           const fileExtension = file.name.split('.').pop();
  //           if (!modelTypes.includes(fileExtension)) {
  //             const url = await fileToBase64(file);
  //             return { type: fileExtension, url, file };
  //           } else {
  //             return { type: fileExtension, url: '', file };
  //           }
  //         })
  //       );

  //       console.log(files);
  //       console.log('file url', fileURLs);
  //       let addFiles;
  //       if (files) {
  //         setFiles((prevFiles) => prevFiles && [...prevFiles, ...fileURLs]);
  //         addFiles = [...files, ...fileURLs];
  //       } else {
  //         setFiles(fileURLs);
  //         addFiles = fileURLs;
  //       }

  //       localStorage.setItem('files', JSON.stringify(addFiles));

  //       // redirect ke post project
  //       if (navigate) {
  //         router.replace(paths.postProject);
  //       }
  //     }
  //   },
  //   [files]
  // );

  const onDrop = useCallback(
    async (acceptedFiles) => {
      console.log(acceptedFiles);


      if (acceptedFiles.length > 0) {
        const fileURLs = await Promise.all(
          acceptedFiles.map(async (file) => {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!modelTypes.includes(fileExtension)) {
              const url = await fileToBase64(file);
              return {
                type_ext: fileExtension,
                type_img: file.type,
                url,
                name: file.name,
                size: file.size,
                file, // Tetap simpan file asli
              };
            } else {
              // Jika tipe file diizinkan
              // const url = await fileToBase64(file);
              return {
                type_ext: fileExtension,
                type_img: file.type,
                url: '',
                name: file.name,
                size: file.size,
                file,
              };
            }
          })
        );

        console.log('file url', fileURLs);

        // Perbarui state dengan file baru
        let addFiles;
        if (files) {
          setFiles((prevFiles) => prevFiles && [...prevFiles, ...fileURLs]);
          addFiles = [...files, ...fileURLs];
        } else {
          setFiles(fileURLs);
          addFiles = fileURLs;
        }

        // Simpan file ke localStorage
        localStorage.setItem('files', JSON.stringify(addFiles));

        // Redirect ke halaman post project jika diperlukan
        if (navigate) {
          router.replace(paths.postProject);
        }
      }
    },
    [files]
  );

  return onDrop;
};
