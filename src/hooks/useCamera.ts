import { useRef } from "react";
import Webcam from "react-webcam";

export const useCamera = () => {
    const camRef = useRef<Webcam>(null);

    const takePhoto = () => {
        const imgSrc = camRef.current?.getScreenshot();
        return imgSrc ?? null;
    };

    return { camRef, takePhoto };
};
