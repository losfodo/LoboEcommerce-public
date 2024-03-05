export const paymentMethods = [
  {
    name: "Paypal",
    id: "paypal",
    description:
      "Se você não possui uma conta paypal, também pode pagar via paypal com seu cartão de crédito ou cartão de débito bancário. O pagamento pode ser enviado em uma moeda!",
    images: [],
  },
  {
    name: "Credit Card",
    id: "credit_card",
    description: "",
    images: [
      "visa",
      "mastercard",
      "paypal",
      "maestro",
      "american_express",
      "cb",
      "jcb",
    ],
  },
  {
    name: "Dinheiro ou Boleto",//name: "Cash",
    id: "cash",
    description:
      "nesse caso entraremos em contato via WhatsApp para acertarmos sobre o local e a data do pagamento no caso do boleto enviaremos pelo seu WhatsApp ou Email !",
    images: [],
  },
];
