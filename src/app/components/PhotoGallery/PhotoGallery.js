import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';
import classes from 'join-classnames';
//may end up not even using PhotoSwipeGallery because it can't start with an image open yet
import {PhotoSwipe} from 'react-photoswipe';

export default class PhotoGallery extends React.Component{
    static defaultProps ={

    }
    state = {}
    handleImageChange = (e)=>{
        //todo: identify which picture just changed
        if(typeof this.props.onChange ==='function'){
            let key = e.currItem.key;
            this.props.onChange(key);
        }
    }

    handleImageClose = (e) =>{
          if(typeof this.props.onChange ==='function'){
              this.props.onChange(null);//notify that we are closed now
          }
    }

    handleThumbClicked = (item)=>{
        this.setState({findKey:item.key});
    }

    getThumbnailContent = (item,w=120,h=90) =>{
      if(typeof this.props.TileBuilder ==='function'){
            return this.props.TileBuilder(item,w,h);
      } else {
          return (<img src={item.thumbnail} width={w} height={h} alt={item.title}/>)
      }
    }   
     buildCaption = (item, captionEl, isFake)=>{
        /* // item      - slide object
        // captionEl - caption DOM element
        // isFake    - true when content is added to fake caption container
        //             (used to get size of next or previous caption)
            if(!item.title) {
                captionEl.children[0].innerHTML = '';
                return false;
            }
            captionEl.children[0].innerHTML = item.title;
            return true;
        */
        var target = captionEl.children[0];
        if(!target){ return false; }
        if(typeof this.props.CaptionBuilder === 'function'){
            ReactDOM.render( this.props.CaptionBuilder(item), target);
            return true;
        } else if(item.title){
            ReactDOM.render( (
                <span>{item.title}</span>
                ),target)
        }
        return false;
    }
    

    optionsGenerator = (items,key,modal) => {
    //http://photoswipe.com/documentation/options.html 
        let index = 0;
        let startOpen=false;
        if(items && key){
            let found = items.filter(i=>i.key===key)[0];
            if(found){
                startOpen = true;
                index = items.indexOf(found);
            }
        }
        //for more on options you can set look here: photoswipe.com/documentation/options.html
        return {
            addCaptionHTMLFn:this.buildCaption,
            index,
            modal,
            loop:true,
            closeEl:true,
            captionEl: true,
            fullscreenEl: false,
            zoomEl: false,
            shareEl: false,
            counterEl: false,
            arrowEl: false,
            preloaderEl: true,
            startOpen//this one is not a photoswipe option just something useful for determing if we should set a prop on the gallery
        }
    };
    componentDidMount(){
        if(this.props.OpenPic){
            setTimeout(()=> this.setState({findKey:this.props.OpenPic}),500)
        }
    }
  
    render (){
        //let findKey = this.state.findKey? this.state.findKey: this.props.OpenPic;
        let findKey = this.state.findKey
        let options = this.optionsGenerator(this.props.Images, findKey, true);
        let startOpen = options.startOpen;
        let items = this.props.Images.map(i=>({...i, thumbnail:i.thumb}) ); 

        return (
            <div className={styles.PhotoGallery}>
                <div className={styles.Images}>
                    {items.map( i=> (
                        <div className={styles.Thumb}
                              onClick={(e)=>{this.handleThumbClicked(i)} }>
                            {this.getThumbnailContent(i,this.props.ThumbW, this.props.ThumbH)}
                        </div>
                    ))}
                </div>
                <PhotoSwipe items={items}
                            options = {options}
                            isOpen = {startOpen}
                            afterChange = {this.handleImageChange}
                            close={this.handleImageClose}/>
            </div>
        )
    }
}
//<link rel="stylesheet" href="https://rawgit.com/vn38minhtran/react-photoswipe/master/dist/photoswipe.css"/>
        

