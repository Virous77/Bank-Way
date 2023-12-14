import React from "react";
import {
  ShimmerTitle,
  ShimmerCircularImage,
  ShimmerSectionHeader,
  ShimmerCategoryItem,
  ShimmerThumbnail,
} from "react-shimmer-effects";
import { ShimDiv } from "./shim.style";

type TTextShimmer = {
  gap?: number;
  line: number;
};

export const TextShimmer: React.FC<TTextShimmer> = ({ line, gap }) => {
  return <ShimmerTitle line={line} gap={gap || 10} variant="primary" />;
};

export const CircleShimmer = ({ size }: { size: number }) => {
  return <ShimmerCircularImage size={size} />;
};

export const HeadingShimmer = () => {
  return <ShimmerSectionHeader />;
};

export const TransactionShimmer = ({ margin }: { margin?: string }) => {
  return (
    <div style={{ marginTop: margin }}>
      <ShimmerCategoryItem
        hasImage
        imageType="circular"
        imageWidth={60}
        imageHeight={40}
        text
      />
    </div>
  );
};

export const TextThumb = ({ height }: { height: number }) => {
  return <ShimmerThumbnail height={height} rounded />;
};

export const ChartLoading = () => {
  return (
    <ShimDiv>
      <CircleShimmer size={260} />
      <TextThumb height={205} />
    </ShimDiv>
  );
};
