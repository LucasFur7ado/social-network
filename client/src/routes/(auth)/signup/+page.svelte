<script>
    import { register } from '../actions.js'

    let text = `
   SSSSSSSSSSSSSSS   iiii                                                                                  
 SS:::::::::::::::S i::::i                                                                                 
S:::::SSSSSS::::::S  iiii                                                                                  
S:::::S     SSSSSSS                                                                                        
S:::::S            iiiiiii    ggggggggg   gggggnnnn  nnnnnnnn         uuuuuu    uuuuuu ppppp   ppppppppp   
S:::::S            i:::::i   g:::::::::ggg::::gn:::nn::::::::nn       u::::u    u::::u p::::ppp:::::::::p  
 S::::SSSS          i::::i  g:::::::::::::::::gn::::::::::::::nn      u::::u    u::::u p:::::::::::::::::p 
  SS::::::SSSSS     i::::i g::::::ggggg::::::ggnn:::::::::::::::n     u::::u    u::::u pp::::::ppppp::::::p
    SSS::::::::SS   i::::i g:::::g     g:::::g   n:::::nnnn:::::n     u::::u    u::::u  p:::::p     p:::::p
       SSSSSS::::S  i::::i g:::::g     g:::::g   n::::n    n::::n     u::::u    u::::u  p:::::p     p:::::p
            S:::::S i::::i g:::::g     g:::::g   n::::n    n::::n     u::::u    u::::u  p:::::p     p:::::p
            S:::::S i::::i g::::::g    g:::::g   n::::n    n::::n     u:::::uuuu:::::u  p:::::p    p::::::p
SSSSSSS     S:::::Si::::::ig:::::::ggggg:::::g   n::::n    n::::n     u:::::::::::::::uup:::::ppppp:::::::p
S::::::SSSSSS:::::Si::::::i g::::::::::::::::g   n::::n    n::::n      u:::::::::::::::up::::::::::::::::p 
S:::::::::::::::SS i::::::i  gg::::::::::::::g   n::::n    n::::n       uu::::::::uu:::up::::::::::::::pp  
 SSSSSSSSSSSSSSS   iiiiiiii    gggggggg::::::g   nnnnnn    nnnnnn         uuuuuuuu  uuuup::::::pppppppp    
                                       g:::::g                                          p:::::p            
                           gggggg      g:::::g                                          p:::::p            
                           g:::::gg   gg:::::g                                         p:::::::p           
                            g::::::ggg:::::::g                                         p:::::::p           
                             gg:::::::::::::g                                          p:::::::p           
                               ggg::::::ggg                                            ppppppppp           
                                  gggggg                                                                   
    `
</script>

<section class="flex w-full h-screen items-center justify-center relative">
    <pre class="text-[#333] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {text}
      </pre>
    <form on:submit="{register}" class="flex flex-col z-10 items-center">
      <span class="text-3xl font-[mainFont] mb-2">Crear cuenta</span>
      <input placeholder="Nombre" name="text" type="email"
        class="rounded-full border-2 bg-[#141414]
          px-4 py-2 font-[mainFont] mb-2" />
      <input placeholder="Nombre de usuario" type="text" name="password"
        class="rounded-full border-2 bg-[#141414]
          px-4 py-2 font-[mainFont] mb-2" />
      <input placeholder="Email" name="email" type="email"
        class="rounded-full border-2 bg-[#141414]
          px-4 py-2 font-[mainFont] mb-2" />
      <input placeholder="Contraseña" type="password" name="password"
        class="rounded-full border-2 bg-[#141414]
          px-4 py-2 font-[mainFont] mb-2" />
      <button type="submit" class="bg-[#5AA598] text-black rounded-full px-4 py-2
            font-[mainFont] w-full mb-2">
        Crear
      </button>
    </form>
  </section>