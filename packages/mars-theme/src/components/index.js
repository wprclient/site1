import { Global, css, connect, styled, Head, useConnect } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import SearchForm from "./search-form";
import SearchResults from "./search-results";
import MailchimpSubscribe from "react-mailchimp-subscribe"

import Bold from "../Assets/font/OpenSans-Bold.ttf"
import ExtraBold from "../Assets/font/OpenSans-ExtraBold.ttf"
import Light from "../Assets/font/OpenSans-Light.ttf"
import Medium from "../Assets/font/OpenSans-Medium.ttf"
import Regular from "../Assets/font/OpenSans-Regular.ttf"
import SemiBold from "../Assets/font/OpenSans-SemiBold.ttf"
/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @param props - The props injected by Frontity's {@link connect} HOC.
 *
 * @returns The top-level react component representing the theme.
 */

const url = "https://app.us21.list-manage.com/subscribe/post?u=238f9ab74235afad2b7746f82&id=9eb09577a0";
const SimpleForm = () => <MailchimpSubscribe url={url} />

const Theme = ({ state }) => {
  const { actions } = useConnect();

  // actions.theme.ads_api();
  // Get information about the current URL.

  const data = state.source.get(state.router.link);
  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <link rel="canonical" href={state.source.url + state.router.link} />
        <html lang="en" />

      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <SearchResults when={data.isSearch} />
          <List when={data.isArchive} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </Main>


      <NewsMain>
        <Container>
          <div>
            <h2>Subscribe to Our Newsletter</h2>
            <p>Become a preferred subscriber and get a daily update.</p>
          </div>
          <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }) => (
              <NewsForm>
                <SimpleForm onSubmitted={formData => subscribe(formData)} />
                {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
                {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />}
                {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
              </NewsForm>
            )}
          />
        </Container>
      </NewsMain>

      <FooterBg>

        <Container>
          <FooterMain>
            <FooterText>
              © 2023 WP with React&nbsp;• Built with&nbsp;<a href="https://wpwithreact.com/">WP with React</a>
            </FooterText>
            <FooterMenu>
              <ul>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </FooterMenu>
          </FooterMain>
        </Container>
      </FooterBg>
      {state.theme.searchshow ?
        <div className="search_modal" onClick={(e) => e.target.className == "search_modal" ? actions.theme.searchtoggle() : ""}>
          <SearchForm />
        </div> : ""}
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
@font-face {
          font-family: 'Open Sans', sans-serif;
          src: url('${Bold}');
          src: url('${ExtraBold}'),
               url('${Regular}'),
               url('${Medium}'),
               url('${Light}'),
               url('${SemiBold}');
          font-weight: normal;
          font-style: normal;
      }

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  img.mobile_search {
    position: relative;
    left: -15px;
}
  .mob_menu_main ul {
    list-style: none;
    padding: 0;
    margin:0px;
  }
  
  .mob_menu_main .parent_menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ul.sub_menu_ul {
    padding: 0px 0px 0px 15px;
}

.mob_menu_main p {
  margin: 0;
  font-size: 16px;
}
.parent_div p.parent_menu a {
  z-index: 999;
}
li.submenu_main p.sub_menu_a a{
  z-index: 999;
}
.sub_menu_ul li a {
  font-size: 16px;
}
.sub_menu_ul li a {
  text-transform: capitalize;
}
.parent_div {
  padding: 15px 0px;
  border-bottom: 1px solid #424242;
}
.icn_rotate {
  transform: rotate(180deg);
  transition: all 0.5s;
}
.icn_rotate_transi{
 transition: all 0.5s;
 transform: rotate(0deg);
}
.sub_menu_a {
  display: flex;
  justify-content: space-between;
}
.sub_menu_ul li {
  padding: 10px 0px;
  padding: 10px 0px 5px 0px;
}
.mob_menu_main ul li a {
  text-transform: capitalize;
  display:flex;
}

ul.sub_menu_inner {
  padding: 12px 15px 0px 15px;
}
ul.sub_menu_ul li:nth-last-child(1) {
  padding-bottom: 0;
}
.dropdown, .dropup {
  position: relative;
}

li.single_menu_item a {
    padding: 15px 0px;
}
.sub_menu_ul {
  opacity: 1;
  -webkit-transition: 0.5s;
  transition: all 0.5s;
  transform: translate(0px, 0px);
  position: inherit;
}
.sub_menu_inner {
  opacity: 1;
  -webkit-transition: 0.5s;
  transition: all 0.5s;
  transform: translate(0px, 0px);
  position: inherit;

}
.d-none{
  position: absolute;
  transform: translate(0px, -10px);
  display: none;
}


header#site-header a{
  position: relative;
  display: block;
  font-weight: 500;
  font-size:20px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
}

.dropdown:hover>.dropdown-menu {
  display: block !important;
}


.dropdown-submenu>.dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
  -webkit-border-radius: 0 6px 6px 6px;
  -moz-border-radius: 0 6px 6px;
  border-radius: 0 6px 6px 6px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none !important;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);

}
ul.sub_menu_ul {
  padding: 7px 0px 0px 10px;
}
ul.dropdown-menu.multi-level li a {
  font-weight: 600 !important;
  font-size:15px !important;
}
.single_menu_item {
  border-bottom: 1px solid #424242;
}
ul.dropdown-menu.multi-level li {
  padding: 4px 0px;
}
header#site-header .dropdown-menu li {
  margin-left: 1px !important;
  padding: 4px 4px;
}


.dropdown-submenu:hover>.dropdown-menu {
  display: block;
}
.dropdown-submenu {
  position: relative;
}


.dropdown-submenu:hover>.dropdown-menu {
  display: block !important;
  margin: 0 !important;
}


header#site-header .SubMenu ul {
  display: initial !important;
  margin:0px !important;
}

header#site-header .SubMenu ul li{
  margin:0px !important; 
}

li.submenu-main-item .SubMenu a {
  font-weight: 300 !important;
  font-size: 15px;
}
.SubMenu h6 {
  margin: 0 !important;
  text-transform: capitalize;
}

.rt_header_main.is-sticky {
  position: fixed;
  width: 15%;
  right: 370px;
  top: 76px;
  padding: 0px 15px;
}
.is-sticky .sidebar_ad_none{
  display:none;
}
#site-header.hd_fixed {
  position: fixed !important;
  top: 0px !important;
  width: 100%;
  z-index: 9999;
  background: #fff !important;
  transition:all 0.2s ease-in-out 0s;
  box-shadow: rgb(149 157 165 / 18%) 0px 8px 24px;
}
.hd_fixed div{padding:6px 0px !important;}


header#site-header.inner_header{
  background: #084523 !important;
  position: inherit;
}

#site-header.inner_header .dropdown > a {
  color: white !important;
}
.dropdown .dropdown-menu li a{color:#000 !important;}


.submenu-main-item:hover .SubMenu {
  display: block;
  transition: all 0.5s;
}
header#site-header .SubMenu ul li {
  margin: 6px 0px!important;
  padding: 0px 10px;
}

.SubMenu {
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  position: absolute;
  width: max-content;
  background: white;
  padding: 0px 0px;
  margin-left: 5px;
  border-radius: 3px;
}

@media (min-width:1600px) and (max-width:1800px){
  .rt_header_main.is-sticky {
    position: fixed;
    width: 18%;
    right: 231px;
    top: 41px;
}
}

@media (min-width:1400px) and (max-width:1600px){
  .rt_header_main.is-sticky {
    width: 21%;
    right: 126px;
    top: 0px;
    padding: 0px 15px;
  }
}

@media (min-width:1250px) and (max-width:1300px){
  .rt_header_main.is-sticky {
    width: 21%;
    right: 39px;
    top: 0px;
    padding: 0px 15px;
  }
}

@media (max-width:1249px){
  .rt_header_main.is-sticky {
    width: 90%;
    position:sticky;
    padding: 0px 15px;
  }
}




@media (min-width:768px) and (max-width:1024px){
.rt_header_main.is-sticky {
  width: 29%;
  right: 0px;
}

}
@media (min-width:992px){

  .header_ad_790{
  width:788px;
  margin: 0 auto;
  }
  
}
@media (min-width:768px) and (max-width:992px){
.mob_menu_main {
  padding: 0px 30px;
}
}
@media (min-width:320px) and (max-width:767px){
.rt_header_main.is-sticky {
  position: inherit;
  right: 0;
  top: 0px;
  width:100%;
  padding: inherit;
}
.mob_menu_main {
  padding: 0px 30px 0px 20px;
  margin-top: 0;
  height: 100vh;
  overflow: scroll;
}
header#site-header a {
  color: black ;
  padding: 20px 0px 10px 0px;
  font-size: 16px;
  font-weight: 500;
}
header#site-header.inner_header {
  background: #084523;
}

header#site-header li {
  margin: 0.8rem 0 0 0rem!important;

}
#site-header.inner_header a {
  color: black!important;
}
header#site-header.inner_header span {
  color: #fff !important;
}
header#site-header.inner_header button svg {
  fill: #fff;
}

header#site-header.inner_header {
  position: relative;
}
header#site-header.inner_header svg {
  fill: white;
}
header#site-header.inner_header span {
  color: white;
}


}
.search_input_main {
  width: 25%;
}

.search_modal {
  margin: auto;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(3px);
  transition: opacity 500ms ease;
}
.search_input_main form input {
  height: 55px;
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  color: currentColor;
  outline: none;
  box-shadow: none;
  padding: 10px 15px;
  width: 100%;
  font-family: system-ui;
}

.search_input_main form{
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background: #ffffff;
  width: 100%;
  justify-content: space-between;
}
.search_input_main form button {
  border: none;
  background: transparent;
  cursor: pointer;
  background: black;
  cursor: pointer;
  padding: 0px 15px;
  border-left: 1px solid grey;
}
.search_input_main form button img {
  max-width: 100%;
}
.dropdown.search-icon {
  cursor: pointer;
}
.gridlove-author {
  border-top: 1px solid rgba(0,0,0,.1);
  padding-top: 35px;
}

`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #242226;
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
  background:#fafafa;
  padding-bottom:30px;
  );
`;
const NewsMain = styled.div`
    background: #000000;
    padding: 60px 0px;
    h2{font-size:35px; 
      color:#fff;
      margin:0px;
      text-align:center; }
      p{color:#fff;text-align:center; 
        margin-top:5px;
        margin-bottom:30px;}
  );
  @media(min-width:320px) and (max-width: 767px){
  padding: 20px 0px;
  h4{font-size:24px;}
  p{font-size:14px;}
  }
`;
const NewsForm = styled.div`
div{
  width: 50%;
  display: flex;
  margin: auto;
  justify-content: center;
  
  @media(min-width:768px) and (max-width: 992px){
    width: 75%;
  }
  @media(min-width:320px) and (max-width: 767px){
    width: 80%;
    
  }
}
input, input:active, input:focus, input:hover{
  border: none;
    padding: 15px 15px;
    width: 80%;
    outline:none;
    box-shadow:none;
}
button{
  border: none;
  background: #333333;
  color: white;
  padding: 0px 30px;
  font-size: 18px;
  cursor:pointer;
  text-transform: capitalize;
  @media(min-width:320px) and (max-width: 767px){
    padding: 0px 20px;
    background:#333333;
  }
}

  );
`;

const FooterBg = styled.footerMain`
  background: #fafafa;
  width: 97%;
  float: left;
  padding: 10px 10px;
  @media(min-width:320px) and (max-width: 767px){
    padding: 0px 0px;
    width: 100%;
  }
`;

const FooterMain = styled.footerMain`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  );

  @media(min-width:320px) and (max-width: 767px){
    display: block;
    text-align: center;
    padding: 0;
  }

  @media(min-width:768px) and (max-width: 992px){
    padding: 0;
  }
`;

const FooterText = styled.footerText`
@media(min-width:320px) and (max-width: 767px){
  line-height: 24px;
  font-size: 14px;
}
a{
  color:#212121;  
}
  );
`;
const FooterMenu = styled.footerMenu`

ul{
  list-style: none;
    display: flex;
    
    @media(min-width:320px) and (max-width: 767px){
      justify-content: center;
      margin:10px 0px;
      padding:0px
    }
}

li{
  margin-right:15px;
}

a {
  color: #2f4468;
}


  );
`;

const Container = styled.section`
width: 1220px;
margin: 0;
padding: 0px 50px;
margin: auto;

@media(min-width:1024px) and (max-width: 1199px){
  width: 100%;
  padding: 15px;
}

@media(min-width:768px) and (max-width: 992px){
  width: 97.5%;
  padding: 0px 15px;
}

@media(min-width:320px) and (max-width: 767px){
  width: 100%;
  padding: 15px 0px;
  margin: 0;
}


`;
