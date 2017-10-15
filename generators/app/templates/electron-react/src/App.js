import React, {Component} from 'react';
<% if (autoupdate) { %>
const electron = window.require("electron") // little trick to import electron in react
const ipcRenderer = electron.ipcRenderer
<% } %>

class App extends Component {
    constructor(props) {
        super(props);

      <% if (autoupdate) { %>
        this.state = {
          updateReady:false
        }
        ipcRenderer.on('updateReady', (event, text) => {
            this.setState({updateReady:true})
        })
      <% } %>

    }

    render() {
        return <div>
          Foobar
          <% if (autoupdate) { %>
          <button onClick={()=>ipcRenderer.send('quitAndInstall')}>{this.state.updateReady ? "click to update" : "no updates ready"}</button>
          <% } %>
        </div>
    }
}

export default App;
