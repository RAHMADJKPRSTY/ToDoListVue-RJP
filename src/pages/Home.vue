<template>
    <div id="align">
        <b-jumbotron id="jack">
            <h1 class="text-uppercase"><u>to-do list</u></h1>
            <p><i>By Rahmad Jaka Prasetyo</i></p>
        </b-jumbotron>
    </div>
</template>

<script>

export default {
  name: "Home-Awal",
}
</script>

<style>
#jack{
    background-color: #575555;
  
}

#jack h1{
    color: #ffffff;
    font-weight: 700 !important;
    font-size: 11rem !important;
    box-shadow: #000000;
   
}

#jack p{
    color: #ffffff;
    font-weight: 400 !important;
    font-size: 20px !important;
}

#jack a{
    font-family: 'Dancing Script', cursive;
    text-decoration: none;
    color: #FEEDE1;
    font-weight: 600 !important;
    font-size: 24px;
}

#align{
    height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    #jack h1{
    color: #FEEDE1;
    font-weight: 700 !important;
    font-size: 5rem !important;
}
}

</style>

