import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>Comics fetched from API</h1>
    <ul>
      {props.comics.map(comic => (
        <li key={comic._id}>
          <Link href="/p/[id]" as={`/p/${comic._id}`}>
            <a>{comic.serieTitle} #{comic.issueNumber}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3001/comics');
  const data = await res.json();
 
  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    comics: data.map(entry => entry)
  };
};

export default Index;
