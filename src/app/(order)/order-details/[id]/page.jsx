import React from "react";

const OrderDetails = ({ params, searchParams }) => {
  const { id } = params;
  const { hello } = searchParams;

  console.log(id);
  console.log(hello);

  // http://localhost:3000/order-details/2?hello=hi
  return (
    <div>
      params {id}
      <div>searchParams {hello} </div>
    </div>
  );
};

export default OrderDetails;
