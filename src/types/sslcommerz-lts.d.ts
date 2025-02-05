declare module "sslcommerz-lts" {
  import { SSLCommerzPayment } from "sslcommerz-lts/types";

  const sslcommerz: {
    init: (options: any) => SSLCommerzPayment;
  };

  export default sslcommerz;
}
