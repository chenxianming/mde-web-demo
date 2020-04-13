# mde-demo

Markdown editor across Desktop / Web / App platform.

## Home page

[mde.coldnoir.com](http://mde.coldnoir.com "mde.coldnoir.com")

Software download

[https://github.com/chenxianming/mde-editor-desktop/releases](https://github.com/chenxianming/mde-editor-desktop/releases "https://github.com/chenxianming/mde-editor-desktop/releases")

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

- make sure Nodejs environment >= V8.0
- support ECMA6

``` 
git clone https://github.com/chenxianming/mde-web-demo.git
    
npm install
``` 

### ReactJS environment
- make sure your webpack environment run this code without any throuble.

```
$ npx run create-react my-project
$ cd my-project && npm start
```

- the react updated gen every weeks, if ur wepack version was difference, try to delete wepack, webpack-dev-server ( but i don't think it was healthly for another one, kown effects, u need reinstalled webpack then running on other project. )

## Run

``` 
npm start
``` 


- Browser editor on 
[http://127.0.0.1:3000](http://127.0.0.1:3000 "http://127.0.0.1:3000")


## Build minify and static page

``` 
npm run build
``` 


Generation asset path to ProjectPath/buld/, you can upload directory to any static server for use HTML5 specify.

## Development & themes redesign

1. Make theme directory in src/themes.
2. Edit src/config.json
3. Rplace theme value to your theme pathname
4. Enjoy development


#### Eject webpack project

``` 
npm run eject
``` 


## Other platform 

[Desktop](https://github.com/chenxianming/mde-editor-desktop "Desktop")

[PC embed](https://github.com/chenxianming/mde-web-embed-pc "PC embed")

[Mobile embed](https://github.com/chenxianming/mde-web-embed-mobile "Mobile embed")

[Desktop release](https://github.com/chenxianming/mde-editor-desktop/releases "Desktop release")


## Creadit

[www.coldnoir.com](http://www.coldnoir.com "www.coldnoir.com")
