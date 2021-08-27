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

        console.log('error  : ' + error)
    })



                
    }

    

    render() {

        return (
            <div class="ppt-body" dangerouslySetInnerHTML={{__html: this.testVarible}}>
        

            </div>
        )
    }
}

export default Popoto;