import { connect, styled } from "frontity";
import Image from "@frontity/components/image";
import Lazyimg from "../Assets/img/lazyimg.svg"
/**
 * The Component that renders a featured media, typically an image. The featured
 * media can represent an individual Post, Page, or Custom Post Type.
 *
 * @param props - The state injected by {@link connect } and the ID of the
 * featured media.
 *
 * @returns A react component.
 */
const FeaturedMedia = ({ state, id }) => {
  const media = state.source.attachment[id];
  if (!media) return null;

  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;
  return (
    <Container isAmp={state.frontity.mode === "amp"}>
      <StyledImage>
        <Image
          style={{ backgroundImage: `url(${Lazyimg})`, backgroundRepeat: 'no-repeat' }}
          alt={media.title.rendered}
          src={media.source_url}
          srcSet={srcset}
          width={media?.media_details?.width}
          height={media?.media_details?.height}
        />
      </StyledImage>
    </Container>
  );
};

export default connect(FeaturedMedia);

const Container = styled.div`
  margin-top: 16px;
  margin-right: 0px;
  ${({ isAmp }) => isAmp && "position: relative;"};

  @media(min-width:320px) and (max-width: 992px){
    margin-right: 0px;
  }
`;

const StyledImage = styled.div`
 img{ display: block;
  height: 160px;
  width: 275px;
  object-fit: cover;


  @media(min-width:320px) and (max-width: 992px){
    width: 100%;
    height: 100%;
  }}
`;
