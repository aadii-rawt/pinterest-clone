import React from 'react'
import Masonry from 'react-masonry-css';
import { useSelector } from 'react-redux';

function PinShimmer() {

    const {breakpointColumnsObj} = useSelector(state => state.statesSlice)
    
    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                <div className='bg-gray-200 h-96 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-60 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-96 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-60 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-60 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-96 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-96 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-96 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-60 rounded-xl md:w-60 mb-3 animate-pulse duration-700'></div>
            </Masonry>

        </div>
    )
}

export default PinShimmer