import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imgUrl, newsUrl, author, date,source } = this.props;
    return (
      <div className='my-3'>

        <div className="card" >
          <img src={!imgUrl ? "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg" : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <span class="position-absolute top-0 text-center  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:"50%",height:'25px',fontSize:'14px'}}>
              {source.name}
            </span>
            <p className="card-text"><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem;
