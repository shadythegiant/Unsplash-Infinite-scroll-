"use strict";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API:
const count = 10;
const apiKey = "14sAXSbsuKfowtgmedYKbmPSoYTu5VWBL5YiBQZOjq0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// LOad image function

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
  console.log("image Loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imagesLoaded = 0;
  }
}
// display photos function

function displayPhotos() {
  totalImages = photosArray.length;
  // run forEach for every element in photosArray
  photosArray.forEach((photo) => {
    //  creat a <a>  to link to the link of the photo
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // creat img tag for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    // add event listener to check if photos were loaded.

    img.addEventListener("load", imageLoaded);

    // put img tag in a tag, then inside the imageContainer

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// get photos from api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// check n see if scrollin near bottom, then load new photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

// On load

getPhotos();
