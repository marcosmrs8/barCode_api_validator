import express from 'express';
import cors from 'cors';
import routes from './routes/barCode.routes.js';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(routes);

const listener = app.listen(8080, () => {
    console.log("App is listening on port " + listener.address().port);
});

export { app };