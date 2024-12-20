import React from 'react'
import { Modal } from '../modal/modal'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { CircleCheckBig } from 'lucide-react'

interface PopupModelProps {
    isOpen: boolean;
    onClose: () => void;
    skipUrl?: string;
    movieUrl?: string;
    seasonsUrl?: string;
    url: any;
}

const PopupModel: React.FC<PopupModelProps> = ({
    isOpen,
    onClose,
    skipUrl = "/anime/movie",
    url,
}) => {
    const router = useRouter();

    const handleNavigation = (url: string) => {
        router.push(url);
    };


    return (
        <Modal title="" isOpen={isOpen} onClose={onClose} aria-describedby="modal-description">
            <Card className='p-6'>
                <div className='text-center mb-4'>
                    <h2>Successfully Added <CircleCheckBig /></h2>
                </div>
                <div className='h-[300px] flex gap-4 items-center justify-center'>
                    <Button onClick={() => handleNavigation(skipUrl)}>Skip</Button>
                    <Button onClick={() => handleNavigation(`/anime/movie/add-video`)}>Add Movie</Button>
                </div>
            </Card>
        </Modal>
    );
}

export default PopupModel;
