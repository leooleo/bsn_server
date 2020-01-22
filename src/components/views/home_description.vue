<template>
  <div>
    <div id="simple_header" style="margin-top:30px">Overview</div>
    <div id="project_description">
      A Body Sensor Network consists in a group of sensors on, near or inside the body, collecting vital data. There may be a 
      central node responsible for processing the data.   

      The BSN is a prototypical implementation of a Body Sensor Network as a system to be
      managed alongside a runtime goal-model for the analysis step at the
      system manager. We have implemented the BSN within the widely
      adopted Robot Operating System (ROS) for the sake of extensibility
      and maintainability. In the basic scenario, the BSN is prone to online 
      self-configuration for reliability or cost maintenance. Our BSN implementation
      consists in five sensors with a central node, responsible for fusing the data and 
      detecting an emergency. Each data collected by the sensors are classified by low, medium or 
      high risk, as described in the table below.
      <br />
      <br />
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <img src="../../assets/table.png" />
        </div>
      </div>

      <br />
      -> explicar em funcao da fig 1 do artigo.
      -> table 1
    </div>
    <div id="simple_header" style="margin-top:30px">Implementation</div>
    <div id="project_description">
      ->fig 2
      The end-to-end design of the proposed prototype followed the
      process illustrated in Fig. 1. From one side there are the system
      requirements expressed in the representation of a contextual goal
      model. From the other, an implementation view of the runtime
      self-adaptive system according to ROS architecture. Both models,
      the left hand side CGM and the right hand side code for exercising
      distinct configurations of the prototype and system managers are
      provided as 1 artifacts.
      The process is performed as follows: (1) a CGM was specified
      based on requirements elicited in previous works. (2) Then,
      a transformation from goal model to parametric formula was per-
      formed with GODA-MDP. (3) Following a mapping from goal
      model to software components, ros nodes were implemented to
      collaborate and satisfy the root goal. (4) The prototype is configured
      and integrated to a system manager (uses the parametric formula
      for reasoning), the knowledge repository and simulation nodes. (5)
      Finally, the prototype is executed and monitored via an interface
      during runtime.
    </div>

    <div id="simple_header">How to experiment</div>
    <div id="project_description">
      <p>The setup and usage of the BSN to evaluate, test and compare self-adaptation solutions and algorithms will be described below, in a step-by-step case study with five sensors. The configuration and launch of each module is done using a XML file named roslaunch. Each of these files contains parameters which are read and mapped to variables in the set up method of each module. All roslaunch files are in the configuration folder and the parameters can be modified as required.  </p>
      <h4 id="step-1-getting-bsn">Step 1: Getting BSN</h4>
      <p>The BSN <a href="https://github.com/lesunb/bsn" title="BSN repository">repository</a> contains the source code and the installation tutorial.</p>
      <h4 id="step-2-data-collection-setup">Step 2: Data Collection Setup</h4>
      <p>To set up the data generation, we should edit the patient&#39;s roslaunch file. 
      In this file, we configure the markov chain models for each sensor present in the experimentation in terms of the data range 
      represented by each state and the transitioning probability in between the states, from a transition matrix perspective. 
      Different patient profiles can be simulated in the setup, since 85bpm could be of no risk to some humans but to others it is of high risk. 
      Also, the transitions probability can be used to simulate diseases for example.
      In the example below, we set up the patient module to generate heart rate data, the frequency to perform a transition from states, 
      the Markov Chain and a offset, the time it will take to begin the state changing.</p>
      
      <span><pre><code>
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"vitalSigns"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"heart_rate"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_Change"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"0.2"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_Offset"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"10"</span>/&gt;

        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_State0"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"72,21,4,2,1"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_State1"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"14,61,19,4,2"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_State2"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"1,17,60,20,2"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_State3"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"0,2,15,70,13"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_State4"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"0,0,2,20,77"</span>/&gt;

        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_HighRisk0"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"0,70"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_MidRisk0"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"70,85"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_LowRisk"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"85,97"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_MidRisk1"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"97,115"</span>/&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"heart_rate_HighRisk1"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"115,300"</span>/&gt;
      </code></pre></span>
    
      <h4 id="step-3-setting-up-the-sensors">Step 3: Setting up the sensors</h4>
      <p>Each sensor should be configured to evaluate the data collected. This configuration is done by the roslaunch file of each sensor, 
        with the values for low, medium and high risks. We should provide the state values for the Markov Chains of each sensor too. 
        Lastly, we set up the initial frequency of each sensor, as exemplified below. </p>
      <span><pre><code>
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"frequency"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"1"</span> /&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"lowrisk"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"0,20"</span> /&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"midrisk"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"21,65"</span> /&gt;
        &lt;<span class="hljs-built_in">param</span> name=<span class="hljs-string">"highrisk"</span> <span class="hljs-built_in">value</span>=<span class="hljs-string">"66,100"</span> /&gt;
      </code></pre></span>

      <h4 id="step-4-building-the-manager-system">Step 4: Building the manager system</h4>
      
      <p>The manager system is responsible for the system adaptation, to do so it uses runtime data from the managed system and models for reasoning.
        The data acquisition relies on requests to a knowledge repository, in which the manager system should  make requisitions to data access node 
        specifying which data it is interested in computing, as illustrated in the code snippet below. We exemplify the request of the reliability of 
        each sensor and centralhub in respect to the number of failures in a window of execution.</p>
      
      <span><pre><code>
        <span class="hljs-symbol">archlib:</span>:DataAccessRequest c_srv<span class="hljs-comment">;</span>
        c_srv.request.name = ros::this_node::getName()<span class="hljs-comment">;</span>
        c_srv.request.query = <span class="hljs-string">"all:reliability"</span><span class="hljs-comment">;</span>
        client_module.call(c_srv)<span class="hljs-comment">;</span>
      </code></pre></span>
      
      <p>To send an adaptation command, the manager system should publish a message to the topic &quot;log_adapt&quot;, 
        as exemplified below, where we are adapting g3t1_1 changing it&#39;s frequency.</p>
      
      <span><pre><code>
        <span class="hljs-symbol">archlib:</span>:AdaptationCommand msg<span class="hljs-comment">;</span>
        msg.source = ros::this_node::getName()<span class="hljs-comment">;</span>
        msg.target = <span class="hljs-string">"g3t1_1"</span><span class="hljs-comment">;</span>
        msg.action = <span class="hljs-string">"freq=1.24"</span><span class="hljs-comment">;</span>
        adapt.publish(msg)<span class="hljs-comment">;</span>
      </code></pre></span>
    </div>

    <div id="us_section">
      <div style="font-size: 150%; margin-left: 60px;">About the dev's</div>
      <div id="credentials">
        Ricardo Diniz Caldas Unb -
        Computer Science master
        <br />
        <br />Gabriel Levi Gomes -
        Unb Computer Science student
        <br />
        <br />Léo Moraes da Silva -
        Unb Computer Science student
      </div>
      <div id="credentials">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/rdinizcal">Github Page</a>
        <br />
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/gabrielevi10"
        >Github Page</a>
        <br />
        <br />
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/leooleo">Github Page</a>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>    
  </div>
</template>

<style scoped>
#select_wrapper {
  margin-left: 20vw;
}
#head {
  text-align: center;
  background-color: #478dff;
  color: white;
  height: 60vh;
  margin-bottom: 50px;
}
#simple_header {
  text-align: center;
  border-bottom: 6px solid #478dff;
  width: 50%;
  margin-left: 25%;
  font-weight: 800;
  font-size: 270%;
}
#project_description {
  margin-left: 100px;
  margin-right: 100px;
  font-size: 130%;
  color: #515151;
  margin-top: 80px;
  margin-bottom: 80px;
}

#us_section {
  width: 100vw;
  font-size: 200%;
  color: white;
  background-color: #003d72;
  height: auto;
  float: left;
}

#credentials {
  margin-top: 50px;
  color: white;
  margin-left: 60px;
  font-size: 55%;

  float: left;
}

.center {
  margin-left: auto;
  margin-right: auto;
}

</style>