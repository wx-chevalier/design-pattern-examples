interface PaymentMethod {
  acceptPayment(total: number) : string;
}

export default PaymentMethod;