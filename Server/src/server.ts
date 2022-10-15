import dotenv from 'dotenv';
import {
  application
} from 'express';
import { PORT } from './utils/environments';
import appServer from './app';

dotenv.config();
appServer()
  .then((app: typeof application) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-unused-vars

    app.listen(PORT, () => {
      console.log(`Server Ready on port ${PORT} ${process.env.NODE_ENV}`);
    });
  })
  .catch((err: Partial<Error> & unknown) => console.log(err));