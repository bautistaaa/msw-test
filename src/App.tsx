import type { TypedDocumentNode } from "@apollo/client";
import { gql, useSuspenseQuery } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";

import "./App.css";

const APP_QUERY: TypedDocumentNode<{
  products: {
    id: string;
    title: string;
    mediaUrl: string;
    reviews: Array<{ rating: number; id: string }>;
  }[];
}> = gql`
  query AppQuery {
    products {
      id
      reviews {
        id
        rating
      }
      title
      mediaUrl
    }
  }
`;

export function App() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    async function fetchData() {
      await fetch("/greeting")
        .then((res) => res.json())
        .then((data) => {
          setGreeting(data);
        });
    }

    fetchData();
  }, []);

  // Use useSuspenseQuery here because we want to demo the loading experience
  // with/without defer.
  const { data } = useSuspenseQuery(APP_QUERY);

  return (
    <Container>
      <div>{greeting}</div>
      {data.products.map((product) => (
        <Product key={product.id} product={product}>
          <Reviews reviews={product.reviews} />
        </Product>
      ))}
    </Container>
  );
}

// BOILERPLATE
function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {children}
        </div>
      </div>
    </div>
  );
}

type Product = {
  id: string;
  mediaUrl: string | null | undefined;
  title: string | null | undefined;
};

function Product({
  children,
  product,
}: {
  children: ReactNode;
  product: Product;
}) {
  return (
    <div key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.mediaUrl || ""}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{children}</p>
      </div>
    </div>
  );
}

type ReviewType = { rating: number; id: string };

function Reviews({ reviews }: { reviews: Array<ReviewType> }) {
  return reviews?.length > 0
    ? `${Math.round(
        reviews
          ?.map((i) => i.rating)
          .reduce((curr, acc) => {
            return curr + acc;
          }) / reviews.length,
      )}/5`
    : "-";
}
