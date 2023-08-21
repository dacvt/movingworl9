import _ from 'lodash';
import Link from 'next/link';

// @ts-ignore
const Post = ({ data }) => {
  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">
            <img
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="logo"
            />
          </div>
          <div className="menu">
            <Link href="/">Home</Link>
          </div>
        </div>
      </header>
      <article className="container">
        <h1
          dangerouslySetInnerHTML={{
            __html: _.get(data, 'title.rendered', ''),
          }}
        />
        <div dangerouslySetInnerHTML={{ __html: _.get(data, 'date', '') }} />
        <section>
          <div
            dangerouslySetInnerHTML={{
              __html: _.get(data, 'content.rendered', ''),
            }}
          />
        </section>
      </article>
    </div>
  );
}

// This gets called on every request
// @ts-ignore
export async function getServerSideProps ({ query }) {
  // Fetch data from external API
  const res = await fetch(
    `https://amazingdailynews.com/wp-json/wp/v2/posts?slug=${query.name}`
  );
  const resData = await res.json();
  return { props: { data: resData[0] } };
};

export default Post;
