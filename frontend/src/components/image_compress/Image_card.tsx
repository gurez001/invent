import * as React from 'react';
import { Image, Card, Button, CardFooter, CardBody } from '@nextui-org/react';
import { DeleteIcon } from 'lucide-react';

interface ImageCardProps {
  item: any;
  index:number;
  onDelete: (index: number) => void; // Pass a delete handler function
}

export default function ImageCard({ item,index, onDelete }: ImageCardProps) {
  return (

        <Card key={item.img}  >
          <CardBody >
            {/* NextUI Image component with zoom effect */}
            <Image
              src={item.img}
              isZoomed={true}
              alt={item.name}
              isBlurred={true}
              width={200}
              height={200}
            />
          </CardBody>

          {/* Delete button overlay */}
          <CardFooter
            style={{
              position: 'absolute',
              bottom: 0,
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',

            }}
          >
            <Button
              isIconOnly
              onClick={() => onDelete(index)}
            >
              <DeleteIcon />
            </Button>
          </CardFooter>
        </Card>
    );
}