import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';

const Post = props => (
  <Layout>
    <h1>{props.comic.serieTitle} #{props.comic.issueNumber}</h1>
    <p>Publisher: {props.comic.publisher}</p>
    <div className='login'>
          <form class="pure-form pure-form-stacked">
            <label>{props.comic.serieTitle} #{props.comic.issueNumber}</label>

            <input
              type='text'
              id='username'
              name='username'
            />

            <button type='submit'>Login</button>
          </form>
        </div>
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  console.log(`http://localhost:3001/comics/${id}`)
  const res = await fetch(`http://localhost:3001/comics/${id}`);
  const comic = await res.json();

  console.log(`Fetched comic: ${comic.serieTitle}`);

  return { comic };
};

export default Post;
