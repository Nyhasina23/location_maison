<template>
  <div class="footer">
    <div class="line"></div>
    <div class="content">
        <h4>Contactez-nous</h4>
        <h5>034 46 851 74</h5>
        <h5>LOT 75 IV 198</h5>
    </div>
  </div>
</template>

<script>
export default {
    name : 'FooterComponent'
}
</script>

<style scoped>
.line{
    border-bottom: 2px solid rgba(110, 109, 109, 0.521);
    margin : 1rem;
}
h4{
    text-decoration: underline;
    color :red;
}
.content h4 , h5 {
    margin : 0.5rem;
}
.footer .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items : flex-start;
    margin : 1rem;
}
</style>