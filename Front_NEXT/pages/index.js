import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  
  <Layout>
    <h1>Comics fetched from API</h1>
    <table class="pure-table pure-table-horizontal">
      <thead>
      <tr>
        <th>Titre</th>
        <th>Numéro</th>
        <th>Editeur</th>
      </tr>
      </thead>
      <tbody>
      {props.comics.map(comic => (
        <tr key={comic._id}>
          <td><Link href="/p/[id]" as={`/p/${comic._id}`}>
            <a>{comic.serieTitle}</a>
          </Link></td>
          <td>{comic.issueNumber}</td>
          <td>{comic.publisher}</td>
        </tr>
      ))}
      </tbody>
    </table>
    
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

