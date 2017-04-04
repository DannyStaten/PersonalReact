import React from 'react';
import styles from './style.css';
import classes from 'join-classnames';
//import {PhotoSwipe} from 'react-photoswipe';
import TinyMCE from 'react-tinymce';

//TODO: draft js rich text editor instead of tiny mce

export default class RichTextEditor extends React.Component{
  static defaultProps = {
    contents:"<p>text goes here</p>"
  };

  handleTextChange = (e) =>{
    if(typeof this.props.onChange === 'function'){
      this.props.onChange(e.target.getContent());
    }
  }
  configOptions = {
          plugins: 'autolink link lists preview',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
        }
  render(){

    return (
      <div className={styles.RichTextEditor}>
        <TinyMCE
        content={this.props.contents}
        config={this.configOptions}
        onChange={this.handleTextChange}
      />
    </div>
    )
  }
}



