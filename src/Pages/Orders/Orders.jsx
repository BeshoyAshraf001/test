import { useContext } from "react";
import { userContext } from "../../components/Context/userData.Context";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Orders() {
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userOrders", id],
    queryFn: () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then((res) => res.data),
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error fetching orders. Please try again later.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>

      <section className="p-6 bg-gray-50 space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="orders border border-gray-300 shadow-lg rounded-lg bg-white overflow-hidden"
            >
              {/* Header Section */}
              <header className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order ID
                  </h2>
                  <span className="text-sm text-gray-500"># {order.id}</span>
                </div>
                <div className="text-right space-y-1">
                  {order.isPaid ? (
                    <span className="block text-sm text-green-600 font-medium">
                      تم الدفع
                    </span>
                  ) : (
                    <span className="block text-sm text-red-600 font-medium">
                      لم يتم الدفع
                    </span>
                  )}
                </div>
              </header>

              {/* Product Items */}
              {order.cartItems.map((product) => (
                <div
                  key={product._id}
                  className="product-item flex items-center p-4 gap-4 border-t border-gray-200"
                >
                  <picture className="size-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.product.imageCover}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-800">
                      {product.product.title}
                    </h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold text-gray-700">
                          Count:
                        </span>{" "}
                        {product.count}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Price:{" "}
                        </span>
                        {product.price} L.E
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center">No orders found.</div>
        )}
      </section>
    </>
  );
}
