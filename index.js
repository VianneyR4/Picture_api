import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './src/routes/apiRouter';
import swaggerUi from 'swagger-ui-express';
import Docs from './swagger.json';
import path from 'path';

import uploadFileMid from "./src/middlewares/uploadFile";

import cors from 'cors';

const server = express();

server.use(cors());

// ## body-parser config ...
server.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
server.use(bodyParser.json({
  limit: '50mb',
}));

// ## documentation config with swagger ...
server.use('/api-docs',swaggerUi.serve, swaggerUi.setup(Docs));

// ## static directory ...
server.use(express.static(path.join(__dirname, '/static')));

// ## confige routes ...
server.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).json({'App': 'UjatCare Test App', 'message': `The server is running at ${port}`});
});
server.use('/api/v1/', apiRouter.router);


// test multer ...
server.post("/uploadfile", uploadFileMid.single('image_image'), (req, res) => {
  res.status(201).json({"msg": "successful" });
});
// end test multer ...


// ## launch server ...
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server running at: localhost:' + port);
})