import React from 'react'
import { Modal } from '../modal/modal'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface PopupModelProps {
    isOpen: boolean;
    onClose: () => void;
    skipUrl?: string;
    movieUrl?: string;
    seasonsUrl?: string;
    setTab: (value: string) => void;
}

const PopupModel: React.FC<PopupModelProps> = ({
    isOpen,
    onClose,
    skipUrl = "/anime",
    setTab,
}) => {
    const router = useRouter();

    const handleNavigation = (url: string) => {
        router.push(url);
    };
    const handleTab = (tab: string) => {
        setTab(tab); onClose();
    };

    return (
        <Modal title="" isOpen={isOpen} onClose={onClose} aria-describedby="modal-description">
            <Card className='p-6'>
                <div className='h-[300px] flex gap-4 items-center justify-center'>
                    <Button onClick={() => handleNavigation(skipUrl)}>Skip</Button>
                    <Button onClick={() => handleTab("movie")}>Add Movie</Button>
                    <Button onClick={() => handleTab("seasons")}>Add Seasons</Button>
                </div>
            </Card>
        </Modal>
    );
}

export default PopupModel;
