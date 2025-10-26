import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "./ui/drawer";
import Image from "next/image";
import { Ref } from "react";

type Props = {
    isOpen: boolean;
    imgRef: Ref<HTMLImageElement>;
    crop: Crop;
    rawImg: string | undefined;
    setCrop: (val: Crop) => void;
    setIsOpen: (val: boolean) => void;
    onTakePhoto: () => void;
    onCropDone: () => void;
    setCompletedCrop: (val: PixelCrop) => void;
};

export const ImgCropperDrawer = ({
    isOpen,
    imgRef,
    crop,
    rawImg,
    setCrop,
    setIsOpen,
    setCompletedCrop,
    onCropDone,
}: Props) => {
    return (
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
            <DrawerContent className="top-0 mt-0! max-h-screen!">
                <DrawerHeader>
                    <DrawerTitle>Crop Your Invoices</DrawerTitle>
                    <DrawerDescription>It could be handwritten or typed</DrawerDescription>
                </DrawerHeader>

                <ReactCrop crop={crop} onChange={setCrop} onComplete={(c) => setCompletedCrop(c)}>
                    <Image ref={imgRef} width={480} height={640} alt="preview-image" src={rawImg ?? ""} />
                </ReactCrop>

                <DrawerFooter>
                    <Button onClick={onCropDone} className="w-full">
                        Done
                    </Button>
                    <Button variant={"outline"} onClick={() => setIsOpen(false)} className="w-full">
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
