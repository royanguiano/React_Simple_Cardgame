import React from 'react'
import ReactDOM from 'react-dom'

let App = React.createClass({
  render: function() {
    return <div>Our first Component</div>
  }
})

ReactDOM.render(<App />, document.getElementById('root'))
