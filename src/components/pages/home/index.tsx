import { useEffect } from 'react';
import { RiChatNewLine } from 'react-icons/ri';
import { Link } from '@/components/common/Link';
import { MainLayout } from '@/components/features/app/Layout';
import { Profile } from '@/components/features/app/Profile';
import { Stories } from '@/components/features/story/Stories';
import { PostType } from '@/types/post';

type Props = {
  posts: PostType[];
};

export const Home: React.VFC<Props> = ({ posts }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).twttr) {
      (window as any).twttr.widgets.load();  // Memuat widget Twitter setelah komponen dirender
    }
  }, []);

  const sendEvent = () => {
    (window as any).fbq('track', 'PageView');
  }

  const gtmPush = () => {
    const data = { event: 'button-click', some: { data: true } };
    console.log('dataLayer.push()');
    (window as any).dataLayer.push(data);
  }

  return (
    <MainLayout
      main={
        <div className="vstack gap-12 p-8 bg-primary-1">
          <section style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Google Tag Manager */}
            <div>
              <button onClick={gtmPush}>dataLayer.push()</button>
            </div>
            {/* Facebook Pixel */}
            <div>
              <button onClick={sendEvent}>fbq track & PageView</button>
            </div>
            {/* Embed Tweet */}
            <div>
              {/* <Image src="/heroImage.jpg" alt="teamwork on web services" width="1332px" height="354px"/> */}
              <blockquote className="twitter-tweet">
                <p lang="en" dir="ltr">
                  Just setting up my Twitter. #myfirstTweet
                </p>
                &mdash; Twitter Dev (@TwitterDev) <a href="https://twitter.com/ryfazrin/status/1504760897176174595">February 8, 2025</a>
              </blockquote>

              {/* Embed Timeline */}
              <a
                className="twitter-timeline"
                data-width="550"
                data-height="400"
                href="https://twitter.com/ryfazrin/status/1504760897176174595"
              >
                Tweets by TwitterDev
              </a>
            </div>
          </section>
          <Stories posts={posts} title="最新の記事" icon={<RiChatNewLine />} />
          <Link href="/posts/page/1" passHref>
            <a className="button">
              記事一覧へ
            </a>
          </Link>
        </div>
      }
      aside={<Profile />}
    />
  );
};
