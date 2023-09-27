import { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import List from "./list";
import FeaturedMedia from "./featured-media";
import GoogleAds from "./ads/GoogleAds";
import adimage1 from "../Assets/img/336x280.svg"
import Image from "@frontity/components/image";
import Lazyimg from "../Assets/img/lazyimg.svg"
/**
 * The Post component that Mars uses to render any kind of "post type", like
 * posts, pages, attachments, etc.
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  const author = state.source.author[post.author];
  // Get a human readable date.
  const date = new Date(post.date);

  console.log("murli",author)
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, [actions.source]);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <ListMain>
        <BoxMain>

          <BoxD>
            <h1>{post.title.rendered}</h1>

            {/* Look at the settings to see if we should include the featured image */}
            <PostDetailsImg>
              {state.theme.featured.showOnPost && (
                <FeaturedMedia id={post.featured_media} />
              )}
            </PostDetailsImg>

            {data.isAttachment ? (
              // If the post is an attachment, just render the description property,
              // which already contains the thumbnail.
              <div dangerouslySetInnerHTML={{ __html: post.description.rendered }} />
            ) : (
              // Render the content using the Html2React component so the HTML is
              // processed by the processors we included in the
              // libraries.html2react.processors array.
              <Content>
                <Html2React html={post.content.rendered} />
              </Content>
            )}

    
          </BoxD>
        </BoxMain>


        <SideBar>
          <SideOne>
          <Image 
          style={{  backgroundImage: `url(${Lazyimg})` }} 
          alt="side-img" src={adimage1} /> 
          </SideOne>

          <SideTwo>
            <h2>Categories</h2>
            <ul>
              {Object.values(state.source.category)?.map(val =>
                <li>
                  <RecentPostMain>

                    {/* {val.acf.cate_image?.length ? <RecentPostImg>
                      <Image alt="cate-img" src={val.acf.cate_image} />
                    </RecentPostImg> : ""} */}

                    <Link link={val.link}> {val.name}</Link>
                  </RecentPostMain>
                </li>
              )}
            </ul>
          </SideTwo>
        </SideBar>
      </ListMain>
    </Container>

  ) : null;
};

export default connect(Post);

const Container = styled.section`
width: 1220px;
margin: 0;
padding: 0px 50px;

@media(min-width:768px) and (max-width: 992px){
  width: 97.5%;
  padding: 0px 15px;
}

@media(min-width:320px) and (max-width: 767px){
  width: 100%;
  padding: 15px;
}

`;


const PostItemText = styled.div`
  display:flex;
  width: 100%;

     @media(min-width:320px) and (max-width: 992px){
      display: block;
    }

`;

const ListMain = styled.div`
    width: 100%;
    margin-top: 20px;
    display:flex;

    @media(min-width:320px) and (max-width: 992px){
      display:block;
    }
`;




const SideBar = styled.div`
    width: 30%;
    height: max-content;
    margin-right: 20px;
    @media(min-width:768px) and (max-width: 992px){
      width: 100%;
      margin-right: 0px;
    }
    @media(min-width:320px) and (max-width: 767px){
      width: 100%;
      margin-right: 0px;
      float: left;
      overflow: hidden;
    }
    h2{
      font-size: 20px;
      color: white;
      font-weight: 500;
      font-family: Open Sans, sans-serif;
    }

    p{
      font-family: revert;
      font-size: 17px;
      color: white;
      margin-bottom: 40px;
    }
    a{
      background: black;
    max-width: -webkit-max-content;
    max-width: -moz-max-content;
    max-width: max-content;
    color: white;
    padding: 13px 20px;
    }
   
   

`;

const SideOne = styled.div`
  
    @media(min-width:320px) and (max-width: 992px)
    {
      width: fit-content;
      padding: 20px;
      padding-bottom: 40px;
      background: #2a75c1;

    }
`;

const SideTwo = styled.div`
background: #ffffff;
height:max-content;
margin-top:30px;
width:72%;
padding: 40px 50px 40px 50px;
float: left;
box-shadow: 0 0 10px rgba(232, 234, 237, 0.5);

@media(min-width:320px) and (max-width: 992px)
{
  width: 100%;
  padding: 20px;
}



h2{
  color: black;
  font-size: 20px;
  margin: 0;
}

h3{
  width:100%;
margin-top:0px;
}

ul{
  padding: 0;
  list-style: none;
  float: left;
}

li{
  float: left;
  width: 100%;
  border-top: 1px solid rgba(94,94,94,0.1);
}

`;

const RecentPostMain = styled.div`
float: left;
width: 100%;
@media (min-width:320px) and (max-width:767px){
  margin-bottom: 0px;
}  
    a{
      color: #5e5e5e;
      background: none !important;
      padding: 0px;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
        float: left;
        padding: 10px 0px;
        transition: all .2s ease-in-out;
    
        :hover{
          padding-left: 5px;
          transition: all .2s ease-in-out;
          color: #83b0de;
        }
    }

`;


const RecentPostImg = styled.div`
    width: 67px;
    height: 67px;
    float: left;
    margin-right: 10px;

    img{
      max-width:100%;
      max-height: 100%;
    }

`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const BoxD = styled.div`
padding: 40px 50px 50px 50px ;

@media(min-width:768px) and (max-width: 992px){
  width: 90%;
  padding: 10px 20px 20px 20px;
  margin: 20px 20px;

}

@media(min-width:320px) and (max-width: 767px){
  width: 90%;
  padding: 10px 20px 20px 20px;
  margin: 0;

}
`;
const BoxMain = styled.div`
width: 70%;
background: white;
border-right: 2px solid rgba(0, 0, 0, 0.07);
border-bottom: 2px solid rgba(0, 0, 0, 0.07);
box-shadow: 0 0 10px rgba(232, 234, 237, 0.5);
margin-bottom: 20px;
margin-right:20px;

@media(min-width:768px) and (max-width: 992px){
  width: 90%;
  margin: 20px 20px;

}

@media(min-width:320px) and (max-width: 767px){
  width: 100%;
  margin: 0;

}
`;
const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const PostDetailsImg = styled.postDetailsImg`

  img{
    display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;

  }
`;



/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    width: 100%;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
