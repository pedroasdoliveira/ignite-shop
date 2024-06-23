import Link from "next/link";
import { SuccessContainer, ImageContainer } from "../../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

const Success = ({ customerName, product }: SuccessProps) => {
  return (
    <>
      <Head>
        <title>Checkout sucesso | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={120}
            height={110}
            alt="Produto"
          />
        </ImageContainer>

        <p>
          <strong>{customerName}</strong>, sua <strong>{product.name}</strong>{" "}
          foi efetuada com sucesso e logo chegará a você.
        </p>

        <Link href={"/"}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps<SuccessProps> = async ({
  query,
}) => {
  const { session_id } = query;

  if (typeof session_id === "undefined") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
