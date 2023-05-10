import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Post = () => {
  const [data, setData] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    fetch(`https://9newstoday.net/wp-json/wp/v2/posts?slug=${router.query.id}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData[0]);
      });
  }, [router]);

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
};

export default Post;
