import { Router } from 'express';
import {validTicket} from '../controller/boletoController.js'

const routes = new Router()
routes.get('/boleto/:boleto', validTicket);

export default routes;