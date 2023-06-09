<script>
import { login } from "../actions.js"

let text = `                                                                                      
LLLLLLLLLLL                                                    iiii                   
L:::::::::L                                                   i::::i                  
L:::::::::L                                                    iiii                   
LL:::::::LL                                                                           
  L:::::L                  ooooooooooo      ggggggggg   gggggiiiiiiinnnn  nnnnnnnn    
  L:::::L                oo:::::::::::oo   g:::::::::ggg::::gi:::::in:::nn::::::::nn  
  L:::::L               o:::::::::::::::o g:::::::::::::::::g i::::in::::::::::::::nn 
  L:::::L               o:::::ooooo:::::og::::::ggggg::::::gg i::::inn:::::::::::::::n
  L:::::L               o::::o     o::::og:::::g     g:::::g  i::::i  n:::::nnnn:::::n
  L:::::L               o::::o     o::::og:::::g     g:::::g  i::::i  n::::n    n::::n
  L:::::L               o::::o     o::::og:::::g     g:::::g  i::::i  n::::n    n::::n
  L:::::L         LLLLLLo::::o     o::::og::::::g    g:::::g  i::::i  n::::n    n::::n
LL:::::::LLLLLLLLL:::::Lo:::::ooooo:::::og:::::::ggggg:::::g i::::::i n::::n    n::::n
L::::::::::::::::::::::Lo:::::::::::::::o g::::::::::::::::g i::::::i n::::n    n::::n
L::::::::::::::::::::::L oo:::::::::::oo   gg::::::::::::::g i::::::i n::::n    n::::n
LLLLLLLLLLLLLLLLLLLLLLLL   ooooooooooo       gggggggg::::::g iiiiiiii nnnnnn    nnnnnn
                                                     g:::::g                          
                                         gggggg      g:::::g                          
                                         g:::::gg   gg:::::g                          
                                          g::::::ggg:::::::g                          
                                           gg:::::::::::::g                           
                                             ggg::::::ggg                             
                                                gggggg                                `
</script>

<section class="flex w-full h-screen items-center justify-center relative">
  <pre class="text-[var(--secondary)] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {text}
    </pre>
  <form on:submit="{login}" class="flex flex-col z-10 items-center">
    <span class="text-3xl font-[mainFont] mb-2">Iniciar sesión</span>
    <input placeholder="Email" name="email" type="email"
      class="rounded-full border-2 bg-[var(--background)]
        px-4 py-2 font-[mainFont] mb-2" />
    <input placeholder="Contraseña" type="password" name="password"
      class="rounded-full border-2 bg-[var(--background)]
        px-4 py-2 font-[mainFont] mb-2" />
    <a class="w-full text-right pb-2" href="/signup">¿No tienes cuenta?</a>
    <button type="submit" class="bg-[var(--primary)] text-black rounded-full px-4 py-2
      font-[mainFont] w-full mb-2">
      Entrar  
    </button>
  </form>
</section>
