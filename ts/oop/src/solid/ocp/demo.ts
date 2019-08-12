import Checkout from './Checkout';
import CashPaymentMethod from './CashPaymentMethod';
import BitcoinPaymentMethod from './BitcoinPaymentMethod';

const checkout = new Checkout();
const cash = checkout.begin(12, new CashPaymentMethod());
const bitcoin = checkout.begin(1555, new BitcoinPaymentMethod());

console.group('payments', cash, bitcoin);
