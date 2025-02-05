import { Request, Response, NextFunction } from 'express';
import { paymentService } from './payment.service';
import { catchAsync } from '../../utils/catchAsync';

export const paymentController = {
  initiatePayment: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { orderId } = req.params;
      const result = await paymentService.initiatePayment(orderId);
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  ),

  handlePaymentSuccess: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const order = await paymentService.handlePaymentSuccess(req.body);
      res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
    }
  ),

  handlePaymentFailure: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const order = await paymentService.handlePaymentFailure(req.body);
      res.redirect(`${process.env.FRONTEND_URL}/payment/failed`);
    }
  ),

  handlePaymentCancel: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      res.redirect(`${process.env.FRONTEND_URL}/payment/cancelled`);
    }
  ),

  handleIPN: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // Handle IPN (Instant Payment Notification)
      res.status(200).json({ received: true });
    }
  ),
};