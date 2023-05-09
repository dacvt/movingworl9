import { useEffect, useState } from "react"
import Link from 'next/link';
import { convert } from 'html-to-text';

const PostPage = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://9newstoday.net/wp-json/wp/v2/posts?per_page=20')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const getImage = (post: any) => {
    if (post.fimg_url) {
      return post.fimg_url
    }
    const imageMatch = post.content.rendered.match(/(<img (.+) \/>)/);
    if (!imageMatch) {
      return "";
    }
    const linkImageMatch = imageMatch[0].match(/(https:([^"]?)(.jpg"|.png"|.jpeg|.+?"))/)
    if (linkImageMatch) {
      return convert(linkImageMatch[0].replace('"', ''))
    }
    return "";
  }
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
            <a href="/">Home</a>
          </div>
        </div>
      </header>
      <section className="posts">
        <div className="container">
          <div className="rows">
            {
              (data || []).map((item: any, index: number) => (
                <div className="col-new" key={index}>
                  <Link href="/posts/post/[id]" as={`/posts/post/${item.slug}`}>
                    <img src={getImage(item)} alt={item.title.rendered} />
                    <h3>{convert(item.title.rendered)}</h3>
                    <p dangerouslySetInnerHTML={{__html: item.excerpt.rendered}}></p>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostPage;