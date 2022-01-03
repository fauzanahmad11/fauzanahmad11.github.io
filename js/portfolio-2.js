// When the user scrolls down 20px from the top of the document, show the button

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const btnToTop = document.querySelector('.scroll-to-top');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnToTop.style.display = "block";
        btnToTop.addEventListener('click', () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })
    } else {
        btnToTop.style.display = "none";
    }
}

const state = {};
const carouselList = document.querySelector('.section-ability-content .list-ability');
const carouselItems = document.querySelectorAll('.section-ability-content .list-ability .item');
const elems = Array.from(carouselItems);

if (typeof (carouselList) != 'undefined' && carouselList != null) {
    carouselList.addEventListener('click', function (event) {
        var newActive = event.target;
        var isItem = newActive.closest('.item');

        if (!isItem || newActive.classList.contains('active')) {
            return;
        };

        update(newActive);
    });
}

const update = function (newActive) {
    const newActivePos = newActive.dataset.pos;

    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);
    const mSec = elems.find((elem) => elem.dataset.pos == -2);
    const sec = elems.find((elem) => elem.dataset.pos == 2);
    const mThi = elems.find((elem) => elem.dataset.pos == -3);
    const thi = elems.find((elem) => elem.dataset.pos == 3);
    const first = elems.find((elem) => elem.dataset.pos == -4);
    const last = elems.find((elem) => elem.dataset.pos == 4);

    current.classList.remove('active');

    [current, prev, next, mSec, sec, mThi, thi, first, last].forEach(item => {
        var itemPos = item.dataset.pos;

        item.dataset.pos = getPos(itemPos, newActivePos)
    });
};

const getPos = function (current, active) {
    const diff = current - active;

    if (Math.abs(current - active) > 4) {
        return -current
    }

    return diff;
}

// scroll smooth
// Put all links in a variable
const links = document.querySelectorAll('.js-scroll');

// Add event listener to all links
links.forEach(function (elem) {
    elem.addEventListener('click', smoothScroll)
});

// Magic function to scroll smooth!
function smoothScroll(e) {
    // Prevent default anchor behaviour
    e.preventDefault();

    // Get clicked links href attribute
    const link = this.getAttribute("href");

    // Get the targets position
    const offsetTop = document.querySelector(link).offsetTop;

    // Finally scroll to target
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}