"use client";

import Image from "next/image";
import imageInvoiceExample from "@/assets/invoice-example.jpg";
import { BrainIcon, CameraIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import { ReactNode, useRef, useState } from "react";
import { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "@/lib/react-image-crop";
import { CameraDrawer } from "@/components/CameraDrawer";
import { ImgCropperDrawer } from "@/components/ImgCropperDrawer";

const IMAGE_CONFIG = {
    width: 480,
    height: 640,
    aspectRatio: 3 / 4,
};

export default function Home() {
    const camRef = useRef<Webcam>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const [rawImg, setrawImg] = useState<string>();
    const [croppedImg, setCroppedImg] = useState<string>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [crop, setCrop] = useState<Crop>({
        unit: "%",
        width: 80,
        height: 100,
        x: 0,
        y: 0,
    });

    const [isOpenCamSheet, setIsOpenCamSheet] = useState(false);
    const [isOpenCropper, setIsOpenCropper] = useState(false);

    const takePhoto = () => {
        if (camRef.current) {
            const imgSrc = camRef.current.getScreenshot();

            if (imgSrc) {
                setrawImg(imgSrc);
                setIsOpenCamSheet(false);
                setIsOpenCropper(true);
            }
        }
    };

    const handleCropDone = async () => {
        if (imgRef.current && completedCrop) {
            const cropped = await getCroppedImg(imgRef.current, completedCrop);
            setIsOpenCropper(false);
            if (cropped) setCroppedImg(cropped);
        }
    };

    const handleDownload = () => {
        if (!croppedImg) return;
        const link = document.createElement("a");
        link.href = croppedImg;
        link.download = "invoice-photo.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex h-full flex-col items-center">
            <Image
                width={IMAGE_CONFIG.width}
                height={IMAGE_CONFIG.height}
                alt="preview-image"
                src={croppedImg ?? imageInvoiceExample}
                className="w-[50%] object-cover"
            />
            <Button onClick={handleDownload}>Download</Button>

            <div className="fixed bottom-5 flex items-center gap-10 rounded-full border border-gray-300 bg-white px-8 py-3 shadow">
                <ToolbarButton icon={<UploadIcon />} label="Upload Image" />
                <ToolbarButton icon={<BrainIcon />} label="Extract Data" />
                <ToolbarButton icon={<CameraIcon />} label="Take a Photo" onClick={() => setIsOpenCamSheet(true)} />
            </div>

            <CameraDrawer
                camRef={camRef}
                isOpen={isOpenCamSheet}
                setIsOpen={setIsOpenCamSheet}
                onTakePhoto={takePhoto}
            />

            <ImgCropperDrawer
                crop={crop}
                imgRef={imgRef}
                isOpen={isOpenCropper}
                rawImg={rawImg}
                onCropDone={handleCropDone}
                onTakePhoto={takePhoto}
                setCompletedCrop={setCompletedCrop}
                setCrop={setCrop}
                setIsOpen={setIsOpenCropper}
            />
        </div>
    );
}

const ToolbarButton = ({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) => {
    return (
        <div className="flex cursor-pointer flex-col items-center gap-2" onClick={onClick}>
            {icon}
            <p className="text-xs">{label}</p>
        </div>
    );
};
