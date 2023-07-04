import { Link } from "react-router-dom";

import successImg from "../../assets/images/payment/success-img.jpeg";

export default function PaymentSuccess() {
  return (
    <main className="flex flex-row items-center justify-center gap-4">
      <div className="h-[100vh] w-1/2">
        <img
          src={successImg}
          alt="Payment Success"
          className="h-[100vh] w-full object-cover object-center"
        />
      </div>

      <div className="w-1/2 px-12">
        <h1 className="text-sm font-semibold text-cyan-800">
          Payment successful
        </h1>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Thanks for ordering
        </p>
        <p className="mt-2 text-base text-gray-500">
          We appreciate your order, we’re currently processing it. So hang tight
          and we’ll send you confirmation very soon!
        </p>

        <div className="mt-16 border-t border-gray-200 py-4 text-right">
          <Link
            to="/"
            className="text-sm font-semibold text-cyan-800 hover:text-cyan-900 hover:underline"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
