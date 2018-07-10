
const black='⬛'
const white='⬜️'

/*const reverse=false

const pix_on=reverse?white:black
const pix_off=reverse?black:white

const writePixel=b=>parseInt(b)?pix_on:pix_off*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invert: false,
      value: `
00011000
00111100
01111110
11101111
11111101
10111111
11001111
01111110
`,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(param) {
    if(param==='invert')return (event)=>this.setState({invert:!this.state.invert});
    return (event)=>this.setState({[param]: param=='value'||event.target.value.length>0?event.target.value:undefined});
  }

  render() {
    const value = this.state.value
    const invert = this.state.invert
    return (
      React.createElement("form", {onSubmit: this.handleSubmit}, 
        React.createElement("label", null, 
          "Image data:", React.createElement("br", null), 
          React.createElement("textarea", {type: "text", value: value, onChange: this.handleChange('value')})
        ), React.createElement("br", null), 
        React.createElement("label", null, 
          "Invert", 
          React.createElement("input", {type: "checkbox", checked: invert, onChange: this.handleChange('invert')})
        ), 
        React.createElement("br", null), 
        
        React.createElement(Graphic, {str: value, invert: invert})
      )
    );
  }
}

const Graphic = ({str,invert}) => {
  const reverse=invert;
  
  const pix_on=reverse?white:black;
  const pix_off=reverse?black:white;

  const writePixel=b=>parseInt(b)?pix_on:pix_off;
  const s = str.split('\n').filter(s=>s.length>0)
       .map(c=>c.split('').map(writePixel).join(''))
  return (React.createElement("div", null, React.createElement("h3", null, `Tweet length: ${s.join('\n').length}`), React.createElement("div", null, 
      s.map(c=>(React.createElement("span", null, c, React.createElement("br", null))))
  )))}

      
const my_app = React.createElement(App, null)