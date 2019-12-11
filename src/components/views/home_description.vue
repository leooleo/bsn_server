<template>
  <div>
    <div id="simple_header" style="margin-top:30px">About the project</div>
    <div id="project_description">
      The B.S.N. is a software prototype that relies on a network of wifi sensors to monitor the human body vital signs. It should provide autonomous and real time response.
      <br />This is a project initiated on an academic research at Unb(University of Brasília) by Genaína Rodrigues and her students.
      This server is focused on the remote configuration and execution of the BSN.
    </div>

    <div id="simple_header">How does it work</div>
    <div id="project_description">
      The BSN is written on C++, for this language is able to provide a fast and reliable execution. Also the OpenDaVinci framework for real time systems was used to develop this artefact.
      <br />The system uses configuration to explicit what it expects as a healthy data.
      To generate and simulate data, a Markov Chain is used which is a model where the probabilitie
      of each state relies on the previous probabilities.
      You can read more about it on wikipedia
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://en.wikipedia.org/wiki/Markov_chain"
      >here</a>
      or watching this great video clicking
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://youtu.be/rFPySEM6rNE?t=78"
      >here</a>.
      <br />After generating, the data will be filtered using a moving average technique to remove noise.
      Later on it will be evaluated to calculate its risk. To understand deeper how it works please check
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/leooleo/bsn"
      >our repositorie</a>.
      <br />
      <br />To remotely execute, the BSN relies on an API written on Python3, which provides every feature available for this server. You can check our repositories used for the BSN on our own Gits, located on the page bottom.
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
  width: 70%;
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
</style>