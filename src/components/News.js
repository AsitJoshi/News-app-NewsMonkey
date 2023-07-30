import React, { Component } from 'react'
import NewsItem from "./NewsItem";
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loding: true,
      page:1,
      totalResults:0
    }
    document.title=`${this.captalize(this.props.category)} - NewsMonkey`
  }
  static deafultProps={
    country:'in',
    pageSize:8
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

   captalize = (str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  



  // *********************this function runs when the Component is rendered
  async componentDidMount(){
    this.props.setProgress(0);
    
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}`
    this.setState({loding:true})
    
    const data = await fetch(url);
    const parsedData =await data.json();
    this.props.setProgress(50);

    
    console.log(parsedData);
    this.setState({loding:false})
    
    this.setState({articles:parsedData.articles,totalResults: parsedData.totalResults});
    this.props.setProgress(100);
  }
  // next = async ()=>{
  //   if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){
  //     window.alert("bussss na")
  //   }
  //   else{
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9cfc4dc3c97c41c5a2cc029b577a95b3&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  //   this.setState({loding:true})
  //   const data = await fetch(url);
  //   const parsedData =await data.json();
  //   console.log(parsedData);
  //   this.setState({loding:false})
  //   this.setState({
  //     page:this.state.page+1,
  //     articles:parsedData.articles
  //   })
  // }
  // }
  // prev = async ()=>{
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9cfc4dc3c97c41c5a2cc029b577a95b3&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
  //   this.setState({loding:true})
  //   const data = await fetch(url);
  //   const parsedData =await data.json();
  //   console.log(parsedData);
  //   this.setState({loding:false})

  //   this.setState({
  //     page:this.state.page-1,
  //     articles:parsedData.articles
  //   })
  // }



  fetchMoreData=async()=>{
    this.props.setProgress(0);
    this.setState({page:this.state.page+1});
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({loding:true})
    const data = await fetch(url);
    const parsedData =await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    // this.setState({loding:false})
    
    this.setState({
      page:this.state.page+1,
      articles:this.state.articles.concat(parsedData.articles),
      loding:false
    })
    this.props.setProgress(100);
    
  }

  
  render() {
    return (
      <>
    
        <h2 className='text-center my-5'>NewsMOnkey - Top Headlines of {this.captalize(this.props.category)}</h2>
       {this.state.loding&&<Loading/>}
      {/* {this.state.loding=this.state.page+1===Math.ceil(this.state.totalResults/this.props.pageSize)?false:true} */}
        <InfiniteScroll
          dataLength = {this.state.articles.length}
          next = {this.fetchMoreData}
          hasMore = {this.state.articles.length<this.state.totalResults}
          loader = {<Loading></Loading>}
          >
         <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            //KEY= when we return anything by map() then there sholud be key which is unique for every ele of array
            return <div className="col-md-3" key = { element.url}>
              <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
            </div>
          })}

        </div>
        </div>
          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-5">
        <button type="button" disabled={this.state.page<=1}onClick={this.prev} className="btn btn-lg btn-dark"> &larr; Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.next} className="btn btn-lg btn-dark">Next &rarr;</button>
      </div> */}


      </>
    )
  }
}

export default News
