import React from 'react'
import Masonry from 'react-masonry-css';

function PinShimmer() {

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 2
    };

    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                <div className='bg-gray-200 h-96 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-60 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-96 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-60 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-60 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-96 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-96 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-96 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
                <div className='bg-gray-200 h-60 rounded-xl w-60 mb-3 animate-pulse duration-700'></div>
            </Masonry>

        </div>
    )
}

export default PinShimmer