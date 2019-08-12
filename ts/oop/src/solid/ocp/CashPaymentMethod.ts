import PaymentMethod from './IPaymentMethod';

class CashPaymentMethod implements PaymentMethod {
  acceptPayment(total: number): string {
    return `cashpayment used: total is ${total}`;
  }
}

export default CashPaymentMethod;
