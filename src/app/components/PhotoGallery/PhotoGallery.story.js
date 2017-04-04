 import React from 'react';
 import { storiesOf, action } from '@kadira/storybook';
 import PhotoGallery from './PhotoGallery';

const stubItems = [
  {
    src: 'http://lorempixel.com/1200/900/sports/1',
    thumb: 'http://lorempixel.com/120/90/sports/1',
    key:'cricket',
    w: 1200,
    h: 900,
    title: 'Cricket Bloke',
    description:'Cricket is a strange sport'
   
  },
  {
    src: 'http://lorempixel.com/1200/900/sports/2',
    thumb: 'http://lorempixel.com/120/90/sports/2',
    key:'surf',
    w: 1200,
    h: 900,
    title: 'Surf\'s Up Bro!',
    description:'Gnarly dude!'
  },
  {
    src: 'http://lorempixel.com/1200/900/sports/3',
    thumb: 'http://lorempixel.com/120/90/sports/3',
    key:'cycling',
    w: 1200,
    h: 900,
    title: 'Cycling! The World\'s best sport!',
    description:'The title says it all, but it is worth repeating.  Cycling rocks!'
  }
];

storiesOf('Photogallery', module) 

    .add('default', () => (<div>
        <PhotoGallery Images = {stubItems}/>
    </div>))

    .add('with thumb dimensions', ()=> (<div>
    <link rel="stylesheet" href="https://rawgit.com/vn38minhtran/react-photoswipe/master/dist/photoswipe.css"/>
    <PhotoGallery Images = {stubItems}
        ThumbW={200}
        ThumbH={200}/>
    </div>)

    )

     .add('start open', () => (<div>
    <link rel="stylesheet" href="https://rawgit.com/vn38minhtran/react-photoswipe/master/dist/photoswipe.css"/>
    <PhotoGallery Images = {stubItems}
        OpenPic="cycling"/>
    </div>))

     .add('notify of change', () => (<div>
    <link rel="stylesheet" href="https://rawgit.com/vn38minhtran/react-photoswipe/master/dist/photoswipe.css"/>
    <PhotoGallery Images = {stubItems}
       onChange={action('changed picture')}/>
    </div>))

    .add('caption builder', () => (<div>
    <link rel="stylesheet" href="https://rawgit.com/vn38minhtran/react-photoswipe/master/dist/photoswipe.css"/>
    <PhotoGallery Images = {stubItems}
       CaptionBuilder= {(item)=>(
           <div className="caption">
           {item.title && (<h3>{item.title}</h3>)}
           {item.description && (<div className="description">{item.description}</div>)}
           </div>
       )}/>
    </div>))

    .add('tile builder', () => (<div>
    <link rel="stylesheet" href="https://rawgit.com/vn38minhtran/react-photoswipe/master/dist/photoswipe.css"/>
    <PhotoGallery Images = {stubItems}
       TileBuilder= {(item)=>(
           <div className="caption">
           {item.title && (<h3>{item.title}</h3>)}
           {item.description && (<div className="description">{item.description}</div>)}
           </div>
       )}/>
    </div>))

    
