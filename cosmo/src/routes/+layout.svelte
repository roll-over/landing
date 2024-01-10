<script lang="ts">
  import "../styles/app.css";
  import { page } from "$app/stores";
  import { Modal, Toast, initializeStores } from "@skeletonlabs/skeleton";

  import { clickOutside } from "$lib/clickOutside";

  import { localisation } from "$lib/localisation/localisation";
  import { onMount } from "svelte";
  let l = localisation($page.params.lang);
  $: l = localisation($page.params.lang);

  initializeStores();

  let w;

  $: pickingLang = false;

  onMount(() => {
    document.getElementsByTagName("html")[0].setAttribute("lang", $page.params.lang);
  });
</script>

<header class="flex flex-col justify-between p-2" bind:clientWidth={w}>
  <nav>
    <Toast position={"tr"} />
    <Modal />

    <div class="flex flex-col items-center justify-between p-2 md:flex-row">
      <a href={`/${$page.params.lang}`} class="flex flex-row">
        <span class="sr-only">cosmo-crm</span>
      </a>

      <div>
        <button
          class="variant-ghost btn"
          on:click={() => {
            pickingLang = !pickingLang;
          }}
        >
          {$page.params.lang === "ru" ? "Русский" : "English"}
        </button>
        <ul
          class={`bg-transparent ${pickingLang ? "absolute" : "hidden"}`}
          use:clickOutside
          on:click_outside={() => (pickingLang = false)}
        >
          <li>
            <a
              class="btn"
              href={$page.params.lang === "ru"
                ? $page.url.pathname
                : $page.url.pathname.replace("/en", "/ru")}
              hreflang="ru"
              on:click={() => {
                pickingLang = false;
                document.getElementsByTagName("html")[0].setAttribute("lang", "ru");
              }}>Русский</a
            >
          </li>
          <li>
            <a
              class="btn"
              href={$page.params.lang === "en"
                ? $page.url.pathname
                : $page.url.pathname.replace("/ru", "/en")}
              hreflang="en"
              on:click={() => {
                pickingLang = false;
                document.getElementsByTagName("html")[0].setAttribute("lang", "en");
              }}>English</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
<main class="w-full">
  <slot />
</main>

<div class="game-loader">
  <div class="game-loader__planet">
    <div class="loader-radius1"></div>
    <div class="loader-radius2"></div>
    <div class="loader-radius3"></div>
    <div class="loader-radius4"></div>
    <div class="loader-mini1"></div>
    <div class="loader-mini2"></div>
    <div class="loader-mini3"></div>
    <div class="loader-mini4"></div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <fegaussianblur in="SourceGraphic" stddeviation="15" result="blur"></fegaussianblur>
          <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7" result="goo"></fecolormatrix>
          <feblend in="SourceGraphic" in2="goo"></feblend>
        </filter>
      </defs>
    </svg>
  </div>
</div>
<footer>
  <div>
    <div class="flex flex-col justify-between p-2 text-xs text-slate-500 md:flex-row">
      <div class="flex flex-col gap-2">
        <span class="text-2xl">cosmo-crm</span>
        <span>© 2024 cosmo-crm</span>
      </div>

      <div class="flex flex-col gap-2">
        <a
          href="https://github.com/roll-over/landing?utm_source=cosmo-crm.com"
          class="p-3 text-slate-500 md:p-1">Source code</a
        >
        <a href="https://roll-over.org/?utm_source=cosmo-crm.com" class="p-3 text-slate-500 md:p-1"
          >roll-over</a
        >
        <a href={`/${$page.params.lang}/about`} class="p-3 text-slate-500 md:p-1">About</a>
      </div>

      <div class="flex flex-col gap-2">
        <a href={`/${$page.params.lang}/documents/cookie-policy`} class="p-3 text-slate-500 md:p-1"
          >Cookie Policy</a
        >
        <a href={`/${$page.params.lang}/documents/privacy-policy`} class="p-3 text-slate-500 md:p-1"
          >Privacy Policy</a
        >
        <a
          href={`/${$page.params.lang}/documents/terms-of-service`}
          class="p-3 text-slate-500 md:p-1">Terms of Service</a
        >
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  main {
    min-height: calc(100vh - 150px);
  }
  footer {
    min-height: 150px;
    background-color: var(--secondary-background-color);
  }

  .logo {
    height: 50px;
    width: 220px;
  }


  $intro-dark-color: #273355;
$intro-light-color: #11DBD9;
$angle: 5deg;

$color1:#FF217B;
$color2:#FF7878;
$color3:#FFA283;
$color4:#962A4E;
$color5:#13C2D3;


$iteration: Infinite;
$goocolor: #11DBD9;
$orbitcolor: grey;
$bigsize:8vw;
$smallsize:3vw;
$containerwidth:100vw;
$animoffset1:15vw;
$animoffset2:25vw;
$animoffset3:35vw;
$animoffset4:45vw;
$animtime:16s;
$containerheight:100vw;
$radius1: $smallsize*2;
$radius2: $smallsize*3;
$radius3: $smallsize*4;
$radius4: $smallsize*5;

.game-loader {
  width:100vw;
  height:100vh;
  position: fixed;
  top:0;
  left:0;
  z-index:-2;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow:hidden;
  background: $intro-dark-color;
}

.game-loader__btn{
  position: fixed;
  outline:none;
  		min-width:$bigsize*2;
		min-height:$bigsize/2;
  bottom:10vh;

  z-index:-1;
  background: transparent;
  border: 2px solid $intro-light-color;
  border-radius:25px;
  color: white;
  cursor: pointer;
  padding:0.5em 1em;
  transition: 1s;
  &:hover{
    background: $intro-light-color;
  }
}

.game-loader__planet{
	filter:url('#goo');
	position:relative;
	width:$containerwidth;
	height:$containerheight;
	&::after { //big goo in middle
		content:'';
		display:block;
		width:$bigsize;
		height:$bigsize;
		border-radius:50%;
		background:$goocolor;
	  box-shadow: $goocolor 0 0 24px 4px;
		margin:0 auto;
		position:absolute;
		top:$containerheight/2 - $bigsize/2;
		left:$containerwidth/2 - $bigsize/2;
		animation:scale $animtime*2 linear infinite, color5 $animtime linear $iteration;
	}
	.loader-mini1 {
		position:absolute;
		width:$smallsize;
		height:$smallsize;
		border-radius:50%;
		// background:darken($goocolor, 10%);
    background:$goocolor;
		top:$containerheight/2 -$smallsize/2;
		left:$containerwidth/2 - $smallsize/2;
		animation:move1 $animtime linear $iteration, color1 $animtime linear $iteration;
	}
  .loader-mini2 {
		position:absolute;
		width:$smallsize*1.2;
		height:$smallsize*1.2;
		border-radius:50%;
		// background:darken($goocolor, 10%);
    background:$goocolor;
		top:$containerheight/2 -$smallsize/2;
		left:$containerwidth/2 - $smallsize/2;
		animation:move2 $animtime+1s linear $iteration, color2 $animtime+1s linear $iteration;
	}
  .loader-mini3 {
		position:absolute;
		width:$smallsize*1.4;
		height:$smallsize*1.4;
		border-radius:50%;
		// background:darken($goocolor, 15%);
    background:$goocolor;
		top:$containerheight/2 -$smallsize/2;
		left:$containerwidth/2 - $smallsize/2;
		animation:move3 $animtime+2s linear $iteration, color3 $animtime+2s linear $iteration;
	}
  .loader-mini4 {
		position:absolute;
		width:$smallsize*1.6;
		height:$smallsize*1.6;
		border-radius:50%;
		// background:darken($goocolor, 20%);
    background:$goocolor;
		top:$containerheight/2 -$smallsize/2;
		left:$containerwidth/2 - $smallsize/2;
		animation:move4 $animtime+3s linear $iteration, color4 $animtime+3s linear $iteration;
	}
  .loader-radius1 {
		position:absolute;
		width:$radius1*2;
		height:$radius1*2;
		border-radius:50%;
		// background:darken($goocolor, 10%);
    border:0.5px solid $goocolor;
    opacity: 0.2;
    background:transparent;
		top:$containerheight/2 - $radius1;
		left:$containerwidth/2 - $radius1;
    transform:scale(0);
		animation: orbit1 $animtime linear $iteration;
	}
  .loader-radius2 {
		position:absolute;
		width:$radius2*2;
		height:$radius2*2;
		border-radius:50%;
		// background:darken($goocolor, 10%);
    border:0.5px solid $goocolor;
    opacity: 0.2;
    background:transparent;
        transform:scale(0);
		top:$containerheight/2 - $radius2;
		left:$containerwidth/2 - $radius2;
		animation: orbit2 $animtime+1s linear $iteration;
	}
  .loader-radius3 {
		position:absolute;
		width:$radius3*2;
		height:$radius3*2;
		border-radius:50%;
		// background:darken($goocolor, 10%);
    border:0.5px solid $goocolor;
    opacity: 0.2;
    background:transparent;
        transform:scale(0);
		top:$containerheight/2 - $radius3;
		left:$containerwidth/2 - $radius3;
		animation: orbit3 $animtime+2s linear $iteration;
	}
  .loader-radius4 {
		position:absolute;
		width:$radius4*2;
		height:$radius4*2;
		border-radius:50%;
		// background:darken($goocolor, 10%);
    border:0.5px solid $goocolor;
    opacity: 0.2;
    background:transparent;
        transform:scale(0);
		top:$containerheight/2 - $radius4;
		left:$containerwidth/2 - $radius4;
		animation: orbit4 $animtime+3s linear $iteration;
	}
}

.game-loader__planet--color{
  .loader-mini1 {
		background:darken($goocolor, 5%);
	}
  .loader-mini2 {
		background:darken($goocolor, 10%);
	}
  .loader-mini3 {
		background:darken($goocolor, 15%);
	}
  .loader-mini4 {
		background:darken($goocolor, 20%);
	}
}

.btn-play{
  left:$containerwidth/2 - ($bigsize+1);
}
@keyframes move1 {
	0% {
    transform: skewX($angle) rotate(0deg) translateY(0em) 
               rotate(0deg) skewX(-$angle) rotate(0deg);
    // background:$goocolor;
  }
  
  10% {
    transform: skewX($angle) rotate(180deg) translateY(-$radius1) 
               rotate(-180deg) skewX(-$angle) rotate(180deg);
  }
  25% {
    transform: skewX($angle) rotate(360deg) translateY(-$radius1*2) 
               rotate(-360deg) skewX(-$angle) rotate(360deg);
  }
  
  50% {
    transform: skewX($angle) rotate(720deg) translateY(-$radius1*2) 
               rotate(720deg) skewX(-$angle) rotate(720deg);
    // background:red;
  }
  
  75% {
    transform: skewX($angle) rotate(1080deg) translateY(-$radius1*2) 
               rotate(-1080deg) skewX(-$angle) rotate(1080deg);
                 }
  90% {
    transform: skewX($angle) rotate(1260deg) translateY(-$radius1) 
               rotate(-1260deg) skewX(-$angle) rotate(1260deg);
  }
  
  
  100% {
    transform: skewX($angle) rotate(1440deg) translateY(0em) 
               rotate(-1440deg) skewX(-$angle) rotate(1440deg);
    // background:$goocolor;
  }
}

@keyframes move2 {
	0% {
    transform: skewX($angle) rotate(0deg) translateY(0em) 
               rotate(0deg) skewX(-$angle) rotate(0deg);
  }
  
  10% {
    transform: skewX($angle) rotate(180deg) translateY(-$radius2) 
               rotate(-180deg) skewX(-$angle) rotate(180deg);
  }
  25% {
    transform: skewX($angle) rotate(360deg) translateY(-$radius2*2) 
               rotate(-360deg) skewX(-$angle) rotate(360deg);
  }
  
  50% {
    transform: skewX($angle) rotate(720deg) translateY(-$radius2*2) 
               rotate(720deg) skewX(-$angle) rotate(720deg);
  }
  
  75% {
    transform: skewX($angle) rotate(1080deg) translateY(-$radius2*2) 
               rotate(-1080deg) skewX(-$angle) rotate(1080deg);
                 }
  90% {
    transform: skewX($angle) rotate(1260deg) translateY(-$radius2) 
               rotate(-1260deg) skewX(-$angle) rotate(1260deg);
  }
  
  
  100% {
    transform: skewX($angle) rotate(1440deg) translateY(0em) 
               rotate(-1440deg) skewX(-$angle) rotate(1440deg);
  }
}

@keyframes move3 {
	0% {
    transform: skewX($angle) rotate(0deg) translateY(0em) 
               rotate(0deg) skewX(-$angle) rotate(0deg);
  }
  
  10% {
    transform: skewX($angle) rotate(180deg) translateY(-$radius3) 
               rotate(-180deg) skewX(-$angle) rotate(180deg);
  }
  25% {
    transform: skewX($angle) rotate(360deg) translateY(-$radius3*2) 
               rotate(-360deg) skewX(-$angle) rotate(360deg);
  }
  
  50% {
    transform: skewX($angle) rotate(720deg) translateY(-$radius3*2) 
               rotate(720deg) skewX(-$angle) rotate(720deg);
  }
  
  75% {
    transform: skewX($angle) rotate(1080deg) translateY(-$radius3*2) 
               rotate(-1080deg) skewX(-$angle) rotate(1080deg);
                 }
  90% {
    transform: skewX($angle) rotate(1260deg) translateY(-$radius3) 
               rotate(-1260deg) skewX(-$angle) rotate(1260deg);
  }
  
  
  100% {
    transform: skewX($angle) rotate(1440deg) translateY(0em) 
               rotate(-1440deg) skewX(-$angle) rotate(1440deg);
  }
}

@keyframes move4 {
	0% {
    transform: skewX($angle) rotate(0deg) translateY(0em) 
               rotate(0deg) skewX(-$angle) rotate(0deg);
  }
  
  10% {
    transform: skewX($angle) rotate(180deg) translateY(-$radius4)
               rotate(-180deg) skewX(-$angle) rotate(180deg);
  }
  25% {
    transform: skewX($angle) rotate(360deg) translateY(-$radius4*2) 
               rotate(-360deg) skewX(-$angle) rotate(360deg);
  }
  
  50% {
    transform: skewX($angle) rotate(720deg) translateY(-$radius4*2) 
               rotate(720deg) skewX(-$angle) rotate(720deg);
  }
  
  75% {
    transform: skewX($angle) rotate(1080deg) translateY(-$radius4*2) 
               rotate(-1080deg) skewX(-$angle) rotate(1080deg);
                 }
  90% {
    transform: skewX($angle) rotate(1260deg) translateY(-$radius4) 
               rotate(-1260deg) skewX(-$angle) rotate(1260deg);
  }
  
  
  100% {
    transform: skewX($angle) rotate(1440deg) translateY(0em) 
               rotate(-1440deg) skewX(-$angle) rotate(1440deg);
  }
}

@keyframes scale {
	0% {
		transform:scale(1.5);
  }
	50% {
		transform:scale(1);
	}
	100% {
		transform:scale(1.5);
	}
}

@keyframes orbit1 {
	0% {
    transform:scale(0);
  }
  
  10% {
    transform:scale(1);
  }
  25% {
    transform:scale(2.2);
  }
  
   35% {
    transform:scale(2.1);
  }
  
  50% {
    transform:scale(2);
  }
  
    65% {
    transform:scale(2.1);
  }
  
  75% {
    transform: scale(2);
  }
  90% {
    transform:scale(1);
  }
  
  100% {
    transform: scale(0);
  }
}

@keyframes orbit2 {
	0% {
    transform:scale(0);
  }
  
  10% {
    transform:scale(1);
  }
  25% {
    transform:scale(2.2);
  }
  
   35% {
    transform:scale(2.1);
  }
  
  50% {
    transform:scale(2);
  }
  
    65% {
    transform:scale(2.1);
  }
  
  75% {
    transform: scale(2);
  }
  90% {
    transform:scale(1);
  }
  
  100% {
    transform: scale(0);
  }
}

@keyframes orbit3 {
		0% {
    transform:scale(0);
  }
  
  10% {
    transform:scale(1);
  }
  25% {
    transform:scale(2.2);
  }
  
   35% {
    transform:scale(2.1);
  }
  
  50% {
    transform:scale(2);
  }
  
    65% {
    transform:scale(2.1);
  }
  
  75% {
    transform: scale(2);
  }
  90% {
    transform:scale(1);
  }
  
  100% {
    transform: scale(0);
  }
}

@keyframes orbit4 {
		0% {
    transform:scale(0);
  }
  
  10% {
    transform:scale(1);
  }
  25% {
    transform:scale(2.2);
  }
  
   35% {
    transform:scale(2.1);
  }
  
  50% {
    transform:scale(2);
  }
  
    65% {
    transform:scale(2.1);
  }
  
  75% {
    transform: scale(2);
  }
  90% {
    transform:scale(1);
  }
  
  100% {
    transform: scale(0);
  }
}

@keyframes color1 {
	10% {
		background: $goocolor;
	}
	50% {
		background: $color1;
	}
	90% {
		background: $goocolor;
	}
}

@keyframes color2 {
	10% {
		background: $goocolor;
	}
	50% {
		background: $color2;
	}
	90% {
		background: $goocolor;
	}
}

@keyframes color3 {
	10% {
		background: $goocolor;
	}
	50% {
		background: $color3;
	}
	90% {
		background: $goocolor;
	}
}

@keyframes color4 {
	10% {
		background: $goocolor;
	}
	50% {
		background: $color4;
	}
	90% {
		background: $goocolor;
	}
}

@keyframes color5 {
	10% {
		background: $goocolor;
    box-shadow: $goocolor 0 0 24px 4px;
	}
	50% {
		background: $color5;
    box-shadow: $color5 0 0 24px 4px;
	}
	90% {
		background: $goocolor;
     box-shadow: $goocolor 0 0 24px 4px;
	}
}

.game-loader {
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  z-index: -2;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow:hidden;
}

svg { //Firefox bug fix
	position:absolute;
	z-index:-100;
	pointer-events:none;
}

</style>
