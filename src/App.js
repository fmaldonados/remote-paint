import React, {
    Component,
    Fragment
} from 'react';
import './App.css';
import Canvas from './canvas';
import { SwatchesPicker } from 'react-color';
import Chat from './Components/chat/chat';
class App extends Component {
    state = {
        color: "#0d47a1"
      }
    render() {
        const handleColorChange = ({ hex }) => {
            this.setState({color:hex});
        }

        return ( 
        <Fragment>
            <h3 style = {
                {
                    textAlign: 'center'
                }
            } > Pictionary </h3> <div className = "main" >
            <div className = "color-guide" >
                <h5 > Color Guide </h5> 
                <div className = "user user" > User </div> 
                <div className = "user guest" > Guest </div> 
                <SwatchesPicker 
                 color={this.state.color}
                onChangeComplete={ handleColorChange } />
            </div> 
            <Canvas color={this.state.color}/>
            <Chat title='Pictionary' />
            </div> 
            
        </Fragment>
        );
    }
}
export default App;