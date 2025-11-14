import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../utils/ThemeContext';

interface BlogPost {
  title: string;
  summary: string;
  link: string;
  pubDate: string;
}

interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

const Home: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [countdown, setCountdown] = useState<CountdownState>({ hours: 0, minutes: 0, seconds: 0, ended: true });

  useEffect(() => {
    // Fetch RSS feed
    const fetchBlogPosts = async () => {
      try {
        setBlogLoading(true);
        const response = await fetch('https://mathsociitd.github.io/blog/feed.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        
        const posts: BlogPost[] = Array.from(items).slice(0, 10).map(item => {
          const description = item.querySelector('description')?.textContent || '';
          // Strip HTML tags and limit length for summary
          const cleanSummary = description.replace(/<[^>]*>/g, '').substring(0, 200) + (description.length > 200 ? '...' : '');
          
          return {
            title: item.querySelector('title')?.textContent || '',
            summary: cleanSummary,
            link: item.querySelector('link')?.textContent || '',
            pubDate: item.querySelector('pubDate')?.textContent || ''
          };
        });
        
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Set some fallback content if RSS fails
        setBlogPosts([
          {
            title: "Inter IIT Tech Meet",
            summary: "Exciting news! This year marks the very first time IIT Delhi will participate in the Inter IIT Tech Meet...",
            link: "https://mathsociitd.github.io/blog/",
            pubDate: "Thu, 29 Aug 2024 20:20:00 +0530"
          },
          {
            title: "Hello World 2024",
            summary: "Welcome to the first blog in two years! With this post we are reviving the blog aspect of our website...",
            link: "https://mathsociitd.github.io/blog/",
            pubDate: "Thu, 29 Aug 2024 20:20:00 +0530"
          }
        ]);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    // Countdown for events (example date - can be updated)
    const countDownDate = new Date("2022-04-15T13:30:00+05:30").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ hours, minutes, seconds, ended: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const zeroPad = (num: number) => String(num).padStart(2, '0');

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleModeToggle = (checked: boolean) => {
    toggleTheme();
  };

  return (
    <div className="section" id="home" style={{ marginTop: '-64px', marginBottom: '25px' }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <center>
              <img src="/logo.png" alt="[logo] Mathematics Society" height="50" width="auto" style={{ marginBottom: '25px' }} />
              <h1>Mathematics Society</h1>
              <h2>IIT Delhi</h2>
            </center>

            <div className="row" style={{ marginTop: '36px' }}>
              <div className="col-sm-6">
                <Link className="btn-1 block center" to="/about">About</Link>
              </div>
              <div className="col-sm-6">
                <Link className="btn-1 block center" to="/events">Events</Link>
              </div>
              <div className="col-sm-6">
                <Link className="btn-1 block center" to="/team">Team</Link>
              </div>
              <div className="col-sm-6">
                <Link className="btn-1 block center" to="/contact">Contact</Link>
              </div>
            </div>

            <div className="color-box l-font">
              <span id="gabfest-upcoming" className="is-upcoming">
                <i className="fa fa-clock-o"></i> &nbsp; 
                <span id="demo">
                  {countdown.ended ? 'ENDED' : `${zeroPad(countdown.hours)}:${zeroPad(countdown.minutes)}:${zeroPad(countdown.seconds)}`}
                </span>
              </span>
              <br />
              <div style={{ marginTop: '4px' }}>
                <b>Let's talk Fractals! A talk on fractals by Prof. Amit Priyadarshi.</b>
              </div>
              <br />
              <a href="/l/FRACTALK" style={{ color: 'white', border: '1px solid white', padding: '2px 5px' }} target="_blank" rel="noopener noreferrer">
                Watch Live Stream
              </a>
            </div>

            <div id="is" className="container">
              <div className="row">
                <div className="col-12" style={{ marginBottom: '15px' }}>
                  <h3>GabFest: Talk with Professors</h3>
                </div>
              </div>
              <div className="row" id="is-items">

                <div className="is-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="is-card">
                    <div className="is-img">
                      <img src="/img/gabfest/raiashutosh.png" alt="Dr. Ashutosh Rai" />
                    </div>
                    <div className="is-content">
                      <h4 className="is-title">Dr. Ashutosh Rai</h4>
                      <p className="is-summ">Assistant Professor, Dept of Mathematics, IIT Delhi</p>
                      <span className="is-date">Fri, 15 Oct 2021 17:00:00 IST</span>
                    </div>
                    <div className="is-watch">
                      <a target="_blank" href="https://youtu.be/pnTnjGVprcY" className="btn btn-link btn-block" rel="noopener noreferrer">
                        <i style={{ fontSize: '1.05em' }} className="fa fa-play-circle"></i>&nbsp; Watch
                      </a>
                    </div>
                  </div>
                </div>

                <div className="is-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="is-card">
                    <div className="is-img">
                      <img src="/img/gabfest/biplab.png" alt="Dr. Biplab Basak" />
                    </div>
                    <div className="is-content">
                      <h4 className="is-title">Dr. Biplab Basak</h4>
                      <p className="is-summ">Assistant Professor, Dept of Mathematics, IIT Delhi</p>
                      <span className="is-date">Sat, 10 Apr 2021 12:00:00 IST</span>
                    </div>
                    <div className="is-watch">
                      <a target="_blank" href="https://youtu.be/NxAYoNnf2jM" className="btn btn-link btn-block" rel="noopener noreferrer">
                        <i style={{ fontSize: '1.05em' }} className="fa fa-play-circle"></i>&nbsp; Watch
                      </a>
                    </div>
                  </div>
                </div>

                <div className="is-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="is-card">
                    <div className="is-img">
                      <img src="/img/gabfest/shravankumar.png" alt="Dr. N. Shravan Kumar" />
                    </div>
                    <div className="is-content">
                      <h4 className="is-title">Dr. N. Shravan Kumar</h4>
                      <p className="is-summ">Associate Professor, Dept of Mathematics, IIT Delhi</p>
                      <span className="is-date">Sat, 06 Mar 2021 12:00:00 IST</span>
                    </div>
                    <div className="is-watch">
                      <a target="_blank" href="https://youtu.be/g5l75qLB-RQ" className="btn btn-link btn-block" rel="noopener noreferrer">
                        <i style={{ fontSize: '1.05em' }} className="fa fa-play-circle"></i>&nbsp; Watch
                      </a>
                    </div>
                  </div>
                </div>

                <div className="is-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="is-card">
                    <div className="is-img">
                      <img src="/img/gabfest/dharmar.png" alt="Prof. S. Dharmaraja" />
                    </div>
                    <div className="is-content">
                      <h4 className="is-title">Prof. S. Dharmaraja</h4>
                      <p className="is-summ">Professor & HoD, Dept of Mathematics, IIT Delhi</p>
                      <span className="is-date">Thurs, 28 Jan 2021 17:00:00 IST</span>
                    </div>
                    <div className="is-watch">
                      <a target="_blank" href="https://youtu.be/lifFsDaUXw8" className="btn btn-link btn-block" rel="noopener noreferrer">
                        <i style={{ fontSize: '1.05em' }} className="fa fa-play-circle"></i>&nbsp; Watch
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div id="blog" className="container">
              <div className="row">
                <div className="col-12" style={{ marginBottom: '15px' }}>
                  <h3>Mathematics In Focus</h3>
                </div>
                <div className="col-12" style={{ marginBottom: '12px' }}>
                  <h4>Interesting Math &nbsp;<i className="fa fa-chevron-circle-right"></i></h4>
                </div>
              </div>
              <div className="row" id="blog-items">

                <div className="blog-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="blog-card">
                    <a className="blog-img" href="https://mathsociitd.github.io/blog/2022/05/21/continuum-hypothesis/" target="_blank" rel="noopener noreferrer">
                      <img src="/img/blog/2022-05-21-continuum-hypothesis.png" alt="Continuum Hypothesis" />
                      <span className="blog-upcoming"><i className="fa fa-dot-circle-o"></i> &nbsp; NEW</span>
                      <div className="blog-content">
                        <i className="fa fa-play"></i>&nbsp; <span className="is-title">Continuum Hypothesis</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="blog-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="blog-card">
                    <a className="blog-img" href="https://mathsociitd.github.io/blog/2022/02/23/train-ride/" target="_blank" rel="noopener noreferrer">
                      <img src="/img/blog/2022-02-23-train-ride.png" alt="A Train Ride And A Card Trick" />
                      <div className="blog-content">
                        <i className="fa fa-play"></i>&nbsp; <span className="is-title">A Train Ride And A Card Trick</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="blog-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="blog-card">
                    <a className="blog-img" href="https://mathsociitd.github.io/blog/2021/11/08/four-color-theorem/" target="_blank" rel="noopener noreferrer">
                      <img src="/img/blog/2021-11-08-four-color-theorem.png" alt="Four Color Theorem" />
                      <span className="blog-upcoming"><i className="fa fa-dot-circle-o"></i> &nbsp; NEW</span>
                      <div className="blog-content">
                        <i className="fa fa-play"></i>&nbsp; <span className="is-title">Four Color Theorem</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="blog-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="blog-card">
                    <a className="blog-img" href="https://mathsociitd.github.io/blog/2021/10/18/p-vs-np/" target="_blank" rel="noopener noreferrer">
                      <img src="/img/blog/2021-10-17-p-vs-np.png" alt="P vs. NP!" />
                      <span className="blog-upcoming"><i className="fa fa-dot-circle-o"></i> &nbsp; NEW</span>
                      <div className="blog-content">
                        <i className="fa fa-play"></i>&nbsp; <span className="is-title">P vs. NP!</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="blog-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="blog-card">
                    <a className="blog-img" href="https://mathsociitd.github.io/blog/2021/04/09/fibonacci/" target="_blank" rel="noopener noreferrer">
                      <img src="/img/blog/2021-04-09-fibonacci.png" alt="Cyclicity of Fibonacci Numbers" />
                      <div className="blog-content">
                        <i className="fa fa-play"></i>&nbsp; <span className="is-title">Cyclicity of Fibonacci Numbers</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="blog-outer col-xs-12 col-md-6 col-lg-4">
                  <div className="blog-card">
                    <a className="blog-img" href="https://mathsociitd.github.io/blog/2021/03/14/irrationality-of-nth-roots/" target="_blank" rel="noopener noreferrer">
                      <img src="/img/blog/2021-03-14-irrationality-of-nth-roots.png" alt="Irrationality of nth root" />
                      <div className="blog-content">
                        <i className="fa fa-play"></i>&nbsp; <span className="is-title">Irrationality of n<sup>th</sup> root of any number</span>
                      </div>
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {(blogPosts.length > 0 || blogLoading) && (
              <div id="feed" className="container">
                <div className="row">
                  <div className="col-8" style={{ marginBottom: '15px' }}>
                    <h3>Latest Posts</h3>
                  </div>
                  <div className="col-4" style={{ textAlign: 'right' }}>
                    <a href="https://mathsociitd.github.io/blog/" target="_blank" rel="noopener noreferrer">Show all</a>
                  </div>
                </div>
                <div className="row" id="feed-items">
                  {blogLoading ? (
                    <div className="col-12 text-center">
                      <p>Loading latest posts...</p>
                    </div>
                  ) : (
                    blogPosts.map((post, index) => (
                      <div key={index} className="col-md-6">
                        <article className="feed-item">
                          <h4 className="feed-title">{post.title}</h4>
                          <p className="feed-summ">{post.summary}</p>
                          <div>
                            <a href={post.link} target="_blank" className="feed-link" rel="noopener noreferrer">
                              Read more
                            </a>
                          </div>
                          <div className="feed-dt">{formatDate(post.pubDate)}</div>
                        </article>
                      </div>
                    ))
                  )}
                </div>
                <div className="row" style={{ marginTop: '18px' }}>
                  <div className="col-xl-9 col-md-7 col-sm-4 col-3"></div>
                  <div className="col-xl-3 col-md-5 col-sm-8 col-9">
                    <div 
                      onClick={() => window.open('https://mathsociitd.github.io/blog/', '_blank')} 
                      id="feeds-all-btn"
                    >
                      Continue Reading<i className="fa fa-angle-right arrow"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '45px' }}>
              <center>
                <div className="flex">
                  <div style={{ marginRight: '16px' }} className="for-light-text">
                    <span>Switch back to light mode?</span>
                  </div>
                  <div className="flex">
                    <i className="fa fa-sun-o" style={{ fontSize: '34px' }}></i>
                    <label className="switch" id="mode-toggler-switch">
                      <input 
                        type="checkbox" 
                        checked={isDark}
                        onChange={(e) => handleModeToggle(e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                    <i className="fa fa-moon-o" style={{ fontSize: '34px', marginLeft: '4px' }}></i>
                  </div>
                  <div style={{ marginLeft: '16px' }} className="for-dark-text">
                    <span>Try out the dark mode now!</span>
                  </div>
                </div>
              </center>

              <div 
                onClick={() => window.location.href = '/archives/'} 
                className="color-box l-font pointer" 
                style={{ marginTop: '50px' }}
              >
                <span style={{ marginRight: '16px' }}>Know about the works we have done in the past</span>
                <i className="fa fa-angle-right arrow"></i>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }}>
        <center>
          <span style={{ display: 'inline-block', fontSize: '1.05em' }}>
            Designed & Developed by <a href="https://subhalingamd.github.io/" target="_blank" rel="noopener noreferrer">Subhalingam D</a>
          </span>
        </center>
      </div>
    </div>
  );
};

export default Home;