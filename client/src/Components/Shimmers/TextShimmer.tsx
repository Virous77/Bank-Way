import React from "react";
import {
  ShimmerTitle,
  ShimmerCircularImage,
  ShimmerSectionHeader,
  ShimmerCategoryItem,
  ShimmerThumbnail,
} from "react-shimmer-effects";

type TextShimmerType = {
  gap?: number;
  line: number;
};

export const TextShimmer: React.FC<TextShimmerType> = ({ line, gap }) => {
  return <ShimmerTitle line={line} gap={gap || 10} variant="primary" />;
};

export const CircleShimmer = ({ size }: { size: number }) => {
  return <ShimmerCircularImage size={size} />;
};

export const HeadingShimmer = () => {
  return <ShimmerSectionHeader />;
};

export const TransactionShimmer = () => {
  return (
    <ShimmerCategoryItem
      hasImage
      imageType="circular"
      imageWidth={60}
      imageHeight={40}
      text
    />
  );
};

export const TextThumb = ({ height }: { height: number }) => {
  return <ShimmerThumbnail height={height} rounded />;
};

export const ChartLoading = () => {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        padding: "1rem",
        paddingTop: "3rem",
        boxShadow: "var(--box-shadow)",
        borderRadius: "10px",
      }}
    >
      <CircleShimmer size={260} />
      <TextThumb height={205} />
    </div>
  );
};
