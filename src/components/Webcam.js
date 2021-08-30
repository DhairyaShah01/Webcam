import React, { createRef, useState } from 'react';
import Webcam from "react-webcam";
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import html2canvas from 'html2canvas';
import theme from './theme';
import { buttonTheme } from './theme';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = () => {

    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);

    const ref = createRef(null);
    const [image1, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0
    });

    const download = ({ name = "img", extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image1;
        a.download = createFileName(extension, name);
        a.click();
      };

    const capture1 = () => {
        const capture = document.querySelector('#capture')
        html2canvas(capture)
            .then(canvas => {
                document.body.appendChild(canvas)
                canvas.style.display = 'none'
                return canvas
            })
            .then(canvas => {
                const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
                const a = document.createElement('a')
                a.setAttribute('download', 'my-image.png')
                a.setAttribute('href', image)
                a.click()
                canvas.remove()
            })
    }
    
    // const btn = document.querySelector('#btn')
    // btn.addEventListener('click', capture)

    const downloadScreenshot = () => takeScreenShot(ref.current).then(capture1);

    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        });

    return (
        <>
            <div className="webcam-img" style={{alignSelf:'center'}}>

                {image == '' ?
                <div style={theme}>
                <Webcam
                    audio={false}
                    height={500}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={300}
                    videoConstraints={videoConstraints}
                />
                </div> :
                <div id="capture" style={theme}>
                    <TransformWrapper>
                    <TransformComponent>
                    <img ref={ref} src={image}/>
                    </TransformComponent>
                    </TransformWrapper>
                </div>}
            </div>
            <div>
                {image != '' ?
                    <div>
                    <button style={buttonTheme} onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button>
                        <button onClick={downloadScreenshot}>Submit</button>
                        </div> :
                    <button style={buttonTheme} onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
        </>
    );
};