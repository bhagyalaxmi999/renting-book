import React from 'react'

function Home() {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-12">
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                 <div className="carousel-indicators">
                    <button data-bs-slide-to="0" data-bs-target="#myCarousel"></button>
                    <button data-bs-slide-to="1" data-bs-target="#myCarousel"></button>
                    <button data-bs-slide-to="2" data-bs-target="#myCarousel"></button>
                 </div>

                <div className="carousel-inner" style={{ height: '500px'}}>
                    <div className="carousel-item active">
                      <img src={'https://wallpapercave.com/wp/wp10930609.jpg'} alt="" className="d-block w-100"  style={{ height: '500px'}} />
                      <div className="carousel-caption d-none d-md-block">
                        <h4 className="text-light display-4"> 
                          BookRent Provides the book rent @ very affordable Price. </h4>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src={'https://wallpapercave.com/dwp2x/wp11015490.jpg'} alt="" className="d-block w-100"  style={{ height: '500px'}} />
                      <div className="carousel-caption d-none d-md-block">
                         <h4 className="text-light display-4"> 
                          We have a great collection of books in all popular categories. </h4>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src={'https://wallpapercave.com/dwp2x/wp7812923.jpg'} alt="" className="d-block w-100"  style={{ height: '500px'}} />
                      <div className="carousel-caption d-none d-md-block">
                        <h4 className="text-light display-4"> 
                          Wide Categories of books of all ages. </h4>
                      </div>
                    </div>
                </div>
                
                <button className="carousel-control-prev" data-bs-target="#myCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home