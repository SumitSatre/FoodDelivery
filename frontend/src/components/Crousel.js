import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://source.unsplash.com/random/900x700/?biryani"
                    alt="First slide"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://source.unsplash.com/random/900x700/?momos"
                    alt="Second slide"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://source.unsplash.com/random/900x700/?pizza"
                    alt="Third slide"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />

            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;