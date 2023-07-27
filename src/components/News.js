import React, { Component } from 'react'
import NewsItem from "./NewsItem";
import Loading from './Loading';
import PropTypes from 'prop-types'


export class News extends Component {
 
  constructor(props) {
    super(props);
    console.log("const called form news comp");
    this.state = {
      articles: [],
      loding: false,
      page:1,
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
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9cfc4dc3c97c41c5a2cc029b577a95b3&pageSize=${this.props.pageSize}`
    this.setState({loding:true})

    const data = await fetch(url);
    const parsedData =await data.json();
    console.log(parsedData);
    this.setState({loding:false})

    this.setState({articles:parsedData.articles,totalResults: parsedData.totalResults});
  }
  next = async ()=>{
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){
      window.alert("bussss na")
    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9cfc4dc3c97c41c5a2cc029b577a95b3&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({loding:true})
    const data = await fetch(url);
    const parsedData =await data.json();
    console.log(parsedData);
    this.setState({loding:false})
    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles
    })
  }
  }
  prev = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9cfc4dc3c97c41c5a2cc029b577a95b3&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loding:true})
    const data = await fetch(url);
    const parsedData =await data.json();
    console.log(parsedData);
    this.setState({loding:false})

    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles
    })
  }



  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center my-5'>NewsMOnkey - Top Headlines of {this.captalize(this.props.category)}</h2>
       {this.state.loding&&<Loading/>}

        <div className="row">
          {!this.state.loding&&this.state.articles.map((element) => {
            //KEY= when we return anything by map() then there sholud be key which is unique for every ele of array
            return <div className="col-md-3" key = { element.url}>
              <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
            </div>
          })}

        </div>
        <div className="container d-flex justify-content-between my-5">
        <button type="button" disabled={this.state.page<=1}onClick={this.prev} className="btn btn-lg btn-dark"> &larr; Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.next} className="btn btn-lg btn-dark">Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default News
