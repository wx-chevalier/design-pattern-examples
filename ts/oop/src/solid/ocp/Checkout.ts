import PaymentMethod from './IPaymentMethod';

class Checkout {
  begin(cost: number, payment: PaymentMethod): string {
    return payment.acceptPayment(cost);
  }
}

export default Checkout;
