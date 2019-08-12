interface IPaymentMethod {
  acceptPayment(total: number): string;
}

export default IPaymentMethod;
