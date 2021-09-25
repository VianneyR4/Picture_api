import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './src/routes/apiRouter';
import swaggerUi from 'swagger-ui-express';
import Docs from './swagger.json';
import fileUpload from 'express-fileupload';

import cors from 'cors';

const server = express();

server.use(cors());

server.use(fileUpload())

// ## body-parser config ...
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// ## documentation config with swagger ...
server.use('/api-docs',swaggerUi.serve, swaggerUi.setup(Docs));

// ## confige routes ...
server.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).json({'App': 'UjatCare Test App', 'message': `The server is running at ${port}`});
});
server.use('/api/v1/', apiRouter.router);

// ## launch server ...
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server running at: localhost:' + port);
})