import express from 'express';
import { paymentController } from './payment.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post('/initiate/:orderId', auth(), paymentController.initiatePayment);
router.post('/success', paymentController.handlePaymentSuccess);
router.post('/fail', paymentController.handlePaymentFailure);
router.post('/cancel', paymentController.handlePaymentCancel);
router.post('/ipn', paymentController.handleIPN);

export const paymentRoutes = router;