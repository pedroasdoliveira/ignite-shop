import Head from "next/head";
import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";

import camiseta1 from "../assets/camisetas/1.png";
import camiseta2 from "../assets/camisetas/2.png";
import camiseta3 from "../assets/camisetas/3.png";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContainer>
        <Product>
          <Image src={camiseta1} width={520} height={480} alt="camiseta-1" />

          <footer>
            <strong>Camiseta x</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
      </HomeContainer>
    </div>
  );
}
