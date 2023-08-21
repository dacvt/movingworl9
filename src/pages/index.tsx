import { convert } from 'html-to-text';
import Link from 'next/link';
import React from 'react';

// @ts-ignore
export default function PostPage({ data }) {
  const getImage = (post: any) => {
    if (post.fimg_url) {
      return post.fimg_url;
    }
    const imageMatch = post.content.rendered.match(/(<img (.+) \/>)/);
    if (!imageMatch) {
      return '';
    }
    const linkImageMatch = imageMatch[0].match(
      /(https:([^"]?)(.jpg"|.png"|.jpeg|.+?"))/
    );
    if (linkImageMatch) {
      return convert(linkImageMatch[0].replace('"', ''));
    }
    return '';
  };

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
      <section className="posts">
        <div className="container">
          <div className="rows">
            {(data || []).map((item: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="col-new" key={index}>
                <Link href={{ pathname: '/post', query: { name: item.slug } }}>
                  <img src={getImage(item)} alt={item.title.rendered} />
                  <h3>{convert(item.title.rendered)}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://amazingdailynews.com/wp-json/wp/v2/posts?per_page=20`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}