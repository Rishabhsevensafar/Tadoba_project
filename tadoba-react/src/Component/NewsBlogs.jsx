import React from 'react'
import wild from '../assets/images/tour-package2.webp'
import wild1 from '../assets/images/tour-package2.webp'
function NewsBlogs() {
    return (
        <>
        <section className='newsBlogSection'>
        <div>
            <h2>Latest News and Blog</h2>
            </div>
            <div className='row '>
                <div className='col-lg-3 col-md-3 col-sm-12  newsBlogDetail'>
                    <img className="imgWild" src={wild} alt="" />
                    <div className='blogtext'>
                        <p>By Admin on 10-12-2024</p>
                        <h4 className='blogtitle'>Best Nature and Wilderness Escapes in Maharashtra</h4>
                        <p>Maharashtra needs no introduction to Indians. Needless to mention, it is a state in western region...</p>
                        <button className='readmore'>Read More....</button>
                    </div>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-12 newsBlogDetail'> 
                    <img className="imgWild" src={wild} alt="" />
                    <div className='blogtext'>
                        <p>By Admin on 10-12-2024</p>
                        <h4 className='blogtitle'>Best Nature and Wilderness Escapes in Maharashtra</h4>
                        <p>Maharashtra needs no introduction to Indians. Needless to mention, it is a state in western region...</p>
                        <button className='readmore'>Read More....</button>
                    </div></div>

                    <div className='col-lg-3 col-md-3 col-sm-12  newsBlogDetail'>
                    <img className="imgWild" src={wild} alt="" />
                    <div className='blogtext'>
                        <p>By Admin on 10-12-2024</p>
                        <h4 className='blogtitle'>Best Nature and Wilderness Escapes in Maharashtra</h4>
                        <p>Maharashtra needs no introduction to Indians. Needless to mention, it is a state in western region...</p>
                        <button className='readmore'>Read More....</button>
                    </div>
                </div>

                <div className='col-lg-3 col-md-3 col-sm-12'>
                    <div className='suggesblk'>
                        <h4 className='blogtitle'>Popular Stories from Tadoba 
                        National Park</h4>
                        <p>By Admin on 10-12-2024</p>
                        
                    </div>
                    <hr />
                    <div className='suggesblk'>
                        <h4 className='blogtitle'>Popular Stories from Tadoba 
                        National Park</h4>
                        <p>By Admin on 10-12-2024</p>
                        
                    </div>
                    <hr />
                    <div className='suggesblk'>
                        <h4 className='blogtitle'>Popular Stories from Tadoba 
                        National Park</h4>
                        <p>By Admin on 10-12-2024</p>
                      
                    </div>
                    
                </div>
            </div>
            </section>
            </>
    )
}

export default NewsBlogs
