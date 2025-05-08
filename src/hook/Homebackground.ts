import { useEffect, useState } from 'react';
import homeImage1 from '../assets/images/home1.png';
import homeImage2 from '../assets/images/home2.png';

const images = [homeImage1, homeImage2];

export default function Homebackground() {
    const [backgroundImage, setBackgroundImage] = useState(images[0]);

    useEffect(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setBackgroundImage(randomImage);
    }, []);

    return backgroundImage;
}
