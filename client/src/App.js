import React, { Component } from 'react';
import mistery from './mistery.png';

const names = {
  alt_name: 'Original Name',
  age: 'Age',
  birth:'Date of Birth',
  origin: 'Place of Origin',
  height: 'Height',
  weight: 'Weight',
  blood: 'Blood Type',
  bust: 'Bust',
  waist: 'Waist',
  hip: 'Hip',
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      waifu:{
        image:mistery,
        description:'?',
      },
      dDisplay: 'none',
      loading:false,
    }
  }

  toggleDescription() {
    var display = (this.state.dDisplay === "none") ? "block" : "none";
		this.setState({
			dDisplay: display
    });
  }

  fetchWaifu(){
    this.setState({loading:true})
    fetch(`/api/getRandomWaifu`)
    .then(res => res.json())
    .then((data) => {
      for(var key in data){
        if(data[key] === null || Number(data[key]) === 0){ //fuck Lint?
          data[key] = '';
        }
      }
        this.setState({
          waifu:{
            image: data.display_picture,
            name: data.name,
            from: data.series.name,
            alt_name: data.alternative_name,
            age: data.age,
            birth:`${data.birthday_month}${data.birthday_day ? ` ${data.birthday_day}` : ''}${data.birthday_year ? `, ${data.birthday_year}` : ''}`, //improve this
            origin: data.origin,
            height: data.height,
            weight: data.weight,
            blood: data.blood_type,
            bust: data.bust,
            waist: data.waist,
            hip: data.hip,
            description: data.description
          }
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
            <div className="image" >
              <div className="description" style={{display: this.state.dDisplay}}>{this.state.waifu.description}</div>
              <img src={this.state.waifu.image} alt="Waifu" onLoad={() => this.setState({loading:false})} onError={() => this.setState({loading:false})}/>
              <div className="dToggle" onClick={this.toggleDescription.bind(this)}>i</div>
            </div>
            <div className="info">
              {Object.keys(this.state.waifu).map((key, index) => {
                if(key === 'image' || key === 'description'){
                  return null;
                }
                else if(key === 'name' || key === 'from'){
                  return <section key={index} className={key}>{this.state.waifu[key]}</section>
                }
                else if(this.state.waifu[key]){
                  return <section key={index}><span>{names[key]}</span><br /><span>{this.state.waifu[key]}</span></section>;
                }
                return null;
              })}
            </div>
          </div>
          <div className="btn" onClick={this.fetchWaifu.bind(this)}>GET A RANDOM WAIFU</div>
        </div>
      </div>
    );
  }
}

export default App;