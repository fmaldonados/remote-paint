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
        color: "#0d47a1",
        user: ''
    }
    handleAddOption = (e) => {
        e.preventDefault();
        const user = e.target.elements.name.value.trim();
        e.target.elements.name.value = '';
        this.setState(() => ({ user }));
    };
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
                <h3>Register</h3>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="name"/>
                    <button className="button">Add Username</button>
                </form>
                <h5 > Color Guide </h5> 
                <div className = "user user" > User </div> 
                <div className = "user guest" > Guest </div> 
                <SwatchesPicker 
                color={this.state.color}
                onChangeComplete={ handleColorChange } />
            </div> 
            <Canvas color={this.state.color}/>
            <Chat title='Pictionary' user={this.state.user}/>
            </div> 
            
        </Fragment>
        );
    }
}
export default App;