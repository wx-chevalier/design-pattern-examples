import PaymentMethod from './PaymentMethodI';

class BitcoinPaymentMethod implements PaymentMethod {
  acceptPayment(total: number) : string {
    return `Bitcoin used: total of ${total}`;
  }
}

export default BitcoinPaymentMethod;