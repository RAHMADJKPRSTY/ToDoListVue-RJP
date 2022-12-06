<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand btn btn-secondary" href="/" >ToDo List</a>
  
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
          <router-link to="/index" class="btn btn-outline-success">Home</router-link>
        </li>
        
        <li class="nav-item ml-2">
          <router-link to="/add" class="btn btn-outline-primary">Add Data New</router-link>
        </li>
      </ul>
      </div>
    </nav>
    
    <br>
    <br>
    <div class="container">
      <router-view></router-view>
    </div>
    </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
 
  };
}
}

</script>
