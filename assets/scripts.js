// Create an Intersection Observer to detect when the section is at the top of the viewport
var section = document.querySelector('.section_case-studies');

var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // If the section is at the top of the viewport, add the fade-out class
      section.classList.add('fade-out');
    } else {
      // Remove the fade-out class when the section is no longer at the top
      section.classList.remove('fade-out');
    }
  });
}, {
  threshold: 0.1, // Trigger when 10% of the section is visible
});

observer.observe(section);


// H1 Text effect 

$(document).ready(function () {
    var words = ["a Graphic Designer", "a Web Designer", "a UI/UX Designer", "an Art Director", "an Illustrator", "a Senior Multidisciplinary Designer"];
    var index = 0;
    var typingSpeed = 100;
    var deletingSpeed = 50;
    var pauseTime = 1600;
    var headingRole = $(".heading-role");
    var cursor = $(".cursor");

    function typeWord(word, i) {
        if (i < word.length) {
            headingRole.text(word.substring(0, i + 1));
            setTimeout(function () {
                typeWord(word, i + 1);
            }, typingSpeed);
        } else {
            if (index === words.length - 1) {
                setTimeout(function () {
                    headingRole.css("transition", "color 0.6s ease");
                    headingRole.css("color", "var(--base-color-brand--fuscia)");

                    setTimeout(function () {
                        cursor.css({
                            transition: "all 0.25s ease",
                            opacity: 0
                        });
                    }, 800);
                }, pauseTime);
            } else {
                setTimeout(deleteWord, pauseTime);
            }
        }
    }

    function deleteWord() { // ✅ Now globally available
        var word = words[index];
        var i = word.length;

        function erase() {
            if (i >= 0) {
                headingRole.text(word.substring(0, i));
                i--;
                setTimeout(erase, deletingSpeed);
            } else {
                index++;
                if (index < words.length) {
                    setTimeout(function () {
                        typeWord(words[index], 0);
                    }, typingSpeed);
                }
            }
        }
        erase();
    }

    // Start the animation properly
    headingRole.text(words[0]);
    setTimeout(deleteWord, pauseTime);
});


// Navigation

$(document).ready(function () {
    var navbar = $(".navbar1_container.nav-wrapper");
    var buttonLabels = $(".button-label");
    var logoSvgPaths = $(".navbar1_logo-link svg path");
    var buttons = $(".button.is-navbar1-button");
    var darkSectionClass = "section_case-studies";

    function applyDarkMode() {
        navbar.addClass("nav-dark");
        navbar.css({
            "background": "var(--base-color-brand--slate-dark)",
            "transition": "background-color 0.5s ease, border-color 0.5s ease",
        });
        buttonLabels.css({
            "color": "var(--base-color-neutral--white)",
            "transition": "color 0.5s ease"
        });
        logoSvgPaths.css({
            "stroke": "var(--base-color-brand--slate-light)",
            "transition": "stroke 0.5s ease"
        });
        buttons.css({
            "background-color": "var(--base-color-brand--slate-light)",
            "border": "var(--base-color-brand--slate-light)",
            "transition": "background-color 0.5s ease"
        });
    }

    function applyLightMode() {
        navbar.removeClass("nav-dark");
        navbar.css({
            "background": "rgba(255, 255, 255, 0.85)",
            "transition": "background-color 0.5s ease, border-color 0.5s ease",
        });
        buttonLabels.css({
            "color": "",
            "transition": "color 0.5s ease"
        });
        logoSvgPaths.css({
            "stroke": "",
            "transition": "stroke 0.5s ease"
        });
        buttons.css({
            "background-color": "var(--base-color-brand--fuscia)",
            "border": "var(--base-color-brand--olive)",
            "transition": "background-color 0.5s ease"
        });
    }

    function checkSection() {
        var navbarHeight = navbar.outerHeight();
        var scrollTop = $(window).scrollTop();
        var isDarkMode = false;

        $(".section_case-studies").each(function () {
            var section = $(this);
            var offsetTop = section.offset().top;
            var sectionHeight = section.outerHeight();

            if (scrollTop + navbarHeight >= offsetTop && scrollTop < offsetTop + sectionHeight) {
                isDarkMode = true;
                return false;
            }
        });

        if (isDarkMode) {
            applyDarkMode();
        } else {
            applyLightMode();
        }
    }

    



    document.addEventListener('DOMContentLoaded', function() {
        const caseStudiesSection = document.querySelector('.section_case-studies');
        const keepScrollingElement = document.querySelector('.keep-scrolling');
        
        if (!caseStudiesSection || !keepScrollingElement) {
          console.error('Required elements not found');
          return;
        }
        
        function checkVisibility() {
          // Get the viewport dimensions
          const viewportHeight = window.innerHeight;
          
          // Get the element's position and dimensions
          const rect = caseStudiesSection.getBoundingClientRect();
          
          // Check if the element fully occupies the viewport
          // This means the top is at 0 or very close to it (allowing for small rounding errors)
          // AND the bottom is at the viewport height or very close to it
          const isTopAligned = Math.abs(rect.top) < 1;
          const isBottomAligned = Math.abs(rect.bottom - viewportHeight) < 1;
          
          // Only add the visible class if the element perfectly fills the viewport
          if (isTopAligned && isBottomAligned) {
            keepScrollingElement.classList.add('visible');
          } else {
            keepScrollingElement.classList.remove('visible');
          }
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkVisibility);
        
        // Check on resize
        window.addEventListener('resize', checkVisibility);
        
        // Initial check
        checkVisibility();
      });
    


    

    $(window).on("scroll", checkSection);
    checkSection();

    // --- MutationObserver for .w-nav-button class change ---
    var navButton = document.querySelector(".w-nav-button");
    if (navButton) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === "class") {
                    var hasOpenClass = navButton.classList.contains("w--open");
                    if (hasOpenClass) {
                        applyDarkMode(); // Force dark mode when nav is open
                    } else {
                        checkSection(); // Revert based on scroll position
                    }
                }
            });
        });

        observer.observe(navButton, { attributes: true });
    }
});



// Anchor scrolling + Testimonial tab switching

document.addEventListener("DOMContentLoaded", function () {
    var lenis = new Lenis({
        duration: 1.5, // Adjust for smoothness
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    setTimeout(function () {
        if (window.Webflow && window.Webflow.require) {
            window.Webflow.require("ix2").init();
        }
        lenis.start();
    }, 300);

    // 🔹 Dynamic Scroll to Section & Tab Switch
    document.querySelectorAll("[data-scroll-to]").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("data-scroll-to");
            let targetSection = document.getElementById(targetId);

            // 🔹 Check if this button also needs to switch tabs
            let targetTab = this.getAttribute("data-tab");
            if (targetTab) {
                let tabLink = document.querySelector(`[data-w-tab="${targetTab}"]`);
                if (tabLink) {
                    tabLink.click(); // Switch to the correct tab
                }
            }

            if (targetSection) {
                lenis.scrollTo(targetSection, {
                    duration: 4.5, // Slower scroll
                    easing: (t) => 1 - Math.pow(1 - t, 4),
                    offset: -100 // Adjust spacing
                });
            }
        });
    });
});


// Trailing Cursor

$(document).ready(function () {
    var $cursor = $(".custom-cursor"),
        $cursorText = $(".cursor-text"),
        mouseX = 0, mouseY = 0,
        cursorX = 0, cursorY = 0,
        speed = 0.1;

    function animateCursor() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        $cursor.css({
            transform: `translate(${cursorX}px, ${cursorY}px)`,
        });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    $(document).on("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Handle hover interactions
    $(".cursor-hover").on("mouseenter", function () {
        $(".custom-cursor").addClass("cursor-scale");
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("cursor-scale");
    });
    $(".cursor-hover-dark").on("mouseenter", function () {
        $(".custom-cursor").addClass("cursor-scale-dark");
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("cursor-scale-dark");
    });

    $("[cursor-label]").on("mouseenter", function () {
        var label = $(this).attr("cursor-label");
        $cursorText.text(label);
        
        // Wait for text to update, then adjust cursor width dynamically
        setTimeout(() => {
            var textWidth = $cursorText[0].offsetWidth + 24; // Add padding
            $cursor.css({
                width: textWidth + "px"
            }).addClass("cursor-text-visible");
        }, 10);
        
    }).on("mouseleave", function () {
        $cursor.removeClass("cursor-text-visible").css({
            width: "6px" // Reset width to default
        });
        $cursorText.text(""); 
    });



    // Change cursor to white when inside section_case-studies
    $(".section_case-studies, .section_cta, .about-comp-wrap, .footer6_component").on("mouseenter", function () {
        $cursor.addClass("cursor-white");
    }).on("mouseleave", function () {
        $cursor.removeClass("cursor-white");
    });
    $(document).on("mouseenter", ".nav-dark", function () {
        $(".custom-cursor").addClass("cursor-white");
    }).on("mouseleave", ".nav-dark", function () {
        $(".custom-cursor").removeClass("cursor-white");
    });

});

document.querySelectorAll(".tool-icon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
        // Find all path elements inside the SVG
        icon.querySelectorAll("svg path").forEach((path) => {
            // Store the current class value
            path.dataset.originalClass = path.getAttribute("class");

            // Remove the class attribute to hide it
            path.removeAttribute("class");
        });
    });

    icon.addEventListener("mouseleave", () => {
        // Restore the class attribute on mouseleave
        icon.querySelectorAll("svg path").forEach((path) => {
            // Restore the original class
            if (path.dataset.originalClass) {
                path.setAttribute("class", path.dataset.originalClass);
            }
        });
    });
});

$(document).ready(function () {
    // When hovering over .tool-icon, add the 'tooltip' class to .custom-cursor and hide the system cursor
    $(".tool-icon, .has-video, .slider-arrow").on("mouseenter", function () {
        $(".custom-cursor").addClass("tooltip");
        //$(".cursor-carat").css("visibility", "visible");  // Make the .cursor-carat visible
        $(".cursor-text").css("visibility", "visible");  // Hide the .cursor-carat again
        $(this).css("cursor", "none");  // Hide the system cursor
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("tooltip");
        //$(".cursor-carat").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(this).css("cursor", "");  // Restore the default system cursor
    });
    
});




$(document).ready(function () {

    $(".navbar1_logo-link").on("mouseenter", function () {
        $(".custom-cursor").addClass("avatar");
        $(".cursor-avatar").css("visibility", "visible");  // Hide the .cursor-carat again
        $(".cursor-avatar").css("display", "block");  // Hide the .cursor-carat again
        $(this).css("cursor", "none");  // Hide the system cursor
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("avatar");
        $(".cursor-avatar").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(".cursor-avatar").css("display", "none");  // Hide the .cursor-carat again
        $(this).css("cursor", "");  // Restore the default system cursor
    });

    $(".has-video").on("mouseenter", function () {
        $(".custom-cursor").addClass("cursor-icon");
        //$(".cursor-carat").css("visibility", "visible");  // Make the .cursor-carat visible
        $(".cursor-icon").css("visibility", "visible");  // Hide the .cursor-carat again
        $(".cursor-play-icon").css("visibility", "visible");  // Hide the .cursor-carat again
        $(".cursor-play-icon").css("display", "block");  // Hide the .cursor-carat again
        $(this).css("cursor", "none");  // Hide the system cursor
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("cursor-icon");
        $(".cursor-play-icon").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(".cursor-play-icon").css("display", "none");  // Hide the .cursor-carat again
        //$(".cursor-carat").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(this).css("cursor", "");  // Restore the default system cursor
    });

    $(".is-centre-previous").on("mouseenter", function () {
        $(".custom-cursor").addClass("cursor-icon");
        //$(".cursor-carat").css("visibility", "visible");  // Make the .cursor-carat visible
        $(".cursor-icon").css("visibility", "visible");  // Hide the .cursor-carat again
        $(".cursor-prev-icon").css("visibility", "visible");  // Hide the .cursor-carat again
        $(".cursor-prev-icon").css("display", "block");  // Hide the .cursor-carat again
        $(this).css("cursor", "none");  // Hide the system cursor
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("cursor-icon");
        $(".cursor-prev-icon").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(".cursor-prev-icon").css("display", "none");  // Hide the .cursor-carat again
        //$(".cursor-carat").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(this).css("cursor", "");  // Restore the default system cursor
    });

    $(".is-centre-next").on("mouseenter", function () {
        $(".custom-cursor").addClass("cursor-icon");
        //$(".cursor-carat").css("visibility", "visible");  // Make the .cursor-carat visible
        $(".cursor-icon").css("visibility", "visible");  // Hide the .cursor-carat again
        $(".cursor-next-icon").css("visibility", "visible");  // Hide the .cursor-carat again
        $(".cursor-next-icon").css("display", "block");  // Hide the .cursor-carat again
        $(this).css("cursor", "none");  // Hide the system cursor
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("cursor-icon");
        $(".cursor-next-icon").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(".cursor-next-icon").css("display", "none");  // Hide the .cursor-carat again
        //$(".cursor-carat").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(this).css("cursor", "");  // Restore the default system cursor
    });
    

    $(".gallery14_mask").on("mouseleave", function() {
    // Find the video within this gallery mask
    var $video = $(this).find(".has-video video").get(0);
    var $image = $(this).find(".has-video .gallery14_image");
    
    // Remove cursor class
    $(".custom-cursor").removeClass("tooltip cursor-text-visible");
    
    // Pause the video immediately
    if ($video) {
        $video.pause();
        
        // Wait 0.5s, then fade in the image over 0.5s
        setTimeout(function() {
            $image.stop().animate({ opacity: 1 }, 500, function() {
                // Reset video time after the fade-in is complete
                $video.currentTime = 0;
            });
        }, 500);
    }
});

    $(".has-video").on("click", function () {
        $(".custom-cursor").removeClass("cursor-icon");
        $(".custom-cursor").removeClass("tooltip");
        $(".custom-cursor").css("width", "6px !important");  // Restore the default system cursor
        $(this).css("cursor", "");  // Restore the default system cursor
        $(".cursor-play-icon").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(".cursor-play-icon").css("display", "none");  // Hide the .cursor-carat again

        var $image = $(this).find(".gallery14_image");
        var $video = $(this).find("video").get(0);        

        // Fade out image over 1s
        $image.stop().animate({ opacity: 0 }, 1000, function () {
            // Wait 1 second before playing the video
            setTimeout(function () {
                $video.play();
            }, 1000);
        });
    });
});


window.addEventListener("scroll", function () {
    let cards = document.querySelectorAll(".layout410_card");

    cards.forEach((card, index) => {
        let prevCard = cards[index - 1];
        if (!prevCard) return;

        let rect = card.getBoundingClientRect();
        let windowHeight = window.innerHeight;
        
        let fadeTriggerStart = windowHeight * 0.75; // When fading starts
        let fadeTriggerEnd = windowHeight * 0.4; // When fully faded
        
        let scaleTriggerStart = windowHeight * 0.65; // Starts halfway over the previous card
        let scaleTriggerEnd = windowHeight * 0.35; // Ends at normal size

        let fadeProgress = (fadeTriggerStart - rect.top) / (fadeTriggerStart - fadeTriggerEnd);
        fadeProgress = Math.min(Math.max(fadeProgress, 0), 1); // Clamp between 0 and 1

        let scaleProgress = (scaleTriggerStart - rect.top) / (scaleTriggerStart - scaleTriggerEnd);
        scaleProgress = Math.min(Math.max(scaleProgress, 0), 1); // Clamp between 0 and 1

        let blurStart = 0.3; // Blur starts after 30% of fade
        let blurProgress = Math.max(fadeProgress - blurStart, 0) / (1 - blurStart);

        // Previous card fade & blur
        prevCard.style.transition = "opacity 0s linear, filter 0s linear";
        prevCard.style.opacity = (1 - fadeProgress).toFixed(2);
        prevCard.style.filter = `blur(${Math.max(blurProgress * 10, 0)}px)`;

        // Scale effect on current card (starting when it's halfway over previous card)
        let scaleFactor = 1.08 - (scaleProgress * 0.08); // Scale from 1.08 to 1.00
        card.style.transition = "transform 0s linear";
        card.style.transform = `scale(${scaleFactor.toFixed(3)})`;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".gallery14_slider-right");
    const track = slider.querySelector(".gallery14_mask");
    const slides = slider.querySelectorAll(".gallery14_slide");
    const dots = slider.querySelectorAll(".w-slider-dot");

    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID = 0,
        currentIndex = 0;

    function getPositionX(event) {
        return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
    }

    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchStart(event) {
        currentIndex = [...dots].findIndex(dot => dot.classList.contains("w-active"));
        isDragging = true;
        startPos = getPositionX(event);
        prevTranslate = -currentIndex * slides[0].clientWidth;
        track.style.transition = "none";
        cancelAnimationFrame(animationID);
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        const movedBy = currentPosition - startPos;
        currentTranslate = prevTranslate + movedBy;
        setSliderPosition();
    }

    function touchEnd() {
        isDragging = false;
        const moveThreshold = slides[0].clientWidth * 0.3; // 30% threshold to trigger slide change
        const movedDistance = currentTranslate - prevTranslate;

        if (movedDistance < -moveThreshold && currentIndex < slides.length - 1) {
            currentIndex++;
        } else if (movedDistance > moveThreshold && currentIndex > 0) {
            currentIndex--;
        }

        currentTranslate = -currentIndex * slides[0].clientWidth;
        track.style.transition = "transform 0.4s ease";
        setSliderPosition();

        // Update active dot
        dots[currentIndex].click();
    }

    // Add event listeners for mouse and touch
    track.addEventListener("mousedown", touchStart);
    track.addEventListener("mousemove", touchMove);
    track.addEventListener("mouseup", touchEnd);
    track.addEventListener("mouseleave", touchEnd);
    track.addEventListener("touchstart", touchStart);
    track.addEventListener("touchmove", touchMove);
    track.addEventListener("touchend", touchEnd);

    // Prevent default image dragging
    slides.forEach(slide => {
        slide.querySelectorAll("img").forEach(img => {
            img.draggable = false;
            img.addEventListener("dragstart", e => e.preventDefault());
        });
    });
});

$(document).ready(function () {
    const $slider = $(".testimonial7_slider");
    const $logos = $(".testimonial-logo");
    const $dots = $slider.find(".w-slider-dot");

    // Click event for testimonial logos
    $logos.on("click", function () {
        let slideIndex = $(this).data("slide") - 1; // Convert to 0-based index

        // Trigger Webflow slider navigation
        $dots.eq(slideIndex).trigger("click");

        // Update active state
        $logos.removeClass("active");
        $(this).addClass("active");

        // Ensure correct SVG paths are updated
        updateSVGPaths();
    });

    // Detect active slide when Webflow changes slides
    const updateActiveLogo = () => {
        let activeIndex = $dots.filter(".w-active").index();

        if (activeIndex !== -1) {
            $logos.removeClass("active");
            $logos.eq(activeIndex).addClass("active");
        }

        // Ensure SVG paths are updated
        updateSVGPaths();
    };

    // Observe for changes in the slider (Webflow updates `w-active` dynamically)
    const observer = new MutationObserver(updateActiveLogo);
    $dots.each(function () {
        observer.observe(this, { attributes: true, attributeFilter: ["class"] });
    });

    // Ensure correct logo is active on page load
    setTimeout(updateActiveLogo, 100);

    // Function to handle SVG path updates
    function updateSVGPaths() {
        document.querySelectorAll(".testimonial-logo").forEach((logo) => {
            const isActive = logo.classList.contains("active");

            logo.querySelectorAll("svg path").forEach((path) => {
                if (isActive) {
                    path.removeAttribute("class"); // Show original attributes
                } else {
                    path.setAttribute("class", "tool-base"); // Ensure it gets the class back
                }
            });
        });
    }

    // Handle hover effects for the logos
    document.querySelectorAll(".testimonial-logo").forEach((logo) => {
        logo.addEventListener("mouseenter", () => {
            logo.querySelectorAll("svg path").forEach((path) => {
                path.dataset.originalClass = path.getAttribute("class");
                path.removeAttribute("class");
            });
        });

        logo.addEventListener("mouseleave", () => {
            if (!logo.classList.contains("active")) {
                logo.querySelectorAll("svg path").forEach((path) => {
                    path.setAttribute("class", "tool-base");
                });
            }
        });
    });
});

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar1_component");
    if (!navbar) {
        console.error("Navbar not found");
        return;
    }

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down: hide navbar
        navbar.style.transform = "translateY(-5.5rem)";
    } else {
        // Scrolling up: show navbar
        navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
}, { passive: true });


window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('#about-me');
    const front = document.querySelector('.portrait-front');
    const back = document.querySelector('.portrait-back');
    const wordCloud = document.querySelector('.jb-word-cloud');

    if (!aboutSection || !front || !back || !wordCloud) return;

    // Get the position and height of the #about-me section
    const rect = aboutSection.getBoundingClientRect();
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;
    const wordCloudWidth = wordCloud.offsetWidth; // Get width of wordCloud container

    // **Further extending the exit point**
    const startScroll = rect.top - windowHeight * 0.75; // Start earlier
    const endScroll = rect.bottom + windowHeight * 2; // Continue animation MUCH longer

    // Calculate scroll progress over the extended range
    const scrollProgress = Math.max(0, Math.min(1, (window.scrollY - startScroll) / (endScroll - startScroll)));

    // Move the images (portrait front and back) vertically
    const moveY = -scrollProgress * 240; // Vertical movement for the portraits
    front.style.transform = `translateY(${moveY}px)`;
    back.style.transform = `translateY(${moveY}px)`;

    // **Match .jb-word-cloud's vertical movement with .portrait-back**
    wordCloud.style.transform = `translateY(${moveY}px)`;

    // Move the word cloud SVGs from the left and right edges
    const svgElements = wordCloud.querySelectorAll('svg');
    const staggerFactor = 50; // Adjust the stagger effect speed

    svgElements.forEach((svg, index) => {
        // Odd-indexed SVGs start from left edge (0px) and move right
        // Even-indexed SVGs start from right edge (100% width) and move left
        const baseMove = scrollProgress * (500 + index * staggerFactor);
        const staggeredMove = index % 2 === 0 ? -baseMove : baseMove;

        svg.style.transform = `translateX(${staggeredMove}px)`;
    });

    // **Fade in the word cloud at 10% scroll progress (Max Opacity: 0.3)**
    const fadeStart = 0.1; // 10% of the animation progress
    const fadeEnd = 0.4;   // Fully visible at 40%

    if (scrollProgress >= fadeStart) {
        let opacity = Math.min(0.3, (scrollProgress - fadeStart) / (fadeEnd - fadeStart) * 0.3); 
        wordCloud.style.opacity = opacity;
    } else {
        wordCloud.style.opacity = 0;
    }
});
document.querySelectorAll('.faq6_question').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('qa-active');
    });
  });

  window.addEventListener('load', () => {
    document.querySelectorAll('.book-a-call').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        Calendly.initPopupWidget({
          url: 'https://calendly.com/juanbenedit?text_color=464b5d&primary_color=a4093a'
        });
      });
    });
  });


  $(document).ready(function () {
    $(".w-nav-button").on("click", function () {
        setTimeout(function () {
            if ($(".w-nav-button").hasClass("w--open")) {
                $("body").addClass("no-scroll");
            } else {
                $("body").removeClass("no-scroll");
            }
        }, 50); // Slight delay to allow class toggle to apply
    });
});


$(document).ready(function () {
    // Function to reset animations and enable scrolling
    function resetMenu() {
        $("body").removeClass("no-scroll");
        $(".navbar1_menu-links .navbar3_link").removeClass("animate-in");
        $(".nav-buttons").removeClass("animate-in");
    }

    // Handle hamburger button clicks
    $(".w-nav-button").on("click", function () {
        setTimeout(function () {
            var isOpen = $(".w-nav-button").hasClass("w--open");

            if (isOpen) {
                // Disable scroll
                $("body").addClass("no-scroll");

                // Wait 400ms before starting staggered animation
                setTimeout(function () {
                    $(".navbar1_menu-links .navbar3_link").each(function (index) {
                        var $link = $(this);
                        setTimeout(function () {
                            $link.addClass("animate-in");
                        }, index * 100); // 100ms stagger
                    });

                    // After the last menu link animation, animate the .nav-buttons
                    setTimeout(function () {
                        $(".nav-buttons").addClass("animate-in");
                    }, $(".navbar1_menu-links .navbar3_link").length * 100 + 400); // Delay after all menu items have animated

                }, 400); // Delay before first menu item starts animating

            } else {
                resetMenu();
            }
        }, 50); // Wait for Webflow to toggle the .w--open class
    });
    
    // Handle menu link clicks
    $(".navbar1_menu-links .navbar3_link").on("click", function() {
        // Small timeout to ensure this happens after Webflow's default actions
        setTimeout(resetMenu, 50);
    });
    
    // Also listen for Webflow's native menu close event for extra reliability
    $(document).on('click', function(event) {
        // If the menu was open and is now closed (but not by the nav button)
        if (!$(".w-nav-button").hasClass("w--open") && $("body").hasClass("no-scroll")) {
            resetMenu();
        }
    });
});
const cursorText = document.querySelector('.cursor-text');

// Mouseover: show tooltip with HTML
document.addEventListener('mouseover', function (e) {
  const target = e.target.closest('[cursor-label]');
  
  if (target && cursorText) {
    const labelHTML = target.getAttribute('cursor-label');
    cursorText.innerHTML = labelHTML;
    cursorText.style.display = 'block';
  }
});

// Mouseout: hide tooltip
document.addEventListener('mouseout', function (e) {
  const target = e.target.closest('[cursor-label]');
  
  if (target && cursorText) {
    cursorText.innerHTML = '';
    cursorText.style.display = 'none';
  }
});




function animateIntro($section) {
    const $tagline = $section.find('.text-style-tagline').first();
    const $heading = $section.find('.heading-style-h2').first();
    const $para = $section.find('.text-size-medium').first();
    let currentDelay = 0;
    const fadeDuration = 600; // Duration for fade animations
  
    // Ensure intro section is revealed immediately
    $section.css({
      opacity: 1,
      visibility: 'visible'
    });
  
    // Step 1: Fade in tagline if present
    if ($tagline.length) {
      $tagline.css({ opacity: 0, transform: 'translateY(10px)' })
        .animate({ opacity: 1, transform: 'translateY(0)' }, fadeDuration);
      currentDelay += fadeDuration + 100; // Add fade duration + a small buffer
    }
  
    // Step 2: Type heading if present (start after tagline fades in)
    if ($heading.length) {
      const fullText = $heading.text().replace(/\n/g, '').trim();
      $heading.html('&nbsp;'); // prevent collapse
  
      function typeText(el, text, i) {
        if (i <= text.length) {
          el.html(text.substring(0, i).replace(/\n/g, '<br>'));
          setTimeout(() => typeText(el, text, i + 1), typingSpeed);
        }
      }
  
      setTimeout(() => {
        typeText($heading, fullText, 0);
        currentDelay += fullText.length * typingSpeed + 100; // Add typing duration + a small buffer
      }, currentDelay);
    } else {
      // If no heading, adjust delay for the paragraph
      currentDelay += 100; // Small buffer if no heading
    }
  
    // Step 3: Fade in the entire paragraph (start after heading types out)
    if ($para.length) {
      setTimeout(() => {
        $para.css({ opacity: 0, transform: 'translateY(20px)' })
          .animate({ opacity: 1, transform: 'translateY(0)' }, fadeDuration);
      }, currentDelay);
    }
  }