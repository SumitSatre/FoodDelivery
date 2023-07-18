import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Form } from 'react-bootstrap';
import "../CSS/crousel.css";
import { useSelector , useDispatch } from 'react-redux';
import { OnChange } from '../slices/searchSlice';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    
    let searchText = useSelector(state => state.search)
    let dispatch = useDispatch();

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
      };

    const handleSearchChange = (event) =>{
        dispatch(OnChange({searchText : event.target.value }))
    }

    const imagesArray = ["https://source.unsplash.com/random/900x700/?biryani", "https://source.unsplash.com/random/900x700/?momos", "https://source.unsplash.com/random/900x700/?pizza"]

    return (
        <Carousel activeIndex={index}  className='crousel' onSelect={handleSelect} >
            {
                imagesArray.map((link, index) => {
                    return (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={link}
                                alt="First slide"
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                    )
                })
            }
            <Form className='d-flex searchBar' >
                <Form.Control type='search' placeholder='Search for item' className='me-2' aria-label='Search' onChange={handleSearchChange} value={searchText} style={{backgroundColor:"lightblue"}} />
            </Form>
        </Carousel>
    );
}

export default ControlledCarousel;