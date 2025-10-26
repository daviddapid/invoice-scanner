import { XIcon, CameraIcon, SwitchCameraIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "./ui/drawer";
import { Ref } from "react";
import Webcam from "react-webcam";

type Props = {
    isOpen: boolean;
    camRef: Ref<Webcam>;
    setIsOpen: (val: boolean) => void;
    onTakePhoto: () => void;
};

export const CameraDrawer = ({ isOpen, camRef, setIsOpen, onTakePhoto }: Props) => {
    return (
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
            <DrawerContent className="top-0 mt-0! max-h-screen!">
                <DrawerHeader>
                    <DrawerTitle>Take your Invoices</DrawerTitle>
                    <DrawerDescription>It could be handwritten or typed</DrawerDescription>
                </DrawerHeader>
                <Webcam ref={camRef} audio={false} mirrored screenshotFormat="image/jpeg" />
                <DrawerFooter className="grid grid-cols-3">
                    <Button variant={"ghost"} size={"icon-xl"} onClick={() => setIsOpen(false)} className="mx-auto">
                        <XIcon className="size-[30px]" />
                    </Button>
                    <Button variant={"outline"} size={"icon-xl"} onClick={onTakePhoto} className="mx-auto rounded-full">
                        <CameraIcon className="size-[30px]" />
                    </Button>
                    <Button variant={"ghost"} size={"icon-xl"} className="mx-auto">
                        <SwitchCameraIcon className="size-[30px]" />
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
