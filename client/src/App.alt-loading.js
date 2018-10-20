/*THIS VERSION CONTAINS AN EARLY DEVELOPMENT, ALTERNATIVE WAY OF DISPLAYING THE RESULTS

It only waits for the info to arrive and not for the image to load. This may make the app seem "faster" (as it displays the results faster by not loading the image), thus it was labeled "alt-loading".
Though it may seem like a better option for UX, it looks pretty broken on mobile (cause the image loading cause the wrapper's height to change, since .waifu and .image are width:100%), so it was removed.
*/

import React, { Component } from 'react';
import mistery from './mistery.png';

class App extends Component {
  constructor(){
    super()
    this.state = {
      image:mistery,
      name:'?',
      from:'?',
      alt_name:'?',
      age:'?',
      birth:'',
      origin:'?',
      height:'?',
      weight:'?',
      blood:'?',
      bust:'?',
      waist:'?',
      hip:'?',
      description:'?',
      dDisplay: 'none',
      loading:false,
      show_pic:true
    }
  }

  toggleDescription() {
    var display = (this.state.dDisplay === "none") ? "block" : "none";
		this.setState({
			dDisplay: display
    });
  }

  fetchWaifu(){
    this.setState({loading:true, show_pic:false})
    fetch('/api/getRandomWaifu')
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({
        loading:false,
        image:data.display_picture,
        name:data.name,
        from:data.series.name, //loop?
        alt_name:data.alternative_name,
        age:data.age,
        birth:`${data.birthday_month} ${data.birthday_day}, ${data.birthday_year}`,
        origin:data.origin,
        height:data.height,
        weight:data.weight,
        blood:data.blood_type,
        bust:data.bust,
        waist:data.waist,
        hip:data.hip,
        description:data.description,
      });
    });
  }
  
  render() {
    return (
      <div className="App">
        <div className={`loading ${this.state.loading ? '' : 'hide'}`}>Fetching waifu...</div>
        <div className="wrapper">
          <header>Waifu Randomizer</header>
          <div className={`waifu ${this.state.loading ? 'transparent' : ''}`}>
            <div className={`image ${this.state.show_pic ? '' : 'transparent'}`} >
              <div className="description" style={{display: this.state.dDisplay}}>{this.state.description}</div>
              <img src={this.state.image} alt="Waifu" onLoad={() => this.setState({show_pic: true})}/>
              <div className="dToggle" onClick={this.toggleDescription.bind(this)}>i</div>
            </div>
            <div className="info">
              <section className="name">{this.state.name}</section>
              <section className="from">{this.state.from}</section>
              <section><span>Original Name</span><br /><span className="original_name">{this.state.alt_name}</span></section>
              <section><span>Age</span><br /><span className="age">{this.state.age}</span></section>
              <section><span>Date of Birth</span><br /><span className="birth">{this.state.birth}</span></section>
              <section><span>Place of Origin</span><br /><span className="origin">{this.state.origin}</span></section>
              <section><span>Height</span><br /><span className="height">{this.state.height} cm</span></section>
              <section><span>Weight</span><br /><span className="weight">{this.state.weight} kg</span></section>
              <section><span>Blood Type</span><br /><span className="blood">{this.state.blood}</span></section>
              <section><span>Bust</span><br /><span className="bust">{this.state.bust} cm</span></section>
              <section><span>Waist</span><br /><span className="waist">{this.state.waist} cm</span></section>
              <section><span>Hip</span><br /><span className="hip">{this.state.hip} cm</span></section>
            </div>
          </div>
          <div className="btn" onClick={this.fetchWaifu.bind(this)}>GET A RANDOM WAIFU</div>
        </div>
      </div>
    );
  }
}

export default App;
