export class PaymentConfig {
  prepareConfiguration(data) {
    const options = {
      key: "rzp_test_c0ALHfuoiS0luD", // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Careers Companion",
      description: "Payment for MBBS",
      handler: function (response: any) {
        let redirect_url;
        if (
          typeof response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1
        ) {
          alert("No payment");
          redirect_url = "/";
        } else {
          console.log("PAYMENT_RESPONSE", response);

          console.log(response.razorpay_payment_id);
        }
      },
      order_id: data.id,
      prefill: {
        name: "Krishna",
        email: "teja.krishna.akp@gmail.com",
        contact: "7396730681",
      },

      reminder_enable: true,
      notes: {
        note_key_1: "my_id",
        note_key_2: data.membership,
      },
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      // theme: {
      //   color: "#3399cc",
      // },
    };
    return options;
  }
}
