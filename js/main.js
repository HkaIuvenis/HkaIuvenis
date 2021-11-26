window.addEventListener("load", () => {
    document.querySelector("html").classList.add("loaded");
    setTimeout(() => {
        document.querySelector(".loading").style.display = "none";
    },1050)
})
//POST LOADING
if(document.body.classList.contains("home")) {
    var jqxhr = $.getJSON( "news.json", function(e) {
        console.log(e);
        const homeS = document.querySelector(".banner-slider .swiper-wrapper");
        const posts = [... e.posts];
        for(let i=0; i <= 3; i++) {
           const postId =  posts[i].id;
           const postLink =  posts[i].link;
           const postTitle =  posts[i].title;
           const postText =  posts[i].text + "";
           const post = document.createElement("div");
           post.classList.add("swiper-slide");
           post.classList.add("modal-id");
           post.innerHTML = 
           `
           <img src="${postLink}" alt="">
           <div class="content">
           <h2 class="h1">${postTitle}</h2>
           <p>${postText.substring(0,200)}[...]</p>
           <button class="readmore btn primary-btn">Czytaj więcej</button>
           </div>
           `;
           $(post).attr("data-post-id", postId);
           homeS.appendChild(post);
           const post2 = document.createElement("div");
           post2.classList.add("news-modal");
           post2.classList.add("hide");
           $(post2).attr("data-post-id", postId);
           post2.innerHTML =
           `
            <div class="container">
                <div class="row">    
                    <div class="image col-md-6 col-sm-12">
                        <img src="${postLink}" alt="">
                    </div>
                    <div class="content col-md-6 col-sm-12">
                        <div class="close"><img src="images/close.svg"></div>
                        <h2 class="h1">${postTitle}</h2>
                        <p>${postText}</p>
                    </div>
                </div>
            </div>
           `;
           homeS.closest(".container").appendChild(post2);
        }
    })
}
if(document.body.classList.contains("body-news")) {
    var jqxhr = $.getJSON( "news.json", function(e) {
        const homeS = document.querySelector(".news .grid");
        const posts = [... e.posts];
        const len = posts.length;
        for(let i=0; i < len; i++) {
            const postId =  posts[i].id;
            const postLink =  posts[i].link;
            const postTitle =  posts[i].title;
            const postText =  posts[i].text + "";
           const post = document.createElement("a");
           post.classList.add("grid-image");
           if(i >= 9) {
               post.classList.add("hide");
           }
           post.classList.add("modal-id");
           post.innerHTML = 
           `
                <div class="image">
                    <img src="${postLink}" alt="">
                </div>
                <div class="content">
                    <h3 class="tertiary">${postTitle}</h3>
                    <div class="separator separator--tertiary"></div>
                    <p>${postText.substring(0, 200)}</p>
                    <button class="readmore">Czytaj Więcej</button>
                </div>
           `;
           $(post).attr("data-post-id", postId);
           homeS.appendChild(post);
           const post2 = document.createElement("div");
           post2.classList.add("news-modal");
           post2.classList.add("hide");
           $(post2).attr("data-post-id", postId);
           post2.innerHTML =
           `
            <div class="container">
                <div class="row">    
                    <div class="image col-md-6 col-sm-12">
                        <img src="${postLink}" alt="">
                    </div>
                    <div class="content col-md-6 col-sm-12">
                        <div class="close"><img src="images/close.svg"></div>
                        <h2 class="h1">${postTitle}</h2>
                        <p>${postText}</p>
                    </div>
                </div>
            </div>
           `;
           homeS.closest(".container").appendChild(post2);
        }
        if(len >= 9) {
            const btn = document.createElement("button");
            btn.innerHTML = 'Więcej';
            btn.classList.add("load-more");
            btn.classList.add("btn");
            btn.classList.add("secondary-btn");
            homeS.closest(".row").appendChild(btn);
        }
    })
}
if(document.body.classList.contains("body-gallery")) {
    var jqxhr = $.getJSON( "gallery.json", function(e) {
        const homeS = document.querySelector("#gallery");
        const posts = [... e.gallery];
        const len = posts.length;
        console.log(len);
        for(let i=0; i < len; i++) {
           const postLink =  posts[i].link;
           const post = document.createElement("a");
           post.classList.add("grid-image");
           if(i >= 9) {
               post.classList.add("hide");
           }
           post.innerHTML = 
           `
                <img src="${postLink}" alt="">
           `;
           $(post).attr("href", postLink);
           homeS.appendChild(post);
        }
        if(len >= 9) {
            const btn = document.createElement("button");
            btn.innerHTML = 'Więcej';
            btn.classList.add("load-more");
            btn.classList.add("btn");
            btn.classList.add("secondary-btn");
            homeS.closest(".row").appendChild(btn);
        }
    })
}

const inputs = document.querySelectorAll("footer .footer-input");

$(".footer-input").on('change', (e) => {
        const text = e.target.value + "";
        if(text.length > 0) {
            e.target.classList.add("active");
        } else {
            e.target.classList.remove("active");
        }
})

$('#menu-toggle').click(function(){
    $(this).toggleClass('open');
    $(".mobile-menu").toggleClass("open");
})
$(document).ready(function(){
    $('.navigation > ul > li > a').each(function(){
        if(window.location.href == this.href) {
            this.parentElement.classList.add("active");
        }
    });
});


var swiper = new Swiper(".banner-slider", {
    effect: "fade",
    loop: true,
    autoplay: true,
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


const galeriaPage = document.querySelector("main.galeriaPage");

if(galeriaPage) {
    window.addEventListener("load", () => {
        const imageSize = () => {
            const images = document.querySelectorAll(".galeriaPage .grid-image");
            images.forEach(image => {
                const widthImg = image.offsetWidth;
                image.style.height = `${widthImg}px`;
            });
    
            //ANIMATION DELAY
    
            for(let i = 0; i < images.length; i++) {
                images[i].style.animationDelay = `${i * .6}s`
            }
    
        }
        imageSize();
        window.addEventListener('resize', imageSize);
        
        lightGallery(document.getElementById('gallery'))
        const hides = document.querySelectorAll(".grid-image.hide");
        for(let i = 0; i < hides.length; i++) {
            hides[i].style.animationDelay = `${i * .6}s`
        }
        $(hides).slideUp();
        const loadMore = document.querySelector(".load-more");
        loadMore.addEventListener("click", () => {
            $(hides).slideDown();
            loadMore.style.display = 'none';
        });
    })

}
const newsPage = document.querySelector("main.newsPage");

if(newsPage) {
    const imageSize = () => {
        const images = document.querySelectorAll(".newsPage .grid-image");

        //ANIMATION DELAY

        for(let i = 0; i < images.length; i++) {
            images[i].style.animationDelay = `${i * .4}s`
        }

    }
    imageSize();
    window.addEventListener('resize', imageSize);
    
    const hides = document.querySelectorAll(".grid-image.hide");

    if(hides[0]) {
        for(let i = 0; i < hides.length; i++) {
            hides[i].style.animationDelay = `${i * .4}s`
        }
        $(hides).slideUp();
        const loadMore = document.querySelector(".load-more");
        loadMore.addEventListener("click", () => {
            $(hides).slideDown();
            loadMore.style.display = 'none';
        });
    }


}
window.addEventListener('load', () => {
    const readmores = document.querySelectorAll(".readmore");
    
    if(readmores[0]) {
        readmores.forEach(btn => {
            btn.addEventListener("click", () => {
                const gridImage = btn.closest(".modal-id");
                const id = $(gridImage).data("post-id");
                const modal = document.querySelector(`.news-modal[data-post-id="${id}"]`);
                modal.classList.add("active");
                modal.classList.remove("hide");
                document.querySelector("html").classList.add("hide");
            })
        })
        const modals = document.querySelectorAll(".news-modal");
        modals.forEach(modal => {
            modal.addEventListener("click", (e) => {
                if(e.target.classList.contains("news-modal")) {
                    modal.classList.remove("active");
                    document.querySelector("html").classList.remove("hide");
                }
            })
        })
        const closes = document.querySelectorAll(".news-modal .close");
        closes.forEach(close => {
            close.addEventListener("click", () => {
                close.closest(".news-modal").classList.remove("active");
                document.querySelector("html").classList.remove("hide");
            })
        })
    }
})


//OPCJA WYŁĄCZENIA

// window.addEventListener("load", () => {
//     document.querySelector("body > div").style.display = "none";
// })