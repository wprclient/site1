import { styled, connect } from "frontity";

const Skelton = (props) => {

  return (
    <Uxskeleton style={{ width: props.width, height: props.height, borderRadius: props.radius }}>
    </Uxskeleton>
  );
};
export default connect(Skelton);

export const Uxskeleton = styled.uxskeleton`

background: #e0e0e0;
background-image: linear-gradient(to right, #e0e0e0 0%, #e6e6e6 75%);
  background-size:100% 400px;

  background-repeat: no-repeat;
  display: inline-block; 
  position: relative; 
  
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards; 
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderShimmer;
  -webkit-animation-timing-function: linear;

  @-webkit-keyframes placeholderShimmer {
    0% {
      background-position: -800px 0;
    }
    
    100% {
      background-position: 1200px 0; 
    }
  }



 

`;
