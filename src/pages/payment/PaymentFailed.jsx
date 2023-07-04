import { Link } from "react-router-dom";

import failedImg from "../../assets/images/payment/failed-img.jpeg";

export default function PaymentFailed() {
  return (
    <main className="flex flex-row items-center justify-center gap-4">
      <div className="h-[100vh] w-1/2">
        <img
          src={failedImg}
          alt="Payment Failed"
          className="h-[100vh] w-full object-cover object-center"
        />
      </div>

      <div className="w-1/2 px-12">
        <h1 className="text-sm font-semibold text-cyan-800">Payment failed</h1>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Oops...! Sorry
        </p>
        <p className="mt-2 text-base text-gray-500">
          Something went wrong! Please try again later after some time!
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
