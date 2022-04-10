const bodyTag = document.querySelector("body")
const pixelsTag = document.querySelector("div.pixels")
const progressTag = document.querySelector("div.progress")
const sections = document.querySelectorAll("section")
const titleTag = document.querySelector(".title")
const pageTag = document.querySelector(".page")
const headerTag = document.querySelector("header")


//when page is scrolled, update pixels tag to be how far //the user has 

document.addEventListener("scroll", () => {
  const pixels = window.pageYOffset

  pixelsTag.innerHTML = pixels
})

//when we scroll the page make a progress bar that keep track of the distance

document.addEventListener("scroll", () => {
  const pixels = window.pageYOffset;
  const pageHeight = bodyTag.getBoundingClientRect().height
  const totalScrollableDistance = pageHeight - window.innerHeight;

  const percentage = pixels / totalScrollableDistance;

  progressTag.style.width = `${percentage * 100}%`;
})

//when user scrolls the page, see how far down the page they've scrolled
//for each section, checker wheteher user passed it and if user has...
//then update the text in the header

document.addEventListener("scroll", () => {
  const pixels = window.pageYOffset
  sections.forEach(section => {
      if (section.offsetTop -50 <= pixels){
        //console.log(section.dataset.page)
        titleTag.innerHTML = section.getAttribute('data-title');
        pageTag.innerHTML = section.dataset.page; //different way of saying what was said in above line

        if (section.hasAttribute("data-is-light")) {
          headerTag.classList.add("dark")
        } else {
          headerTag.classList.remove("dark")
        }
      }
      }
    )
})

//when users scroll make paralax
//goal: move certain tags, based on how far they are from an anchor point
//anchor point: middle of the section
//how far to paralax: ratio of the distance scrolled to the middle point

document.addEventListener("scroll", function () {
  const topViewport = window.pageYOffset
  const midViewport = topViewport + (window.innerHeight/2)

  

  sections.forEach(section => {
    const topSection = section.offsetTop
    const midSection = topSection + (section.offsetHeight/2)
    //console.log(midSection)

    //find distance from section to midpoint
    const distanceToSection = midViewport - midSection

    const parallaxTags = section.querySelectorAll(`[data-parallax]`)

    //loop over each parallaxed tag
    parallaxTags.forEach(tag => {
      const speed = parseFloat(tag.getAttribute("data-parallax")) //turn into number
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`
    })
    
  })
})
