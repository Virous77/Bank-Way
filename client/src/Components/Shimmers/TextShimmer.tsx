import React from "react";
import { ShimmerTitle, ShimmerCircularImage } from "react-shimmer-effects";

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
