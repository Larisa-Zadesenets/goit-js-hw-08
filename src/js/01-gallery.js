// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const galleryList= document.querySelector(".gallery");
const imgCard = createImgCard (galleryItems);
galleryList.insertAdjacentHTML("beforeend", imgCard);
galleryList.addEventListener("click", onImgCardClick);

function createImgCard (galleryItems) {
    return galleryItems.map(({preview, original, description})=>{
        return `
        <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      
    />
  </a>
</li>
        `;
    }).join("");
}
function onImgCardClick(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains("gallery__image")) {
        return;
    }
    console.log (evt.target);

    const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
    `,
    { onShow: ()=> document.addEventListener("keydown", onCloseModal),
      onClose: ()=> document.removeEventListener("keydown", onCloseModal)
    })
    instance.show()

    function onCloseModal(evt) {
        if (evt.code ==="Escape") {
            instance.close();  
        }
    }
}


const lightbox = new SimpleLightbox(".gallery__link", 
{ captionsData: "alt", captionDelay: "250" })
