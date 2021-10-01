import { extname } from 'path-posix';

export const fileFilter = (req, file, callback) => {
  if (
    [
      'text/vnd.trolltech.linguist',
      'text/javascript',
      'image/bmp',
      'application/x-ms-dos-executable',
    ].includes(file.mimetype) ||
    file.originalname.match(/\.(ts|exe|js|bmp)$/)
  ) {
    req.fileError = 'ts, exe, js and bmp files are not allowed!';
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
