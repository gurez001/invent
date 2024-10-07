import * as React from "react";
import { Image, Card, CardBody } from "@nextui-org/react";

interface ImageCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function Server_image_card({
  src,
  alt,
  width,
  height,
}: ImageCardProps) {
  return (
    <Card key={src}>
      <CardBody>
        {/* NextUI Image component with zoom effect */}
        <Image
          src={src}
          isZoomed={true}
          alt={alt}
          isBlurred={true}
          width={width}
          height={height}
        />
      </CardBody>
    </Card>
  );
}
