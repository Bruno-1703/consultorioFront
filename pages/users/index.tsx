import { GetStaticProps } from "next";
import Link from "next/link";

import { User } from "../../interfaces";
import List from "../../components/List";
import { Layout } from "../../components/layout/Layout";

type Props = {
  items: User[];
};

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);



export default WithStaticProps;
