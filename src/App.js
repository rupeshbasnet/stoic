import React from 'react';
import './App.css';
import { quotes } from './quotes.js';
import YouTube from 'react-youtube';
import IconButton from '@material-ui/core/IconButton';
import { PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';

const videoId = '5qap5aO4i9A';

class App extends React.Component { 
  state = { quote: '', author: '', source: '' };
  
  componentDidMount() {
    this.randomQuote();
    this.clock();
  }

  onReady = (event) => {
    this.setState({
      player: event.target,
      playing: false
    });
  }

  togglePlayVideo = () => {
    if (this.state.playing === false) {
      this.state.player.playVideo();
      this.setState({playing : true})
    } else {
      this.state.player.pauseVideo();
      this.setState({playing : false})
    } 
  }

  randomQuote = () => {
    let allQuotes = Object.values(quotes);
    let randomQuote = allQuotes[parseInt(Math.random() * allQuotes.length)];
    let { quote, author, source } = randomQuote;
    this.setState({ quote });
    this.setState({ author });
    this.setState({ source });
  }

  clock = () => {
    const changeQuote = 30000;
    setInterval(() => {
      this.randomQuote();
    }, changeQuote);
  }

  render() {
    let { quote, author, source } = this.state;
    const opts = {
      height: '0',
      width: '0'
    };

    return (
      <div className="App">
        <header className="App-header">
          <div className="quote-area">
            <h1 className="quote">{quote}</h1>
            <p className="author">{ author }</p>
            <p className="source">{ source }</p>
            <div>
              <YouTube videoId={videoId} opts={opts} onReady={this.onReady} />
              <IconButton onClick={this.togglePlayVideo}>
                {this.state.playing ? 
                  <PauseCircleFilled color="primary" /> :
                  <PlayCircleFilled color="primary" />
                }
              </IconButton>
            </div>
          </div>
        </header>
      </div>
    )
  };
}

export default App;
