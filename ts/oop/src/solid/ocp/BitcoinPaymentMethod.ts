import PaymentMethod from './IPaymentMethod';

class BitcoinPaymentMethod implements PaymentMethod {
  acceptPayment(total: number): string {
    return `Bitcoin used: total of ${total}`;
  }
}

export default BitcoinPaymentMethod;
