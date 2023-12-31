import * as React from "react";
import {
  GatsbyImage,
  IGatsbyImageData,
} from "gatsby-plugin-image";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Typography } from "@mui/material";
import { getFontFamily } from "../utils";
import Link from "./Link";

export interface ImageMetadata {
  name: string;
  width: number;
  caption?: string;
  path?: string;
  year?: number;
}

const BaseImage: React.FC<{
  active: boolean;
  image: IGatsbyImageData;
  metadata: ImageMetadata;
}> = (props) => (
  <>
    {/* Text overlay. */}
    {props.metadata.caption || !props.active ? null : (
      <Box position="relative" top="40%" zIndex={1} height={0}>
        {props.metadata.name.length === 0 ? null : (
          <Typography
            textTransform="uppercase"
            color="white"
            fontWeight="bold"
            textAlign="center"
            variant="h5"
            fontFamily={getFontFamily("Bebas Neue")}
          >
            {props.metadata.name}
          </Typography>
        )}
        {!props.metadata.year ? null : (
          <Typography
            color="white"
            fontWeight="bold"
            textAlign="center"
            variant="h5"
            fontFamily={getFontFamily("Bebas Neue")}
          >
            {props.metadata.year}
          </Typography>
        )}
      </Box>
    )}
    {/* Main image. */}
    <GatsbyImage
      style={{
        height: "100%",
        opacity: props.metadata.caption || !props.active ? undefined : 0.85,
        transition: "0.25s ease",
      }}
      alt={props.metadata.name}
      image={props.image!}
    />
    {/* Bottom description. */}
    {!props.metadata.caption ? null : (
      <Box>
        <Typography
          fontWeight="bold"
          variant="h5"
          fontFamily={getFontFamily("Bebas Neue")}
        >
          {props.metadata.name}
        </Typography>
        <Typography
          variant="h4"
          fontFamily={getFontFamily("Bebas Neue")}
        >
          {props.metadata.caption}
        </Typography>
      </Box>
    )}
  </>
);

const Image: React.FC<{
  image: IGatsbyImageData;
  metadata: ImageMetadata;
}> = (props) => {
  const [active, setActive] = React.useState(false);
  return (
    <Grid
      xs={12}
      sm={12}
      md={props.metadata.width}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {props.metadata.path ? (
        <Link to={props.metadata.path} underline="none">
          <BaseImage active={active} {...props} />
        </Link>
      ) : <BaseImage active={active} {...props} />
      }
    </Grid>
  );
};

const ImageGrid: React.FC<{
  images: IGatsbyImageData[];
  metadata: ImageMetadata[];
}> = (props) => {
  return (
    <Grid container mt={4} rowSpacing={1.5} columns={10} columnSpacing={1}>
      {props.images.map((image, idx) => (
        <Image
          image={image}
          key={`image-${props.metadata[idx].name}`}
          metadata={props.metadata[idx]}
        />
      ))}
    </Grid>
  );
};

export default ImageGrid;
