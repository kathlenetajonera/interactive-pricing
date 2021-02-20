const pageViews = document.querySelector(".card__pageviews");
const price = document.querySelector(".card__price");
const priceRange = [{
    pageviews: "10K",
    monthlyPrice: Number(8).toFixed(2), //8.00
    annualPrice: computeDiscount(8)
},
{
    pageviews: "50K",
    monthlyPrice: Number(12).toFixed(2), //12.00
    annualPrice: computeDiscount(12)
},
{
    pageviews: "100K",
    monthlyPrice: Number(16).toFixed(2), //16.00
    annualPrice: computeDiscount(16)
},
{
    pageviews: "500K",
    monthlyPrice: Number(24).toFixed(2), //24.00
    annualPrice: computeDiscount(24)
},
{
    pageviews: "1M",
    monthlyPrice: Number(36).toFixed(2), //36.00
    annualPrice: computeDiscount(36)
}
]
const priceToggle = document.querySelector(".card__toggle-btn");
const annualPriceClass = "card__toggle-btn--annual";
const slider = document.querySelector(".card__slider-track");
const sliderBtn = document.querySelector(".card__slider-thumb");
const sliderProgress = document.querySelector(".card__slider-progress");

const gestureStart = () => dragging = true;
const gestureMove = e => {
    if (dragging === true) {
        const sliderWidth = slider.getBoundingClientRect().width;
        const sliderOffsetLeft = slider.getBoundingClientRect().left;
        let clientX;

        document.body.style.overflow = "hidden";
        sliderBtn.classList.add("card__slider-thumb--dragging");

        e.type === "mousemove" ? clientX = e.clientX : clientX = e.touches[0].clientX;

        if (clientX < sliderOffsetLeft) {
            position = 0;
        } else if (clientX > sliderWidth + sliderOffsetLeft) {
            position = 100;
        } else {
            currentPosition = clientX - sliderOffsetLeft;
            position = (currentPosition / sliderWidth) * 100;
        }

        sliderPosition();
    }
}
const gestureEnd = () => {
    dragging = false;
    document.body.style.overflow = "";
    sliderBtn.classList.remove("card__slider-thumb--dragging");
};

let position; //slider position - percentage
let dragging;
let currentPosition;
let windowWidth = window.innerWidth;

sliderPosition();

//desktop - mouse events
sliderBtn.addEventListener("mousedown", gestureStart);
document.addEventListener("mousemove", e => gestureMove(e));
document.addEventListener("mouseup", gestureEnd);

//mobile - touch events
sliderBtn.addEventListener("touchstart", gestureStart);
sliderBtn.addEventListener("touchmove", e => gestureMove(e))
sliderBtn.addEventListener("touchend", gestureEnd);

window.addEventListener("resize", () => {
    if (window.innerWidth != windowWidth) {
        windowWidth = window.innerWidth;
        document.location.reload();
    }
});

priceToggle.addEventListener("click", () => {
    if (!priceToggle.classList.contains(annualPriceClass)) {
        priceToggle.classList.add(annualPriceClass);
        updateContent(position);
    } else {
        priceToggle.classList.remove(annualPriceClass);
        updateContent(position);
    }
})

function sliderPosition() {
    const sliderWidth = slider.getBoundingClientRect().width;

    position === undefined ? position = 50 : position;

    sliderProgress.style.transform = "scaleX(" + position/100 + ")";
    sliderBtn.style.transform = "translate(" + (position/100 * sliderWidth - 20) + "px, -50%)"; // minus 20 to fix margin

    updateContent(position);
}

function updateContent(pos) {
    if (pos < 20) renderContent(0)
    else if (pos < 40) renderContent(1);
    else if (pos < 60) renderContent(2);
    else if (pos < 80) renderContent(3);
    else if (pos <= 100)renderContent(4);
    
    function renderContent(index) {
        const isAnnual = priceToggle.classList.contains(annualPriceClass);

        pageViews.textContent = priceRange[index].pageviews + " Pageviews";
        
        price.innerHTML = `
        $${ isAnnual ? priceRange[index].annualPrice : priceRange[index].monthlyPrice }
        <span class="card__price-type">
        ${ isAnnual ? '/ annual' : '/ month' }
        </span>
        `
    }
}

function computeDiscount(origPrice) {
    return (origPrice - (origPrice * .25)).toFixed(2);
}