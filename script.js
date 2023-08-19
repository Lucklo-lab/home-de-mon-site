  



class defilement {
    static init () {
         let ratio = 0.1
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: ratio
        }
        const callback = function(entries, observer) {
             entries.forEach((entry) => {
                     if(entry.intersectionRatio > ratio){
                        entry.target.classList.add('reveal-visible')
                        entry.target.classList.add('reveal-left-visible')
                        observer.unobserve(entry.target)
                     }
                
             })
        }
        
        const observer = new IntersectionObserver(callback, options)
        document.querySelectorAll('[class*="reveal-"]').forEach(function (r){
            observer.observe(r)
        })
        observer.observe(document.querySelector('.reveal-left'))
        
    }
}
defilement.init();
  
  

  
  /**
     * @param {string{}} gallery chemins des images de la lightbox
     * @param {string} url URL de l'image actuellement visible
     * @param {HTMLElement} element
     */

class Lightbox {
    static init () {
        const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('href'), gallery)
        }))
    }
    /**
     * @param {string{}} gallery chemins des images de la lightbox
     * @param {string} url URL de l'image
     */
    constructor (url, images) {
         this.element = this.buildDom(url)
         this.images = images 
         this.loadImage(url)
         this.onKeyUp = this.onKeyUp.bind(this)
         document.body.appendChild(this.element)
         document.addEventListener('keyup', this.onKeyUp)
    }
        /**
     * @param {string} url URL de l'image
     */
    loadImage (url) {
        this.url = null
        const image = new Image()
        const container = this.element.querySelector('.lightbox__container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader')
        container.innerHTML = ''
        container.appendChild(loader)
        image.onload = () => {
            container.removeChild(loader)
            container.appendChild(image)
            this.url=url
        }
        image.src = url
    }
    /**
     * ici je voudrais que le bouton echap puisse permettre de fermer
     * @param {keyboardEvent} e
     */
    onKeyUp (e) {
        if( e.key ==='Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        }

    }
    /**
     * image suivante 
     * @param {MouseEvent/keyboardEvent} e
     */
    next (e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url) 
        if (i === this.images.length - 1) {
            i = -1
        }
        this.loadImage(this.images[i + 1])
    }
    /**
     *  image precedente
     * @param {MouseEvent/keyboardEvent} e
     */
     prev (e) {
         e.preventDefault()
         let i = this.images.findIndex(image => image === this.url) 
         if (i === 0) {
            i = this.images.length
        }
        this.loadImage(this.images[i - 1])
    }
    /**
     * Ferme la lightbox 
     * @param {MouseEvent} e
     */

    close (e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        },500)
        document.removeEventListener('keyup', this.onKeyUp) 
    }
    /**
     * @param { string} url URL de L'image
     * @return {HTMLElement}
     */
    buildDom (url) {
         const dom = document.createElement('div')
         dom.classList.add('lightbox')
         dom.innerHTML = '<button class="lightbox__class">Fermer</button><button class="lightbox__next">Suivant</button><button class="lightbox__prev">precedent</button><div class="lightbox__container"></div>'
         dom.querySelector('.lightbox__class').addEventListener('click', this.close.bind(this)) // attention avec bind on l' utilise que dans un contexte precis l utiliser dans un autre pourrait etre fatale
         dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
         dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
         return dom
    }       

}
/**
 * <div class="lightbox">
    <button class="lightbox__class">Fermer</button><button class="lightbox__next">Suivant</button><button class="lightbox__prev">precedent</button><div class="lightbox__container"><img src="img/image-fisheye.jpg" alt="" ></div>


</div>
 */
Lightbox.init()

class popups {
    static init () {
        //popup login c est ici qu on appliquera un formulaire
document.querySelector(".buttonpopup").addEventListener("click", function(){

    document.querySelector(".popup").style.display = "flex";
    
}) 
document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
}) 
const username = document.getElementById("username");
const password = document.getElementById("password");
let form = document.querySelector('#form');


form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
   
 
    
    let data = FormData.entries();
       
    
 
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            let res = this.response;
            if (res.success) {
                console.log("utilisateur inscript !");
            } else {
                alert (res.msg);
            }
        } else  {
            alert("une erreur est survenue....");
        }
        
    };
    xhr.open("POST", "file:///C:/php/ind.php", true);
    xhr.responseType = "json";
    // xhr.setRequestHeader("content-type", "application/x-www.form-urlencoded");
      xhr.send(data);
 
 
 
    return false;
 });


 function checkInputs() {
    const usernameValue = username.value.trim();
    
    const passwordValue = password.value.trim();
    
   
 
 
    if(usernameValue === "") {
        setErrorFor(username, 'username cannot be blank');
       
    } else {
        setSuccessFor(username);
      
    
         if(passwordValue === "") {
             setErrorFor(password,'password cannot be blank');
         } else if(passwordValue === "doctor"){
            setSuccessFor(password);
            location.href="../Doctor/indexDoctor.html"; 
         } else if( passwordValue === "patient") {
             setSuccessFor(password);
             
                 location.href="../Patient/indexPatient.html";    
         } else if (passwordValue === "admin") {
            setSuccessFor(password);
            location.href="../Admin/index.html"; 
         }

     
    }
 
 
    
 
  
 
  
 
 // show a success message
 }
 
 
 
 function setErrorFor(input, message) {
    const formControl = input.parentElement; // .form-control
    const small = formControl.querySelector('small');
 
    // add error message inside small
    small.innerText = message;
 
    // add error class
    formControl.className = 'form-control error';
 }
 
 function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
 }
 
 


    }
}
popups.init()

class slider {
    static init () {
         // notre slide du menu principale
let img__slider = document.getElementsByClassName('img__slider');
let step = 0;
let nbre_img = img__slider.length;
let suivant = document.querySelector('.suivant');
let precedent = document.querySelector('.precedent');

function enleverActiveImage() {
    for(let i=0; i < nbre_img ; i++) {
        img__slider[i].classList.remove('active');
    }
}
suivant.addEventListener("click", function() {
    step++;
    if(step >= nbre_img) {
        step = 0;
    }
    enleverActiveImage();
    img__slider[step].classList.add('active');
})

precedent.addEventListener("click", function() {
step--;
if(step < 0) {
    step = nbre_img - 1;
}
enleverActiveImage();
img__slider[step].classList.add('active');
})
setInterval(function () {
    step++;
    if(step >= nbre_img) {
        step = 0;
    }
    enleverActiveImage();
    img__slider[step].classList.add('active'); 
},3000)

    }
}
  slider.init()

  /** Indicateur Animes */
const menu = document.querySelector('.menu-bar')
const menuItems = Array.from(menu.querySelectorAll('a'))
let activeItem = menu.querySelector('[aria-selected]')

/**
 * @param {{currentTarget: HTMLElement}} e
 */
function onItemClick(e) {
    if (e.currentTarget === activeItem) {
        return;
    } 
    
    activeItem?.removeAttribute('aria-selected')
    e.currentTarget.setAttribute('aria-selected', 'true')
    activeItem = e.currentTarget
}

menuItems.forEach((item) => {
    item.addEventListener('click', onItemClick)
})

