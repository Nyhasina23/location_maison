<template>
  <div class="footer">
    <div class="line"></div>
        <div class="social-content">
            <h4>{{$t("contact")}}</h4>
            <div class="flex">
                <h5 class="flex justify-center"><box-icon type='solid' class="icons mr-2" name='phone-call'></box-icon> 03325145698 </h5>
                <h5 class="flex justify-center"><box-icon type='logo' class="icons mr-2"  name='facebook-circle'></box-icon> nyhasina finaritra </h5>
                <h5 class="flex justify-center"><box-icon name='gmail'  class="icons mr-2" type='logo' ></box-icon> nyhasina.finaritra@gmail.com </h5>
            </div>
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
    color : var(--primary-color-4);
    font-weight : 600;
}
.content h4 , h5 {
    margin : 0.5rem;
}
.social-content{
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items : center;
    margin : 1rem;
}
.icons{
    fill : var(--primary-color-4)
}
</style>