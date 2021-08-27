To integrate popoto with the react, you have to follow these steps


1)	Install following packages using the commands 

Npm install popoto


Npm install d3

2)	Open index.html file in your react application (public/index.html)
3)	Add these code in head tag


<link rel="stylesheet" href="https://unpkg.com/popoto/dist/popoto.min.css">


<script src="https://unpkg.com/popoto"></script>


<script src="https://unpkg.com/popoto/dist/popoto.js"></script>


4)	The project directory will look like this 

src=>components=>Popoto.js
src=>components=>Popoto.css
src=>App.js

 
5)	Paste the following code inside Popoto.js file

import './Popoto.css';
import * as d3 from 'd3';
import * as popoto from 'popoto';
import React, { Component } from 'react';
import * as neo4j from 'neo4j-driver'

class Popoto extends Component {

    constructor(props) {
        super(props);
        this.popotoConfig = this.popotoConfig.bind(this);
        this.testVarible= '<section class="ppt-section-main"><div class="ppt-container-graph"><nav id="popoto-taxonomy" class="ppt-taxo-nav"></nav><div id="popoto-graph" class="ppt-div-graph"></div></div><div id="popoto-query" class="ppt-container-query"></div><div id="popoto-cypher" class="ppt-container-cypher"></div><div class="ppt-section-header">RESULTS <span id="result-total-count" class="ppt-count"></span></div><div id="popoto-results" class="ppt-container-results"></div></section>';
    }

    componentDidMount() {
        this.popotoConfig();
    }

    popotoConfig() {
     
        const driver = neo4j.driver('bolt://44.192.97.5:7687',
                  neo4j.auth.basic('neo4j', 'pronoun-finger-words'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});

                   /**
     * Set the driver to Popoto's query runner
     */
    popoto.runner.DRIVER = driver

    popoto.provider.node.Provider = {
        "Person": {
            "returnAttributes": ["name", "born"],
            "constraintAttribute": "name",
            "autoExpandRelations": true // if set to true Person nodes will be automatically expanded in graph
        },
        "Movie": {
            "returnAttributes": ["title", "released", "tagline"],
            "constraintAttribute": "title"
        }
    };

    popoto.result.onTotalResultCount(function (count) {
        document.getElementById("result-total-count").innerHTML = "(" + count + ")";
    });

    popoto.query.RESULTS_PAGE_SIZE = 100;
    popoto.logger.LEVEL = popoto.logger.LogLevels.INFO;
    

    driver.verifyConnectivity().then(function () {
        popoto.start("Person");
    }).catch(function (error) {
        // Handle error...

        console.log('error a gya : ' + error)
    })


                
    }

    

    render() {

        return (
            <div class="ppt-body" dangerouslySetInnerHTML={{__html: this.testVarible}}>
        

            </div>
        )
    }
}  export default Popoto;


6)	Copy this code to popoto.css file

/* INIT POPOTO CLASSES */

#popoto-graph:fullscreen {
  width: 100%;
  height: 100%;
}
#popoto-graph:-webkit-full-screen {
  width: 100%;
  height: 100%;
}
#popoto-graph:-moz-full-screen {
  width: 100%;
  height: 100%;
}
#popoto-graph:-ms-fullscreen {
  width: 100%;
  height: 100%;
}
.ppt-div-graph {
  height: 50%;
}

.ppt-section-header {
  margin-top: 0 !important;
}

.ppt-section-main {
  height: 500px;
}

/* END POPOTO CLASSES */


7)	Now copy this to your app.js file 


import React, { Component } from 'react';
import Popoto from './components/Popoto';

class App extends Component {

  render() {
    return (
      <Popoto />
    );
  }
}

export default App;


8) Now run your project & Popoto will be working  
