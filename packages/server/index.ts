import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

const port = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

app.listen(port, () => {
   console.log(`App is listening on port ${port}`);
});
