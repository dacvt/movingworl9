import _ from "lodash";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Post = () => {

  const [data, setData] = useState({});

  const router = useRouter()

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    fetch(`https://9newstoday.net/wp-json/wp/v2/posts?slug=${router.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data[0]);
        setData(data[0]);
      });
  }, [router])

  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">
              <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                  alt="logo" />
          </div>
          <div className="menu">
            <a href="/">Home</a>
          </div>
        </div>
      </header>
      <article className="container">
        <h1 dangerouslySetInnerHTML={{__html: _.get(data, 'title.rendered', '')}}></h1>
        <div dangerouslySetInnerHTML={{__html: _.get(data, 'date', '')}}></div>
        <section>
          <div dangerouslySetInnerHTML={{__html: _.get(data, 'content.rendered', '')}}></div>
        </section>
      </article>
    </div>
  )
}

export default Post