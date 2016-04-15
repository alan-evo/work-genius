import fs from 'fs';
import r from 'rethinkdb';
import multer from 'multer';
import { UPLOAD_FILE_LOCATION } from '../../constants/configurations.js';
import { SERVER_FILES_URL } from '../../../src/constants/config';
// Constants
import { DB_HOST, DB_PORT } from '../../constants/configurations.js';

export const fileUploadHandler = async (req, res) => {
  const upload = multer({dest: UPLOAD_FILE_LOCATION}).single('file');
  upload(req, res, async (err) => {
    if (err) {
      res.status(err.status).send({
        error: err
      });
      return;
    }
    const {
      filename,
      mimetype,
      originalname
    } = req.file;

    try {
      const createdAt = new Date().getTime();
      const fileMetadata = {
        id: filename,
        type: mimetype,
        name: originalname,
        url: `${SERVER_FILES_URL}/${filename}`,
        createdAt
      };
      const query = r.db('work_genius').table('files').insert(fileMetadata);
      const connection = await r.connect({ host: DB_HOST, port: DB_PORT });
      await query.run(connection);
      await connection.close();
      res.status(200).send(fileMetadata);
    } catch (dbErr) {
      res.status(dbErr.status).send({
        error: dbErr
      });
    }
  });
};

export const fileDeleteHandler = async (req, res) => {
  try {
    const fileId = req.params.id;
    const query = r.db('work_genius').table('files')
          .get(fileId).delete();
    const connection = await r.connect({ host: DB_HOST, port: DB_PORT });
    await query.run(connection);
    fs.unlink(`files/${fileId}`, deleteErr => {
      // not sure why catch didn't handle this error
      // if (deleteErr) {
      //   throw deleteErr;
      // }
      res.status(204).end();
    });
  } catch (err) {
    res.status(err.status).send({
      error: err
    });
  }
};
