import React, { useReducer } from 'react';

const images = [
  {name: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'first image'},
  {name: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'second image'},
  {name: 'https://cdn.theatlantic.com/thumbor/q8Gk2bhEKfJlOq0rQhEcLmXaUAc=/1200x803/media/img/photo/2018/10/images-of-the-season-fall-is-in-the/f02_RTX6EJJJ/original.jpg', title: 'third image'},
  {name: 'https://images.pexels.com/photos/4858579/pexels-photo-4858579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'forth image'}
]

const initialState = {
  slideIndex: 0
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: state.slideIndex === 0 ? images.length - 1 : state.slideIndex - 1
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % images.length
    };
  }
};

function Slide({image, offset}) {
  const active = offset === 0 ? true : null;
  return (
    <div 
      className='slide' 
      data-active={active} 
      style={{
        '--offset': offset, 
        '--dir': offset === 0 ? 0 : (offset > 0 ? 1 : -1),
        backgroundImage: `url('${image.name}')` }}
    >
    </div>
  )
}

function Slider() {
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  return (
    <>
      <div className='slides'>
      {
        [...images, ...images, ...images].map((img, i) => {
          let offset = images.length + (state.slideIndex-i)
          return <Slide image={img} offset={offset} />
        })
      }
      </div>
      <button onClick={() => dispatch({type: "PREV"})} className="prev-btn">&lt;</button>
      <button onClick={() => dispatch({type: "NEXT"})} className="next-btn">&gt;</button>
    </>
  )
}

export default Slider